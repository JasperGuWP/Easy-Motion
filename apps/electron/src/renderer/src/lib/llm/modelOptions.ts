export const CUSTOM_MODEL_VALUE = "__custom__";

export interface ModelOption {
  value: string;
  label: string;
}

export interface ModelGroup {
  label: string;
  models: ModelOption[];
}

/** 常用模型预设；配合 Base URL 可用于 OpenAI 及兼容接口 */
export const MODEL_GROUPS: ModelGroup[] = [
  {
    label: "OpenAI · GPT-4.1",
    models: [
      { value: "gpt-4.1", label: "gpt-4.1" },
      { value: "gpt-4.1-mini", label: "gpt-4.1-mini（推荐·均衡）" },
      { value: "gpt-4.1-nano", label: "gpt-4.1-nano（轻量）" },
    ],
  },
  {
    label: "OpenAI · GPT-4o",
    models: [
      { value: "gpt-4o", label: "gpt-4o" },
      { value: "gpt-4o-mini", label: "gpt-4o-mini（推荐·便宜）" },
      { value: "gpt-4o-2024-11-20", label: "gpt-4o-2024-11-20" },
      { value: "chatgpt-4o-latest", label: "chatgpt-4o-latest" },
    ],
  },
  {
    label: "OpenAI · 推理 o 系列",
    models: [
      { value: "o4-mini", label: "o4-mini" },
      { value: "o3", label: "o3" },
      { value: "o3-mini", label: "o3-mini" },
      { value: "o1", label: "o1" },
      { value: "o1-mini", label: "o1-mini" },
      { value: "o1-preview", label: "o1-preview" },
    ],
  },
  {
    label: "OpenAI · 经典",
    models: [
      { value: "gpt-4-turbo", label: "gpt-4-turbo" },
      { value: "gpt-4", label: "gpt-4" },
      { value: "gpt-3.5-turbo", label: "gpt-3.5-turbo" },
    ],
  },
  {
    label: "DeepSeek",
    models: [
      { value: "deepseek-chat", label: "deepseek-chat（推荐）" },
      { value: "deepseek-reasoner", label: "deepseek-reasoner（推理）" },
    ],
  },
  {
    label: "通义千问 Qwen（需对应 Base URL）",
    models: [
      { value: "qwen-max", label: "qwen-max" },
      { value: "qwen-plus", label: "qwen-plus" },
      { value: "qwen-turbo", label: "qwen-turbo" },
      { value: "qwen-long", label: "qwen-long" },
    ],
  },
  {
    label: "智谱 GLM（需对应 Base URL）",
    models: [
      { value: "glm-4-plus", label: "glm-4-plus" },
      { value: "glm-4-air", label: "glm-4-air" },
      { value: "glm-4-flash", label: "glm-4-flash" },
      { value: "glm-4-long", label: "glm-4-long" },
    ],
  },
  {
    label: "Moonshot / Kimi（需对应 Base URL）",
    models: [
      { value: "moonshot-v1-8k", label: "moonshot-v1-8k" },
      { value: "moonshot-v1-32k", label: "moonshot-v1-32k" },
      { value: "moonshot-v1-128k", label: "moonshot-v1-128k" },
    ],
  },
  {
    label: "字节豆包（需对应 Base URL）",
    models: [
      { value: "doubao-pro-32k", label: "doubao-pro-32k" },
      { value: "doubao-lite-32k", label: "doubao-lite-32k" },
    ],
  },
  {
    label: "Google Gemini（OpenAI 兼容网关）",
    models: [
      { value: "gemini-2.5-pro", label: "gemini-2.5-pro" },
      { value: "gemini-2.5-flash", label: "gemini-2.5-flash" },
      { value: "gemini-2.0-flash", label: "gemini-2.0-flash" },
      { value: "gemini-1.5-pro", label: "gemini-1.5-pro" },
    ],
  },
  {
    label: "Anthropic Claude（OpenAI 兼容网关）",
    models: [
      { value: "claude-sonnet-4-20250514", label: "claude-sonnet-4" },
      { value: "claude-3-5-sonnet-20241022", label: "claude-3.5-sonnet" },
      { value: "claude-3-5-haiku-20241022", label: "claude-3.5-haiku" },
      { value: "claude-3-opus-20240229", label: "claude-3-opus" },
    ],
  },
];

const PRESET_VALUES = new Set(
  MODEL_GROUPS.flatMap((group) => group.models.map((m) => m.value)),
);

/** 选择预设模型时自动建议的 API 根地址（程序会自动补全 /v1/chat/completions） */
export const MODEL_DEFAULT_BASE_URL: Record<string, string> = {
  "deepseek-chat": "https://api.deepseek.com",
  "deepseek-reasoner": "https://api.deepseek.com",
  "qwen-max": "https://dashscope.aliyuncs.com/compatible-mode",
  "qwen-plus": "https://dashscope.aliyuncs.com/compatible-mode",
  "qwen-turbo": "https://dashscope.aliyuncs.com/compatible-mode",
  "qwen-long": "https://dashscope.aliyuncs.com/compatible-mode",
  "glm-4-plus": "https://open.bigmodel.cn/api/paas",
  "glm-4-air": "https://open.bigmodel.cn/api/paas",
  "glm-4-flash": "https://open.bigmodel.cn/api/paas",
  "glm-4-long": "https://open.bigmodel.cn/api/paas",
  "moonshot-v1-8k": "https://api.moonshot.cn",
  "moonshot-v1-32k": "https://api.moonshot.cn",
  "moonshot-v1-128k": "https://api.moonshot.cn",
};

export function suggestBaseUrlForModel(modelId: string): string | null {
  return MODEL_DEFAULT_BASE_URL[modelId] ?? null;
}

export function resolveModelSelectValue(savedModel: string | undefined): string {
  if (!savedModel) return "gpt-4o-mini";
  return PRESET_VALUES.has(savedModel) ? savedModel : CUSTOM_MODEL_VALUE;
}

export function resolveModelToSave(selectValue: string, customModel: string): string {
  if (selectValue === CUSTOM_MODEL_VALUE) {
    return customModel.trim();
  }
  return selectValue;
}
