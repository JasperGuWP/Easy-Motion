const { ipcMain } = require("electron");
const timelineService = require("../services/timeline-service");
const projectService = require("../services/project-service");
const previewService = require("../services/preview-service");

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

function registerTimelineHandlers() {
  ipcMain.handle(
    "main:timeline:load",
    wrap((payload) => {
      const projectPath = getProjectRoot(payload);
      return timelineService.loadTimeline(projectPath, payload?.subprojectPath);
    })
  );

  ipcMain.handle(
    "main:timeline:save",
    wrap(async (payload) => {
      const projectPath = getProjectRoot(payload);
      return timelineService.saveTimeline(
        projectPath,
        payload.timeline,
        payload?.subprojectPath
      );
    })
  );

  ipcMain.handle(
    "main:timeline:applySample",
    wrap((payload) => {
      const projectPath = getProjectRoot(payload);
      return timelineService.applySampleTimeline(projectPath, payload?.subprojectPath);
    })
  );

  ipcMain.handle(
    "main:timeline:generate",
    wrap(async (payload) => {
      const projectPath = getProjectRoot(payload);
      const result = timelineService.generateForSubproject(
        projectPath,
        payload?.subprojectPath
      );
      const state = previewService.getPreviewState();
      if (state.status === "running") {
        return { ...result, previewReload: true, previewUrl: state.url };
      }
      return result;
    })
  );
}

module.exports = { registerTimelineHandlers };
