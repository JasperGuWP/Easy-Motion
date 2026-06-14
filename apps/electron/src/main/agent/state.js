/** Agent 状态，对齐 LLM-Agent设计.md §工作流状态机 */
const AgentState = {
  IDLE: "idle",
  PARSING: "parsing",
  ANALYZING: "analyzing",
  GENERATING: "generating",
  EXECUTING: "executing",
  COMPLETED: "completed",
  FAILED: "failed",
  CLARIFYING: "clarifying",
};

module.exports = { AgentState };
