const fs = require("node:fs");
const path = require("node:path");
const { safeStorage } = require("electron");
const { getConfigDir } = require("../utils/paths");
const { atomicWriteJson, readJsonFile, ensureDir } = require("./file-service");

const SECRETS_VERSION = "1.0";

const DEFAULT_SECRETS = {
  version: SECRETS_VERSION,
  llm_api_keys: {},
};

let cachedSecrets = null;

function getSecretsPath() {
  return path.join(getConfigDir(), "secrets.json");
}

function loadSecretsFromDisk() {
  const filePath = getSecretsPath();
  ensureDir(getConfigDir());

  if (!fs.existsSync(filePath)) {
    return structuredClone(DEFAULT_SECRETS);
  }

  try {
    const raw = readJsonFile(filePath);
    return {
      version: SECRETS_VERSION,
      llm_api_keys:
        raw?.llm_api_keys && typeof raw.llm_api_keys === "object"
          ? raw.llm_api_keys
          : {},
    };
  } catch {
    throw new Error("E2804: secrets.json 无法读取");
  }
}

function getSecrets() {
  if (!cachedSecrets) {
    cachedSecrets = loadSecretsFromDisk();
  }
  return cachedSecrets;
}

async function saveSecrets(secrets) {
  cachedSecrets = secrets;
  await atomicWriteJson(getSecretsPath(), secrets);
}

function encryptValue(plainText) {
  if (!plainText) return null;
  if (!safeStorage.isEncryptionAvailable()) {
    throw new Error("E2804: 系统安全存储不可用，无法保存 API Key");
  }
  return safeStorage.encryptString(plainText).toString("base64");
}

function decryptValue(encrypted) {
  if (!encrypted) return null;
  if (!safeStorage.isEncryptionAvailable()) {
    throw new Error("E2804: 系统安全存储不可用，无法读取 API Key");
  }
  return safeStorage.decryptString(Buffer.from(encrypted, "base64"));
}

function getLlmApiKey(provider) {
  const entry = getSecrets().llm_api_keys?.[provider];
  if (!entry?.encrypted) return null;
  try {
    return decryptValue(entry.encrypted);
  } catch {
    return null;
  }
}

function hasLlmApiKey(provider) {
  return Boolean(getSecrets().llm_api_keys?.[provider]?.encrypted);
}

async function setLlmApiKey(provider, apiKey) {
  if (!provider || typeof provider !== "string") {
    throw new Error("E2002: 无效的 LLM 提供商");
  }

  const trimmed = typeof apiKey === "string" ? apiKey.trim() : "";
  const secrets = getSecrets();
  const next = {
    ...secrets,
    version: SECRETS_VERSION,
    llm_api_keys: { ...secrets.llm_api_keys },
  };

  if (!trimmed) {
    delete next.llm_api_keys[provider];
  } else {
    next.llm_api_keys[provider] = {
      encrypted: encryptValue(trimmed),
      provider,
      last_used_at: Date.now(),
    };
  }

  await saveSecrets(next);
  return { stored: Boolean(trimmed) };
}

function touchLlmApiKey(provider) {
  const secrets = getSecrets();
  const entry = secrets.llm_api_keys?.[provider];
  if (!entry) return;
  entry.last_used_at = Date.now();
}

function resetSecretsCache() {
  cachedSecrets = null;
}

module.exports = {
  getLlmApiKey,
  hasLlmApiKey,
  setLlmApiKey,
  touchLlmApiKey,
  resetSecretsCache,
};
