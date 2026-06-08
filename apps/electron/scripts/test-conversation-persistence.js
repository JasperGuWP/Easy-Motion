const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");
const { createProject } = require("../src/main/services/project-service");
const {
  loadConversation,
  saveConversation,
  getConversationPath,
  createMessage,
} = require("../src/main/services/conversation-service");
const chatService = require("../src/main/services/chat-service");
const { saveSettings } = require("../src/main/services/settings-service");

const parentPath = path.join(os.tmpdir(), `easymotion-chat-${Date.now()}`);
const SUBPROJECT = "subprojects/default";

async function run() {
  await saveSettings({ llm: { apiKey: "" } });

  fs.mkdirSync(parentPath, { recursive: true });
  const created = await createProject({ name: "对话持久化测试", parentPath });
  const projectPath = created.path;

  const convPath = getConversationPath(projectPath, SUBPROJECT);
  if (fs.existsSync(convPath)) {
    throw new Error("conversation.json should not exist before first message");
  }

  await chatService.sendMessage(projectPath, SUBPROJECT, "第一条测试消息", null);

  if (!fs.existsSync(convPath)) {
    throw new Error("conversation.json missing after send");
  }

  const reloaded = loadConversation(projectPath, SUBPROJECT);
  if (reloaded.messages.length !== 2) {
    throw new Error(`expected 2 messages, got ${reloaded.messages.length}`);
  }
  if (reloaded.messages[0].role !== "user" || reloaded.messages[1].role !== "assistant") {
    throw new Error("message roles mismatch");
  }
  if (!reloaded.messages[1].content.includes("API Key")) {
    throw new Error("expected no-api-key guidance in assistant reply");
  }

  const manual = {
    version: 1,
    messages: [
      createMessage("user", "手动保存"),
      createMessage("assistant", "手动回复"),
    ],
  };
  await saveConversation(projectPath, manual, SUBPROJECT);
  const afterSave = loadConversation(projectPath, SUBPROJECT);
  if (afterSave.messages.length !== 2 || afterSave.messages[0].content !== "手动保存") {
    throw new Error("manual save/load failed");
  }

  const history = await chatService.loadHistory(projectPath, SUBPROJECT);
  if (!history.settings?.llm?.provider) {
    throw new Error("settings missing in loadHistory");
  }

  fs.rmSync(parentPath, { recursive: true, force: true });
  console.log("[PASS] conversation-persistence");
}

run().catch((err) => {
  console.error("[FAIL] conversation-persistence", err);
  process.exit(1);
});
