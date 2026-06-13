const { ipcMain } = require("electron");
const conversationService = require("../services/conversation-service");
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

function getProjectContext(payload) {
  const current = projectService.getCurrentProject();
  const projectPath = payload?.projectPath ?? current?.path;
  if (!projectPath || !current?.data) {
    throw new Error("E2105: no open project");
  }

  const subprojectPath = conversationService.resolveSubprojectPath(
    current.data,
    payload
  );

  return { projectPath, subprojectPath, project: current.data };
}

function registerConversationHandlers() {
  ipcMain.handle(
    "main:conversation:load",
    wrap((payload) => {
      const { projectPath, subprojectPath } = getProjectContext(payload);
      const conversation = conversationService.loadConversation(
        projectPath,
        subprojectPath
      );
      return { conversation, subprojectPath, subprojectId: payload?.subprojectId };
    })
  );

  ipcMain.handle(
    "main:conversation:save",
    wrap(async (payload) => {
      if (!payload?.conversation) {
        throw new Error("E2002: 无效的对话数据");
      }
      const { projectPath, subprojectPath } = getProjectContext(payload);
      return conversationService.saveConversation(
        projectPath,
        payload.conversation,
        subprojectPath
      );
    })
  );

  ipcMain.handle(
    "main:conversation:clear",
    wrap(async (payload) => {
      const { projectPath, subprojectPath } = getProjectContext(payload);
      return conversationService.clearConversation(projectPath, subprojectPath);
    })
  );
}

module.exports = { registerConversationHandlers };
