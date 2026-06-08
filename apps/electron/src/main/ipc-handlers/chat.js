const { ipcMain } = require("electron");
const chatService = require("../services/chat-service");
const projectService = require("../services/project-service");
const { loadSettingsForRenderer, saveSettings } = require("../services/settings-service");

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

function registerChatHandlers() {
  ipcMain.handle(
    "main:chat:loadHistory",
    wrap((payload) => {
      const projectPath = getProjectRoot(payload);
      return chatService.loadHistory(
        projectPath,
        payload?.subprojectPath ?? "subprojects/default",
      );
    }),
  );

  ipcMain.handle(
    "main:chat:saveHistory",
    wrap(async (payload) => {
      const projectPath = getProjectRoot(payload);
      if (!Array.isArray(payload?.messages)) {
        throw new Error("E3002: messages must be an array");
      }
      return chatService.saveHistory(
        projectPath,
        payload?.subprojectPath ?? "subprojects/default",
        payload.messages,
      );
    }),
  );

  ipcMain.handle("main:chat:send", async (event, payload) => {
    try {
      const projectPath = getProjectRoot(payload);
      const data = await chatService.sendMessage(
        projectPath,
        payload?.subprojectPath ?? "subprojects/default",
        payload?.content,
        event,
      );
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: { message: error.message || "unknown error" },
      };
    }
  });

  ipcMain.handle("main:chat:getSettings", wrap(() => loadSettingsForRenderer()));

  ipcMain.handle(
    "main:chat:saveSettings",
    wrap((payload) => saveSettings(payload ?? {})),
  );
}

module.exports = { registerChatHandlers };
