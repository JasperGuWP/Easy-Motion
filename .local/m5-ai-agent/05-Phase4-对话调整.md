# Phase 4 — 对话调整

**工期**：3 天  
**依赖**：Phase 3  
**PR**：`feat/m5-langchain-agent-modify`  
**权威依据**：[LLM-Agent设计.md](../../docs/requirements/LLM-Agent设计.md) §参数调整 Prompt、[开发里程碑与路线图.md](../../docs/requirements/开发里程碑与路线图.md) §对话调整

## 目标

满足验收 **A2**：LangChain Agent 通过 `updateClip` 等 Tool 微调已有元素。

## 任务清单

### LangChain / Prompt

- [ ] 启用 `agent/prompts/adjust.js` — 复制 LLM-Agent设计 §**参数调整 Prompt**
- [ ] Agent 上下文注入选中 `clipJSON`（`AgentTask.context.selectedElement`）
- [ ] 完善 `updateClip`、`queryElement` Tool（Phase 3 首版可仅部分实现）

### 相对调整规则（文档规定）

| 用户说法 | Tool 参数策略 |
|----------|---------------|
| 大一点/小一点 | 数值 ±20% |
| 快一点/慢一点 | `durationInFrames` 减半/加倍 |
| 移到左/右 | position 偏移 |
| 颜色改成 xxx | 映射 hex |

### 冲突检测（路线图 §对话调整）

- [ ] `lastModifiedBy === "user"` 且 5 分钟内 → UI 确认覆盖
- [ ] 用户取消 → Agent 不写入（LangChain 执行前 abort 或 Tool 层拒绝）

### UI（组件库清单）

- [ ] `MessageItem` — user / assistant / **system** 样式
- [ ] `ActionButtons` — 「撤销此次 AI 修改」
- [ ] Assistant 消息展示修改摘要

### 跨 Store（状态管理）

- [ ] Agent 完成后 `eventBus.emit('conversation.diffReady', { subprojectId, diff })`
- [ ] `timelineStore` 订阅并应用 diff，触发 Generator

## 验收（A2）

选中文字 clip →「字体大一点」→ LangChain 调 `updateClip` → 预览更新。

## Prompt 回归

10 条用例见 [10-验收与测试.md](./10-验收与测试.md)。
