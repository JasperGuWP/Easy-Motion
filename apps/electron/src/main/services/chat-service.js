const {
  loadConversation,
  saveConversation,
  createMessage,
} = require("./conversation-service");
const { loadSettings, loadSettingsForRenderer, getApiKey } = require("./settings-service");
const llmService = require("./llm-service");
const agentService = require("./agent-service");

const NO_API_KEY_MESSAGE =
  "尚未配置 LLM API Key。\n\n请点击面板右上角「设置」，填写 OpenAI API Key 后即可开始真实对话。\n（兼容 OpenAI 接口的代理地址也可在设置中填写。）";

function emitChunk(event, payload) {
  if (!event?.sender) return;
  try {
    const { BrowserWindow } = require("electron");
    const win = BrowserWindow.fromWebContents(event.sender);
    if (win && !win.isDestroyed()) {
      win.webContents.send("renderer:chat:chunk", payload);
    }
  } catch {
    // 非 Electron 运行时（如 node 脚本测试）跳过流式推送
  }
}

async function streamText(replyText, event) {
  for (const char of replyText) {
    emitChunk(event, { type: "delta", text: char });
  }
  return replyText;
}

function notifyTimelineUpdated(event) {
  if (!event?.sender) return;
  try {
    const { BrowserWindow } = require("electron");
    const win = BrowserWindow.fromWebContents(event.sender);
    if (win && !win.isDestroyed()) {
      win.webContents.send("renderer:timeline:updated", { source: "agent" });
    }
  } catch {
    // node 测试环境
  }
}

async function generateReply(conversation, event, userMessage) {
  const settings = loadSettings();
  const apiKey = getApiKey();

  if (!apiKey) {
    return { replyText: await streamText(NO_API_KEY_MESSAGE, event), timelineUpdated: false };
  }

  if (agentService.shouldUseAgent(userMessage)) {
    const agentResult = await agentService.runAgentTurn({
      projectRoot: conversation._projectRoot,
      subprojectPath: conversation._subprojectPath,
      conversationMessages: conversation.messages,
      userMessage,
      onDelta: (text) => emitChunk(event, { type: "delta", text }),
    });
    if (agentResult.timelineUpdated) {
      notifyTimelineUpdated(event);
    }
    return agentResult;
  }

  const messages = llmService.buildChatMessages(conversation.messages);
  let replyText = "";

  await llmService.streamChatCompletion({
    messages,
    apiKey,
    model: settings.llm?.model,
    baseUrl: settings.llm?.baseUrl,
    onDelta: (text) => {
      replyText += text;
      emitChunk(event, { type: "delta", text });
    },
  });

  if (!replyText.trim()) {
    replyText = "（模型未返回内容，请重试或检查 API Key / 模型设置。）";
    emitChunk(event, { type: "delta", text: replyText });
  }

  return { replyText, timelineUpdated: false };
}

async function loadHistory(projectRoot, subprojectPath) {
  const conversation = loadConversation(projectRoot, subprojectPath);
  return {
    messages: conversation.messages,
    settings: loadSettingsForRenderer(),
  };
}

async function saveHistory(projectRoot, subprojectPath, messages) {
  const conversation = await saveConversation(
    projectRoot,
    { version: 1, messages },
    subprojectPath,
  );
  return { messages: conversation.messages };
}

async function sendMessage(projectRoot, subprojectPath, content, event) {
  const trimmed = String(content ?? "").trim();
  if (!trimmed) {
    throw new Error("E3001: message content is empty");
  }

  const conversation = loadConversation(projectRoot, subprojectPath);
  const userMessage = createMessage("user", trimmed);
  conversation.messages.push(userMessage);
  await saveConversation(projectRoot, conversation, subprojectPath);

  emitChunk(event, { type: "start", userMessageId: userMessage.id });

  let replyText;
  let timelineUpdated = false;
  try {
    const result = await generateReply(
      {
        ...conversation,
        _projectRoot: projectRoot,
        _subprojectPath: subprojectPath,
      },
      event,
      trimmed,
    );
    replyText = result.replyText;
    timelineUpdated = Boolean(result.timelineUpdated);
  } catch (error) {
    let hint = "请检查 API Key、网络或模型名称后重试。";
    if (error.message?.includes("(404)")) {
      hint +=
        "\n常见原因：① Base URL 不正确；② 模型名不存在（DeepSeek 请用 deepseek-chat）。";
    }
    const fallback =
      error.message?.includes("E4010") ||
      error.message?.includes("E4011") ||
      error.message?.includes("E4013")
        ? `${error.message}\n\n${hint}`
        : `对话出错：${error.message || "unknown error"}`;
    replyText = await streamText(fallback, event);
  }

  const assistantMessage = createMessage("assistant", replyText);
  conversation.messages.push(assistantMessage);
  await saveConversation(projectRoot, conversation, subprojectPath);

  emitChunk(event, { type: "done", message: assistantMessage });

  return {
    messages: conversation.messages,
    assistantMessage,
    timelineUpdated,
  };
}

module.exports = {
  loadHistory,
  saveHistory,
  sendMessage,
  NO_API_KEY_MESSAGE,
};
