const { ipcMain } = require("electron");
const projectService = require("../services/project-service");
const presetService = require("../services/preset-service");

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

function requireProject() {
  const current = projectService.getCurrentProject();
  if (!current?.path) {
    throw new Error("E2001: no project open");
  }
  return current.path;
}

function registerPresetHandlers() {
  ipcMain.handle(
    "main:preset:list",
    wrap(() => {
      const projectPath = requireProject();
      return presetService.listPresets(projectPath);
    }),
  );

  ipcMain.handle(
    "main:preset:apply",
    wrap(async (payload) => {
      const projectPath = requireProject();
      const presetId = payload?.presetId;
      if (!presetId) throw new Error("未指定预设");
      return presetService.applyPreset(
        projectPath,
        presetId,
        payload?.subprojectPath,
      );
    }),
  );

  ipcMain.handle(
    "main:preset:save",
    wrap(async (payload) => {
      const projectPath = requireProject();
      return presetService.saveCurrentAsPreset(
        projectPath,
        payload,
        payload?.subprojectPath,
      );
    }),
  );
}

module.exports = { registerPresetHandlers };
