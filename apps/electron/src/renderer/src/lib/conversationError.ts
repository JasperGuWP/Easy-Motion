/** 解析对话/Agent IPC 错误消息，用于 Toast 标题与描述 */
export function describeConversationError(message: string): {
  title: string;
  description: string;
} {
  const trimmed = message.trim();

  if (trimmed.includes("E2700")) {
    const detail = trimmed.replace(/^E\d{4}:\s*/, "").trim();
    return {
      title: "消息发送失败",
      description: detail || "请检查网络与 API 配置后重试",
    };
  }

  if (trimmed.includes("E2701")) {
    return {
      title: "对话历史损坏",
      description: trimmed.replace(/^E\d{4}:\s*/, "") || "无法读取 conversation.json",
    };
  }

  if (trimmed.includes("E2804")) {
    return {
      title: "API Key 无效",
      description: trimmed.replace(/^E\d{4}:\s*/, "") || "请在设置中检查 LLM 配置",
    };
  }

  if (trimmed.includes("E2105")) {
    return {
      title: "未打开项目",
      description: "请先创建或打开一个项目",
    };
  }

  return {
    title: "Agent 执行失败",
    description: trimmed || "未知错误",
  };
}
