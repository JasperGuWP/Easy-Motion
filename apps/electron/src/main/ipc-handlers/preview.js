const { ipcMain } = require("electron");
const previewService = require("../services/preview-service");
const projectService = require("../services/project-service");

function wrap(handler) {
  return async (_event, payload) => {
    try {
      const data = await handler(payload);
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: { message: error.message || "unknown error" },
      };
    }
  };
}

function getProjectRoot(payload) {
  const current = projectService.getCurrentProject();
  const projectPath = payload?.projectPath ?? current?.path;
  if (!projectPath) {
    throw new Error("E2105: no open project");
  }
  return projectPath;
}

function registerPreviewHandlers() {
  ipcMain.handle(
    "main:preview:start",
    wrap(async (payload) => {
      const projectPath = getProjectRoot(payload);
      return previewService.prepareAndStartPreview(
        projectPath,
        payload?.subprojectPath
      );
    })
  );

  ipcMain.handle(
    "main:preview:stop",
    wrap(async () => previewService.stopPreview())
  );

  ipcMain.handle(
    "main:preview:getState",
    wrap(() => previewService.getPreviewState())
  );
}

module.exports = { registerPreviewHandlers };
