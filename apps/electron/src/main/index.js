const { app, BrowserWindow } = require("electron");
const path = require("node:path");
const { registerProjectHandlers } = require("./ipc-handlers/project");
const { registerTimelineHandlers } = require("./ipc-handlers/timeline");
const { registerPreviewHandlers } = require("./ipc-handlers/preview");
const previewService = require("./services/preview-service");
const { ensureDir } = require("./services/file-service");
const { getConfigDir } = require("./utils/paths");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadFile(path.join(__dirname, "../renderer/index.html"));
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
