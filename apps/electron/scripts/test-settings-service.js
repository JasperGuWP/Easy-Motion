const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const {
  saveSettings,
  loadSettingsForRenderer,
  getApiKey,
} = require("../src/main/services/settings-service");
const { getConfigDir } = require("../src/main/utils/paths");

const settingsPath = path.join(getConfigDir(), "settings.json");
const backupPath = `${settingsPath}.test-bak`;

async function run() {
  if (fs.existsSync(settingsPath)) {
    fs.copyFileSync(settingsPath, backupPath);
  }

  try {
    await saveSettings({ llm: { apiKey: "" } });
    await saveSettings({
      llm: {
        provider: "openai",
        model: "gpt-4o-mini",
        baseUrl: "https://example.com/v1/chat/completions",
        apiKey: "sk-save-test-999",
      },
    });

    const view = loadSettingsForRenderer();
    if (!view.llm.apiKeyConfigured || view.llm.apiKeyHint !== "sk-s...-999") {
      throw new Error("renderer settings view mismatch after save");
    }
    if (getApiKey() !== "sk-save-test-999") {
      throw new Error("getApiKey mismatch after save");
    }

    const raw = JSON.parse(fs.readFileSync(settingsPath, "utf8"));
    if (raw.llm.apiKey !== "sk-save-test-999") {
      throw new Error("settings.json missing apiKey on disk");
    }

    await saveSettings({ llm: { model: "gpt-4o", apiKey: "" } });
    const cleared = loadSettingsForRenderer();
    if (cleared.llm.apiKeyConfigured || getApiKey()) {
      throw new Error("apiKey should be cleared");
    }

    console.log("[PASS] settings-service");
  } finally {
    if (fs.existsSync(backupPath)) {
      fs.copyFileSync(backupPath, settingsPath);
      fs.rmSync(backupPath, { force: true });
    } else if (fs.existsSync(settingsPath)) {
      fs.rmSync(settingsPath, { force: true });
    }
  }
}

run().catch((err) => {
  console.error("[FAIL] settings-service", err);
  process.exit(1);
});
