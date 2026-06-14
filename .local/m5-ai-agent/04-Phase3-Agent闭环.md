# Phase 3 — LangChain Agent 最小闭环（M5 核心）

**工期**：6 天  
**依赖**：Phase 1、Phase 2、**Phase 2.5**  
**PR**：`feat/m5-langchain-agent-create-text`  
**状态**：✅ 已实现（2026-06-14）  
**权威依据**：[LLM-Agent设计.md](../../docs/requirements/LLM-Agent设计.md)、[技术规格.md](../../docs/requirements/技术规格.md)

## 目标

用 **LangChain.js Tool + Agent** 打通验收 **A1**。

---

## 3.1 LangChain 工具层（8 个 Tool）

路径：`apps/electron/src/main/agent/tools/index.js`（单文件导出 8 个 Tool，非 8 个独立文件）

| Tool | 说明 | 状态 |
|------|------|------|
| `createTrack` | 新建轨道 | ✅ |
| `createClip` | 新建片段 | ✅ |
| `updateClip` | 更新属性 | ✅ |
| `deleteClip` | 删除片段 | ✅ |
| `addKeyframe` | 关键帧 | ✅ |
| `setAnimation` | 入/出场动画 | ✅ |
| `queryElement` | 查询元素 | ✅ |
| `importAsset` | 导入素材 | ✅ |

---

## 3.2 LangChain Agent 编排

| 文件 | 职责 | 状态 |
|------|------|------|
| `agent/llm-factory.js` | ChatOpenAI / ChatAnthropic | ✅ |
| `agent/prompts/system.js` | 系统 Prompt | ✅ |
| `agent/state.js` | `AgentState`、`AgentTask` | ✅ |
| `agent/graph.js` | LangChain `createAgent()`（v1.4 API） | ✅ |
| `agent/index.js` | `runAgent({ input, context, onChunk })` | ✅ |
| `agent/timeline-context.js` | Tool 执行上下文 | ✅ |
| `agent/timeline-ops.js` | 时间线变更原语 | ✅ |

> **实现差异**：文档写 `createToolCallingAgent` + `AgentExecutor`；实际为 LangChain 1.4 的 `createAgent()`，行为等价。

---

## 3.3 IPC

- [x] `main:conversation:send` / `cancel` / `clear`
- [x] `renderer:conversation:chunk` / `complete` / `error` / `status`
- [x] `main:conversation:load` / `save`
- [x] `main:llm:stream` 保留调试

---

## 3.4 渲染进程

- [x] `sendMessage` → `conversation:send`
- [x] `agentStatus` ← `conversation:status`
- [x] Agent 完成后更新 timeline + 预览（`replaceTimelineFromAgent`）
- [x] `eventBus.emit('conversation.diffReady')` — `timelineStore.subscribeToEventBus` 订阅
- [x] 组件：`MessageList`、`GenerationProgress`、`MessageInput` 等

---

## 验收（A1）

- [x] 「创建标题写着 Hello，带淡入」→ Tool 改 timeline + 预览 — 路径已通，⬜ 待 E2E 签字
