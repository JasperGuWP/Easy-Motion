export type LlmProvider = "openai" | "anthropic";

export interface LlmSettings {
  provider: LlmProvider;
  baseUrl: string;
  model: string;
  maxTokens: number;
  temperature: number;
  timeout: number;
  streamResponse: boolean;
  apiKeyConfigured?: boolean;
  apiKeyStored?: boolean;
}

export interface AppSettings {
  version: string;
  llm: LlmSettings;
}

export interface LlmSettingsFormState {
  provider: LlmProvider;
  baseUrl: string;
  model: string;
  maxTokens: number;
  temperature: number;
  apiKey: string;
}

export const LLM_PROVIDER_OPTIONS: { value: LlmProvider; label: string }[] = [
  { value: "anthropic", label: "Anthropic 兼容（MiniMax / Claude）" },
  { value: "openai", label: "OpenAI 兼容" },
];

export const LLM_PROVIDER_PRESETS: Record<
  LlmProvider,
  { baseUrl: string; model: string }
> = {
  anthropic: {
    baseUrl: "https://api.minimaxi.com/anthropic",
    model: "MiniMax-M3",
  },
  openai: {
    baseUrl: "https://api.openai.com/v1",
    model: "gpt-4o-mini",
  },
};
