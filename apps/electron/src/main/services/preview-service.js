const fs = require("node:fs");
const path = require("node:path");
const http = require("node:http");
const { spawn } = require("node:child_process");
const { BrowserWindow } = require("electron");
const timelineService = require("./timeline-service");

const PREVIEW_CHANNEL = "easymotion-preview";
const DEFAULT_PORT = 5174;
const PORT_RANGE = 20;

let previewProcess = null;
let previewState = {
  url: null,
  port: null,
  remotionDir: null,
  status: "idle"
};

function broadcastLog(line, phase = "preview") {
  const text = String(line).trimEnd();
  if (!text) return;
  for (const win of BrowserWindow.getAllWindows()) {
    if (!win.isDestroyed()) {
      win.webContents.send("renderer:preview:log", { line: text, phase });
    }
  }
}

function getRemotionDir(projectRoot, subprojectPath = "subprojects/default") {
  return path.join(projectRoot, subprojectPath, "remotion");
}

function createNpmProcess(args, cwd) {
  if (!fs.existsSync(cwd)) {
    throw new Error(`工作目录不存在: ${cwd}`);
  }

  const env = { ...process.env, BROWSER: "none" };

  // Windows 下直接 spawn npm.cmd 会触发 EINVAL，需经 cmd.exe 执行
  if (process.platform === "win32") {
    return spawn("cmd.exe", ["/d", "/s", "/c", "npm", ...args], {
      cwd,
      windowsHide: true,
      stdio: ["ignore", "pipe", "pipe"],
      env
    });
  }

  return spawn("npm", args, {
    cwd,
    shell: false,
    stdio: ["ignore", "pipe", "pipe"],
    env
  });
}

function attachProcessLogs(child, label) {
  child.stdout?.on("data", (chunk) => broadcastLog(chunk.toString(), label));
  child.stderr?.on("data", (chunk) => broadcastLog(chunk.toString(), label));
}

function spawnLogged(label, args, cwd) {
  return new Promise((resolve, reject) => {
    broadcastLog(`[${label}] 开始: npm ${args.join(" ")}`, label);
    const child = createNpmProcess(args, cwd);
    attachProcessLogs(child, label);

    child.on("error", (err) => reject(err));
    child.on("exit", (code) => {
      if (code === 0) {
        broadcastLog(`[${label}] 完成`, label);
        resolve();
      } else {
        reject(new Error(`npm ${args.join(" ")} exited with code ${code}`));
      }
    });
  });
}

async function ensureRemotionDeps(remotionDir) {
  const nodeModules = path.join(remotionDir, "node_modules");
  if (fs.existsSync(nodeModules)) {
    broadcastLog("依赖已存在，跳过 npm install", "install");
    return;
  }

  previewState.status = "installing";
  broadcastLog("首次预览需要安装 Remotion 依赖，请稍候（约 1–5 分钟）...", "install");
  await spawnLogged("install", ["install", "--no-fund", "--loglevel=info"], remotionDir);
}

function waitForHttp(url, timeoutMs = 120000) {
  const started = Date.now();
  return new Promise((resolve, reject) => {
    const tick = () => {
      const req = http.get(url, (res) => {
        res.resume();
        resolve(true);
      });
      req.on("error", () => {
        if (Date.now() - started > timeoutMs) {
          reject(new Error("preview server start timeout"));
          return;
        }
        setTimeout(tick, 500);
      });
    };
    tick();
  });
}

async function findAvailablePort(startPort) {
  for (let port = startPort; port < startPort + PORT_RANGE; port += 1) {
    const ok = await new Promise((resolve) => {
      const server = http.createServer();
      server.once("error", () => resolve(false));
      server.listen(port, "127.0.0.1", () => {
        server.close(() => resolve(true));
      });
    });
    if (ok) return port;
  }
  throw new Error("no available preview port");
}

async function startPreview(projectRoot, subprojectPath = "subprojects/default") {
  await stopPreview();

  const remotionDir = getRemotionDir(projectRoot, subprojectPath);
  if (!fs.existsSync(remotionDir)) {
    throw new Error("E2201: remotion directory not found");
  }

  previewState.status = "installing";
  await ensureRemotionDeps(remotionDir);

  const port = await findAvailablePort(DEFAULT_PORT);
  const previewUrl = `http://127.0.0.1:${port}/preview.html`;

  previewState.status = "starting";
  broadcastLog(`启动 Vite 预览服务: ${previewUrl}`, "vite");

  previewProcess = createNpmProcess(
    ["run", "preview:dev", "--", "--host", "127.0.0.1", "--port", String(port)],
    remotionDir
  );
  attachProcessLogs(previewProcess, "vite");
  previewProcess.on("error", (err) => {
    broadcastLog(`Vite 启动失败: ${err.message}`, "vite");
  });

  previewProcess.on("exit", () => {
    if (previewState.status !== "idle") {
      previewState.status = "stopped";
    }
    previewProcess = null;
  });

  await waitForHttp(previewUrl, 180000);

  previewState = {
    url: previewUrl,
    port,
    remotionDir,
    status: "running"
  };

  broadcastLog("预览服务已就绪", "vite");

  return {
    url: previewUrl,
    port,
    channel: PREVIEW_CHANNEL
  };
}

async function stopPreview() {
  if (previewProcess) {
    previewProcess.kill();
    previewProcess = null;
  }
  previewState = {
    url: null,
    port: null,
    remotionDir: null,
    status: "idle"
  };
}

function getPreviewState() {
  return { ...previewState, channel: PREVIEW_CHANNEL };
}

async function prepareAndStartPreview(projectRoot, subprojectPath = "subprojects/default") {
  const remotionSrc = timelineService.getRemotionSrcDir(projectRoot, subprojectPath);
  const rootTsx = path.join(remotionSrc, "Root.tsx");
  if (!fs.existsSync(rootTsx)) {
    timelineService.generateForSubproject(projectRoot, subprojectPath);
  }
  return startPreview(projectRoot, subprojectPath);
}

module.exports = {
  PREVIEW_CHANNEL,
  getRemotionDir,
  startPreview,
  stopPreview,
  getPreviewState,
  prepareAndStartPreview,
  ensureRemotionDeps
};
