/**
 * VS Code F5：若 5173 未就绪则后台启动 Vite，并等待可访问
 */
const { spawn } = require("node:child_process");
const path = require("node:path");
const waitOn = require("wait-on");

const repoRoot = path.resolve(__dirname, "../../..");
const target = "http-get://127.0.0.1:5173";
const waitOpts = {
  interval: 500,
  validateStatus: (status) => status >= 200 && status < 500,
};

async function isViteUp(timeoutMs) {
  try {
    await waitOn({ resources: [target], timeout: timeoutMs, ...waitOpts });
    return true;
  } catch {
    return false;
  }
}

async function main() {
  if (await isViteUp(3000)) {
    console.log("[ensure-vite] already running at", target);
    return;
  }

  console.log("[ensure-vite] starting pnpm dev:renderer …");
  const child = spawn("pnpm", ["dev:renderer"], {
    cwd: repoRoot,
    shell: true,
    detached: true,
    stdio: "ignore",
  });
  child.unref();

  await waitOn({ resources: [target], timeout: 120000, ...waitOpts });
  console.log("[ensure-vite] ready:", target);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("[ensure-vite]", err.message);
    process.exit(1);
  });
