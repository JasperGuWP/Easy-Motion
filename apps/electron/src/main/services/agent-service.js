const { AGENT_TOOLS_OPENAI } = require("@easymotion/shared");
const { loadSettings, getApiKey } = require("./settings-service");
const { resolveChatCompletionsUrl } = require("./llm-service");
const {
  AgentTimelineSession,
  executeTool,
  tryFastPath,
} = require("./agent-tool-executor");

const MAX_TOOL_ROUNDS = 6;
const AGENT_LLM_TIMEOUT_MS = 45_000;
const AGENT_LLM_MAX_RETRIES = 1;

function buildAgentSystemPrompt(timelineSummary) {
  return `你是 Easy-Motion 的 AI 动画创作 Agent，通过工具修改用户的时间线（Remotion 项目）。

规则：
- 用户要求创建/修改动画时，必须调用工具，不要只口头描述
- 创建标题文字：先 createTrack(type=text)，再 createClip 写入 source.content
- 调整属性用 updateClip，路径如 style.fontSize、source.content、style.color
- 「字体大一点」：先 queryElement 定位文字片段，再 updateClip 将 style.fontSize 乘以 1.2（当前值×1.2 取整）
- 「字体小一点」：style.fontSize 乘以 0.8
- 不确定目标片段时先 queryElement
- 完成后用简短中文告诉用户做了什么

当前时间线摘要：
${JSON.stringify(timelineSummary, null, 2)}`;
}

async function callLlmWithTools(messages, settings, apiKey, attempt = 0) {
  const url = resolveChatCompletionsUrl(settings.llm?.baseUrl);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), AGENT_LLM_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: settings.llm?.model || "gpt-4o-mini",
        messages,
        tools: AGENT_TOOLS_OPENAI,
        tool_choice: "auto",
        stream: false,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const body = await response.text();
      let detail = body.slice(0, 200);
      try {
        detail = JSON.parse(body)?.error?.message ?? detail;
      } catch {
        // ignore
      }
      throw new Error(`E4011: LLM request failed (${response.status}): ${detail}`);
    }

    return response.json();
  } catch (error) {
    const retriable =
      error.name === "AbortError" ||
      error.message?.includes("E4011") ||
      error.message?.includes("fetch failed");

    if (retriable && attempt < AGENT_LLM_MAX_RETRIES) {
      return callLlmWithTools(messages, settings, apiKey, attempt + 1);
    }

    if (error.name === "AbortError") {
      throw new Error("E4013: LLM request timed out");
    }
    throw error;
  } finally {
    clearTimeout(timer);
  }
}

function buildAgentMessages(conversationMessages, timelineSummary) {
  const recent = (conversationMessages ?? [])
    .filter((m) => m.role === "user" || m.role === "assistant")
    .slice(-12);

  return [
    { role: "system", content: buildAgentSystemPrompt(timelineSummary) },
    ...recent.map((m) => ({ role: m.role, content: m.content })),
  ];
}

async function streamText(text, onDelta) {
  for (const char of text) {
    onDelta(char);
  }
}

function formatFastPathReply(fast) {
  if (fast.kind === "createTitle") {
    return (
      `已创建标题文字「${fast.title}」，并写入时间线。\n` +
      `轨道 ID：${fast.trackId}\n片段 ID：${fast.clipId}\n\n请在预览中查看效果。`
    );
  }
  if (fast.kind === "fontSize") {
    return (
      `已将文字字号从 ${fast.previousSize}px 调整为 ${fast.nextSize}px` +
      `（${fast.direction === "up" ? "放大约 20%" : "缩小约 20%"}）。\n\n请在预览中查看效果。`
    );
  }
  return "已完成时间线修改，请在预览中查看效果。";
}

