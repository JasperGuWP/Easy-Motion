import { useEffect, useState } from "react";
import { Eye, EyeOff, Loader2, Settings, X } from "lucide-react";
import {
  CUSTOM_MODEL_VALUE,
  MODEL_GROUPS,
  resolveModelSelectValue,
  resolveModelToSave,
  suggestBaseUrlForModel,
} from "@/lib/llm/modelOptions";
import { useChatStore } from "@/stores/chatStore";

export function ChatSettingsPanel() {
  const {
    settings,
    loadSettings,
    saveSettings,
    isSavingSettings,
    settingsError,
    clearSettingsError,
  } = useChatStore();
  const [open, setOpen] = useState(false);
  const [model, setModel] = useState("gpt-4o-mini");
  const [customModel, setCustomModel] = useState("");
  const [baseUrl, setBaseUrl] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [saveOk, setSaveOk] = useState(false);

  useEffect(() => {
    if (!settings) return;
    const saved = settings.llm.model || "gpt-4o-mini";
    const selectValue = resolveModelSelectValue(saved);
    setModel(selectValue);
    if (selectValue === CUSTOM_MODEL_VALUE) {
      setCustomModel(saved);
    }
    setBaseUrl(settings.llm.baseUrl ?? "");
  }, [settings]);

  const handleSave = async () => {
    const modelToSave = resolveModelToSave(model, customModel);
    if (!modelToSave) {
      setFormError("请填写自定义模型 ID");
      return;
    }

    const keyInput = apiKey.trim();
    const needsNewKey = !settings?.llm.apiKeyConfigured;
    if (needsNewKey && !keyInput) {
      setFormError("首次配置请填写 API Key");
      return;
    }

    setFormError(null);
    setSaveOk(false);

    const patch: {
      llm: { provider: string; model: string; baseUrl: string; apiKey?: string };
    } = {
      llm: {
        provider: "openai",
        model: modelToSave,
        baseUrl: baseUrl.trim(),
      },
    };
    if (keyInput) {
      patch.llm.apiKey = keyInput;
    }

    const ok = await saveSettings(patch);
    if (!ok) return;

    await loadSettings();
    const latest = useChatStore.getState().settings;

    if (keyInput && !latest?.llm.apiKeyConfigured) {
      setFormError("API Key 未能写入，请完全退出并重启 Electron 后再试");
      return;
    }

    setApiKey("");
    setSaveOk(true);
    if (latest?.llm.apiKeyConfigured) {
      setTimeout(() => setOpen(false), 600);
    }
  };

  const handleClearKey = async () => {
    const ok = await saveSettings({ llm: { apiKey: "" } });
    if (ok) setApiKey("");
  };

  return (
    <div className="relative shrink-0">
      <button
        type="button"
        onClick={() => {
          const next = !open;
          setOpen(next);
          clearSettingsError();
          setFormError(null);
          setSaveOk(false);
          if (next) void loadSettings();
        }}
        className="inline-flex cursor-pointer items-center gap-1 rounded-sm px-2 py-1 text-xs text-em-muted transition-colors hover:bg-em-elevated hover:text-em-text"
        aria-label="AI 设置"
      >
        <Settings className="h-3.5 w-3.5" />
        设置
        {settings?.llm.apiKeyConfigured && (
          <span className="rounded bg-em-teal/20 px-1.5 py-0.5 text-[10px] text-em-teal">
            已配置
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full z-20 mt-2 max-h-[min(70vh,520px)] w-80 overflow-y-auto rounded-lg border border-em-border bg-em-bg p-3 shadow-lg">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium text-em-text">LLM 设置</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-em-muted hover:text-em-text"
              aria-label="关闭"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {saveOk && settings?.llm.apiKeyConfigured && (
            <p className="mb-2 text-xs text-em-teal">已保存，API Key 配置成功</p>
          )}

          {(settingsError || formError) && (
            <p className="mb-2 text-xs text-red-300">{settingsError ?? formError}</p>
          )}

          <label className="mb-2 block text-xs text-em-muted">
            模型
            <select
              value={model}
              onChange={(e) => {
                const next = e.target.value;
                setModel(next);
                if (next !== CUSTOM_MODEL_VALUE) {
                  const suggested = suggestBaseUrlForModel(next);
                  if (suggested && !baseUrl.trim()) {
                    setBaseUrl(suggested);
                  }
                }
              }}
              className="mt-1 w-full rounded-md border border-em-border bg-em-surface px-2 py-1.5 text-sm text-em-text"
            >
              {MODEL_GROUPS.map((group) => (
                <optgroup key={group.label} label={group.label}>
                  {group.models.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </optgroup>
              ))}
              <option value={CUSTOM_MODEL_VALUE}>自定义模型 ID…</option>
            </select>
          </label>

          {model === CUSTOM_MODEL_VALUE && (
            <label className="mb-2 block text-xs text-em-muted">
              自定义模型 ID
              <input
                type="text"
                value={customModel}
                onChange={(e) => setCustomModel(e.target.value)}
                placeholder="例如 my-provider/my-model"
                className="mt-1 w-full rounded-md border border-em-border bg-em-surface px-2 py-1.5 text-sm text-em-text placeholder:text-em-muted"
              />
            </label>
          )}

          <label className="mb-2 block text-xs text-em-muted">
            API 地址（可选，填根域名即可）
            <input
              type="text"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              placeholder="DeepSeek: https://api.deepseek.com；留空则用 OpenAI"
              className="mt-1 w-full rounded-md border border-em-border bg-em-surface px-2 py-1.5 text-sm text-em-text placeholder:text-em-muted"
            />
            <span className="mt-1 block text-[10px] leading-snug text-em-muted/80">
              程序会自动补全为 …/v1/chat/completions。DeepSeek 请选模型 deepseek-chat，勿用不存在的模型名。
            </span>
          </label>

          <label className="mb-2 block text-xs text-em-muted">
            API Key
            {settings?.llm.apiKeyHint && (
              <span className="ml-1 text-em-teal">当前：{settings.llm.apiKeyHint}</span>
            )}
            <div className="relative mt-1">
              <input
                type={showApiKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                autoComplete="off"
                spellCheck={false}
                placeholder={settings?.llm.apiKeyConfigured ? "留空则不修改" : "sk-... 或服务商 Key"}
                className="w-full rounded-md border border-em-border bg-em-surface py-1.5 pl-2 pr-9 text-sm text-em-text placeholder:text-em-muted"
              />
              <button
                type="button"
                onClick={() => setShowApiKey((v) => !v)}
                className="absolute right-1 top-1/2 -translate-y-1/2 rounded p-1 text-em-muted hover:bg-em-elevated hover:text-em-text"
                aria-label={showApiKey ? "隐藏 API Key" : "显示 API Key"}
              >
                {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </label>

          <div className="mt-3 flex gap-2">
            <button
              type="button"
              disabled={isSavingSettings}
              onClick={() => void handleSave()}
              className="flex-1 cursor-pointer rounded-sm bg-em-accent px-3 py-1.5 text-sm text-white hover:bg-em-accent-hover disabled:opacity-60"
            >
              {isSavingSettings ? (
                <Loader2 className="mx-auto h-4 w-4 animate-spin" />
              ) : (
                "保存"
              )}
            </button>
            {settings?.llm.apiKeyConfigured && (
              <button
                type="button"
                disabled={isSavingSettings}
                onClick={() => void handleClearKey()}
                className="cursor-pointer rounded-sm border border-em-border px-3 py-1.5 text-sm text-em-muted hover:bg-em-elevated disabled:opacity-60"
              >
                清除 Key
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
