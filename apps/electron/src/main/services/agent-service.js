const { AGENT_TOOLS_OPENAI } = require("@easymotion/shared");
const { loadSettings, getApiKey } = require("./settings-service");
const { resolveChatCompletionsUrl } = require("./llm-service");
const {
  AgentTimelineSession,
  executeTool,
  tryFastPathTitle,
} = require("./agent-tool-executor");

const MAX_TOOL_ROUNDS = 6;

function buildAgentSystemPrompt(timelineSummary) {
  return `你是 Easy-Motion 的 AI 动画创作 Agent，通过工具修改用户的时间线（Remotion 项目）。

规则：
- 用户要求创建/修改动画时，必须调用工具，不要只口头描述
- 创建标题文字：先 createTrack(type=text)，再 createClip 写入 source.content
- 调整属性用 updateClip，路径如 style.fontSize、source.content
- 不确定目标片段时先 queryElement
- 完成后用简短中文告诉用户做了什么

当前时间线摘要：
${JSON.stringify(timelineSummary, null, 2)}`;
}

async function callLlmWithTools(messages, settings, apiKey) {
  const url = resolveChatCompletionsUrl(settings.llm?.baseUrl);
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

  const fast = tryFastPathTitle(session, userMessage);
  if (fast?.success) {
    await session.commit();
    const reply =
      `已创建标题文字「${fast.title}」，并写入时间线。\n` +
      `轨道 ID：${fast.trackId}\n片段 ID：${fast.clipId}\n\n请在预览中查看效果。`;
    await streamText(reply, onDelta);
    return {
      replyText: reply,
      timelineUpdated: true,
      toolLog: [
        { tool: "createTrack", success: true },
        { tool: "createClip", success: true, fastPath: true },
      ],
    };
  }

  let messages = buildAgentMessages(conversationMessages, session.getSummary());
  messages.push({ role: "user", content: userMessage });

  let finalText = "";

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

      session.getSummary();
      messages[0] = {
        role: "system",
        content: buildAgentSystemPrompt(session.getSummary()),
      };
      continue;
    }

    finalText = (msg.content || "").trim();
    break;
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
    /创建|添加|做一个|标题|文字|字体|大一点|小一点|删除|改成|修改|放到|轨道|片头|动画|hello|Hello/i;
  return agentHints.test(text);
}

module.exports = {
  runAgentTurn,
  shouldUseAgent,
  buildAgentSystemPrompt,
};
