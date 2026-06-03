const { app, BrowserWindow } = require("electron");
const path = require("node:path");
const { registerProjectHandlers } = require("./ipc-handlers/project");
const { registerTimelineHandlers } = require("./ipc-handlers/timeline");
const { registerPreviewHandlers } = require("./ipc-handlers/preview");
const previewService = require("./services/preview-service");
const { ensureDir } = require("./services/file-service");
const { getConfigDir } = require("./utils/paths");

const RENDERER_DEV_URL = process.env.ELECTRON_RENDERER_URL || "http://127.0.0.1:5173";

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1200,
    minHeight: 700,
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  const useLegacy =
    process.env.EASY_MOTION_LEGACY_UI === "1" || process.argv.includes("--legacy-ui");

  if (useLegacy) {
    win.loadFile(path.join(__dirname, "../renderer/legacy/index.html"));
    return;
  }

  const isDev = !app.isPackaged;
  if (isDev) {
    win.loadURL(RENDERER_DEV_URL);
  } else {
    win.loadFile(path.join(__dirname, "../../dist/renderer/index.html"));
  }
};

app.whenReady().then(() => {
  ensureDir(getConfigDir());
  registerProjectHandlers();
  registerTimelineHandlers();
  registerPreviewHandlers();
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("before-quit", async () => {
  await previewService.stopPreview();
});
