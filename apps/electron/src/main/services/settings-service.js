const fs = require("node:fs");
const path = require("node:path");
const { atomicWriteJson, readJsonFile, ensureDir } = require("./file-service");
const { getConfigDir } = require("../utils/paths");

const SETTINGS_FILE = "settings.json";

const DEFAULT_SETTINGS = {
  version: 1,
  llm: {
    provider: "openai",
    model: "gpt-4o-mini",
    baseUrl: "",
    apiKeyConfigured: false,
  },
};

function getSettingsPath() {
  return path.join(getConfigDir(), SETTINGS_FILE);
}

function maskApiKey(key) {
  if (!key || typeof key !== "string") return "";
  if (key.length <= 8) return "********";
  return `${key.slice(0, 4)}...${key.slice(-4)}`;
}

function loadSettings() {
  const filePath = getSettingsPath();
  if (!fs.existsSync(filePath)) {
    return { ...DEFAULT_SETTINGS, llm: { ...DEFAULT_SETTINGS.llm } };
  }
  try {
    const raw = readJsonFile(filePath);
    return {
      ...DEFAULT_SETTINGS,
      ...raw,
      llm: {
        ...DEFAULT_SETTINGS.llm,
        ...(raw.llm ?? {}),
        apiKeyConfigured: Boolean(raw.llm?.apiKey),
      },
    };
  } catch {
    return { ...DEFAULT_SETTINGS, llm: { ...DEFAULT_SETTINGS.llm } };
  }
}

function loadSettingsForRenderer() {
  const settings = loadSettings();
  const { apiKey, ...llmRest } = settings.llm ?? {};
  return {
    ...settings,
    llm: {
      ...llmRest,
      apiKeyConfigured: Boolean(apiKey),
      apiKeyHint: apiKey ? maskApiKey(apiKey) : null,
    },
  };
}

async function saveSettings(patch) {
  const current = loadSettings();
  const llmPatch = patch?.llm ?? {};

  const next = {
    version: current.version ?? DEFAULT_SETTINGS.version,
    llm: {
      provider: llmPatch.provider ?? current.llm?.provider ?? DEFAULT_SETTINGS.llm.provider,
      model: llmPatch.model ?? current.llm?.model ?? DEFAULT_SETTINGS.llm.model,
      baseUrl:
        llmPatch.baseUrl !== undefined
          ? String(llmPatch.baseUrl ?? "").trim()
          : (current.llm?.baseUrl ?? ""),
    },
  };

  if (llmPatch.apiKey === "") {
    delete next.llm.apiKey;
  } else if (typeof llmPatch.apiKey === "string" && llmPatch.apiKey.trim()) {
    next.llm.apiKey = llmPatch.apiKey.trim();
  } else if (current.llm?.apiKey) {
    next.llm.apiKey = current.llm.apiKey;
  }

  ensureDir(getConfigDir());
  await atomicWriteJson(getSettingsPath(), next);
  return loadSettingsForRenderer();
}

function getApiKey() {
  const settings = loadSettings();
  return settings.llm?.apiKey ?? null;
}

module.exports = {
  loadSettings,
  loadSettingsForRenderer,
  saveSettings,
  getApiKey,
};