async function runSimplifiedAgent(session, userMessage, onDelta) {
  const fast = tryFastPath(session, userMessage);
  if (fast?.success) {
    await session.commit();
    const reply = `（简化模式）${formatFastPathReply(fast)}`;
    await streamText(reply, onDelta);
    return {
      replyText: reply,
      timelineUpdated: true,
      simplifiedMode: true,
      toolLog: [{ tool: fast.kind, success: true, fastPath: true }],
    };
  }

  const reply =
    "E4009: 已切换至简化模式。\n\n" +
    "当前仅支持：\n" +
    "• 「创建一个标题写着 Hello」\n" +
    "• 「字体大一点」/「字体小一点」（需时间线上已有文字片段）\n\n" +
    (fast?.error ? `原因：${fast.error}` : "请换用以上句式重试。");
  await streamText(reply, onDelta);
  return {
    replyText: reply,
    timelineUpdated: false,
    simplifiedMode: true,
    toolLog: [],
  };
}

async function runFastPathIfMatched(session, userMessage, onDelta) {
  const fast = tryFastPath(session, userMessage);
  if (!fast?.success) return null;

  await session.commit();
  const reply = formatFastPathReply(fast);
  await streamText(reply, onDelta);
  return {
    replyText: reply,
    timelineUpdated: true,
    toolLog: [{ tool: fast.kind, success: true, fastPath: true }],
  };
}

async function runAgentTurn({
  projectRoot,
  subprojectPath,
  conversationMessages,
  userMessage,
  onDelta,
}) {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("E4010: LLM API key not configured");
  }

  const settings = loadSettings();
  const session = new AgentTimelineSession(projectRoot, subprojectPath);
  const toolLog = [];

  const fastResult = await runFastPathIfMatched(session, userMessage, onDelta);
  if (fastResult) return fastResult;

  let messages = buildAgentMessages(conversationMessages, session.getSummary());
  messages.push({ role: "user", content: userMessage });

  let finalText = "";

  try {
    for (let round = 0; round < MAX_TOOL_ROUNDS; round += 1) {
      const data = await callLlmWithTools(messages, settings, apiKey);
      const choice = data?.choices?.[0];
      const msg = choice?.message;
      if (!msg) {
        throw new Error("E4000: Agent LLM returned empty message");
      }

      if (msg.tool_calls?.length) {
        messages.push({
          role: "assistant",
          content: msg.content ?? "",
          tool_calls: msg.tool_calls,
        });

        for (const tc of msg.tool_calls) {
          const name = tc.function?.name;
          let args = {};
          try {
            args = JSON.parse(tc.function?.arguments || "{}");
          } catch {
            args = {};
          }

          const result = executeTool(session, name, args);
          toolLog.push({ tool: name, success: result.success, error: result.error });

          messages.push({
            role: "tool",
            tool_call_id: tc.id,
            content: JSON.stringify(result),
          });
        }

        messages[0] = {
          role: "system",
          content: buildAgentSystemPrompt(session.getSummary()),
        };
        continue;
      }

      finalText = (msg.content || "").trim();
      break;
    }
  } catch (error) {
    return runSimplifiedAgent(session, userMessage, onDelta);
  }

  if (!finalText) {
    finalText = "已完成工具调用。若预览未更新，请稍候或手动刷新时间线。";
  }

  const commitResult = await session.commit();
  await streamText(finalText, onDelta);

  return {
    replyText: finalText,
    timelineUpdated: Boolean(commitResult.committed),
    toolLog,
  };
}

/**
 * 判断是否应走 Agent（含工具）而非纯聊天
 */
function shouldUseAgent(userMessage) {
  const text = String(userMessage ?? "").trim();
  if (!text) return false;
  const agentHints =
    /创建|添加|做一个|标题|文字|字体|大一点|小一点|放大|缩小|删除|改成|修改|放到|轨道|片头|动画|hello|Hello|颜色|字号/i;
  return agentHints.test(text);
}

module.exports = {
  runAgentTurn,
  runSimplifiedAgent,
  shouldUseAgent,
  buildAgentSystemPrompt,
  AGENT_LLM_TIMEOUT_MS,
  AGENT_LLM_MAX_RETRIES,
};
