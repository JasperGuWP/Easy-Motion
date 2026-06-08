const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const { atomicWriteJson, readJsonFile } = require("./file-service");

const CONVERSATION_FILE = "conversation.json";
const MAX_MESSAGES = 200;

function getConversationPath(projectRoot, subprojectRelativePath = "subprojects/default") {
  return path.join(projectRoot, subprojectRelativePath, CONVERSATION_FILE);
}

function emptyConversation() {
  return { version: 1, messages: [] };
}

function normalizeMessage(raw) {
  if (!raw || typeof raw !== "object") return null;
  const role = raw.role;
  if (role !== "user" && role !== "assistant" && role !== "system") return null;
  const content = typeof raw.content === "string" ? raw.content : "";
  return {
    id: typeof raw.id === "string" ? raw.id : crypto.randomUUID(),
    role,
    content,
    createdAt: typeof raw.createdAt === "number" ? raw.createdAt : Date.now(),
  };
}

function normalizeConversation(data) {
  if (!data || typeof data !== "object") return emptyConversation();
  const messages = Array.isArray(data.messages)
    ? data.messages.map(normalizeMessage).filter(Boolean)
    : [];
  return {
    version: 1,
    messages: messages.slice(-MAX_MESSAGES),
  };
}

function loadConversation(projectRoot, subprojectRelativePath = "subprojects/default") {
  const filePath = getConversationPath(projectRoot, subprojectRelativePath);
  if (!fs.existsSync(filePath)) {
    return emptyConversation();
  }
  try {
    return normalizeConversation(readJsonFile(filePath));
  } catch {
    return emptyConversation();
  }
}

async function saveConversation(
  projectRoot,
  conversation,
  subprojectRelativePath = "subprojects/default",
) {
  const filePath = getConversationPath(projectRoot, subprojectRelativePath);
  const normalized = normalizeConversation(conversation);
  await atomicWriteJson(filePath, normalized);
  return normalized;
}

function createMessage(role, content) {
  return {
    id: crypto.randomUUID(),
    role,
    content,
    createdAt: Date.now(),
  };
}

module.exports = {
  CONVERSATION_FILE,
  getConversationPath,
  loadConversation,
  saveConversation,
  createMessage,
  normalizeConversation,
};
