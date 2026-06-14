const ERROR_CODE_RE = /^E\d{4}:/;

function hasErrorCode(message) {
  return ERROR_CODE_RE.test(String(message ?? ""));
}

/**
 * 将 conversation:send 失败规范为 E2700，保留已有的 E#### 错误码（如 E2804、E2105）。
 */
function formatConversationSendError(error) {
  let raw = "";
  if (error instanceof Error) {
    raw = error.message;
  } else if (error != null) {
    raw = String(error);
  }
  raw = raw.trim();
  if (hasErrorCode(raw)) {
    return new Error(raw);
  }
  if (!raw) {
    return new Error("E2700: 消息发送失败");
  }
  return new Error(`E2700: 消息发送失败（${raw}）`);
}

module.exports = {
  hasErrorCode,
  formatConversationSendError,
};
