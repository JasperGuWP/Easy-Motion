const OPENAI_CHAT_URL = "https://api.openai.com/v1/chat/completions";
const MAX_CONTEXT_MESSAGES = 20;
const REQUEST_TIMEOUT_MS = 60_000;

const DEFAULT_SYSTEM_PROMPT = `你是 Easy-Motion 的 AI 创作助手，帮助用户用自然语言设计和调整 Remotion 动画视频。

当前能力（M5 阶段）：
- 理解用户的动画创意、节奏、文案与视觉风格需求
- 给出清晰、可执行的分镜与参数建议
- 用简体中文回复，简洁友好

若用户明确要求创建/修改时间线（如「创建标题」「字体大一点」），应用会自动调用 Agent 工具处理；你只需在纯咨询类对话中给出专业建议。`;

function buildChatMessages(conversationMessages, systemPrompt = DEFAULT_SYSTEM_PROMPT) {
  const recent = (conversationMessages ?? [])
    .filter((m) => m.role === "user" || m.role === "assistant")
    .slice(-MAX_CONTEXT_MESSAGES);

  return [{ role: "system", content: systemPrompt }, ...recent.map((m) => ({
    role: m.role,
    content: m.content,
  }))];
}

/**
 * 将用户填写的 Base URL 规范为 OpenAI 兼容的 chat/completions 完整地址。
 * 例如 https://api.deepseek.com → https://api.deepseek.com/v1/chat/completions
 */
function resolveChatCompletionsUrl(baseUrl) {
  const raw = (baseUrl || "").trim();
  if (!raw) return OPENAI_CHAT_URL;

  let url = raw.replace(/\/+$/, "");
  if (url.endsWith("/chat/completions")) return url;

  if (url.endsWith("/v1")) {
    return `${url}/chat/completions`;
  }

  if (!url.includes("/chat/")) {
    if (!url.endsWith("/v1")) {
      url = `${url}/v1`;
    }
    return `${url}/chat/completions`;
  }

  return url;
}

function sanitizeApiError(body, status) {
  if (!body) return status === 404 ? "接口地址或模型不存在 (404)" : "unknown error";
  try {
    const json = JSON.parse(body);
    const msg = json?.error?.message ?? json?.message;
    if (typeof msg === "string" && msg.length < 300) return msg;
  } catch {
    // ignore
  }
  const text = body.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (status === 404) {
    return text.slice(0, 120) || "接口地址或模型不存在 (404)";
  }
  return text.slice(0, 200) || "unknown error";
}

async function parseSSEStream(body, onDelta) {
  if (!body?.getReader) {
    throw new Error("E4012: LLM stream body unavailable");
  }

  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let fullText = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) continue;

      const data = trimmed.slice(5).trim();
      if (!data || data === "[DONE]") continue;

      let json;
      try {
        json = JSON.parse(data);
      } catch {
        continue;
      }

      const delta = json?.choices?.[0]?.delta?.content;
      if (typeof delta === "string" && delta.length > 0) {
        fullText += delta;
        onDelta(delta);
      }
    }
  }

  return fullText;
}

async function streamChatCompletion(options) {
  const {
    messages,
    apiKey,
    model,
    baseUrl,
    onDelta,
    fetchImpl = globalThis.fetch,
    timeoutMs = REQUEST_TIMEOUT_MS,
  } = options;

  if (!apiKey) {
    throw new Error("E4010: LLM API key not configured");
  }
  if (!fetchImpl) {
    throw new Error("E4011: fetch is not available in this runtime");
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const url = resolveChatCompletionsUrl(baseUrl);
    const response = await fetchImpl(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model || "gpt-4o-mini",
        messages,
        stream: true,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(
        `E4011: LLM request failed (${response.status}): ${sanitizeApiError(body, response.status)}`,
      );
    }

    return await parseSSEStream(response.body, onDelta);
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("E4013: LLM request timed out");
    }
    throw error;
  } finally {
    clearTimeout(timer);
  }
}

module.exports = {
  OPENAI_CHAT_URL,
  DEFAULT_SYSTEM_PROMPT,
  buildChatMessages,
  resolveChatCompletionsUrl,
  streamChatCompletion,
  parseSSEStream,
};
