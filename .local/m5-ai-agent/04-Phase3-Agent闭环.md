# Phase 3 — LangChain Agent 最小闭环（M5 核心）

**工期**：6 天  
**依赖**：Phase 1、Phase 2、**Phase 2.5**  
**PR**：`feat/m5-langchain-agent-create-text`  
**权威依据**：[LLM-Agent设计.md](../../docs/requirements/LLM-Agent设计.md)、[技术规格.md](../../docs/requirements/技术规格.md)

## 目标

用 **LangChain.js Tool + AgentExecutor** 打通验收 **A1**。

---

## 3.1 LangChain 工具层（8 个 Tool）

路径：`apps/electron/src/main/agent/tools/`

[LLM-Agent设计.md](../../docs/requirements/LLM-Agent设计.md) §工具调用 → `DynamicStructuredTool` + `zod`：

| Tool | 说明 |
|------|------|
| `createTrack` | 新建轨道 |
| `createClip` | 新建片段 |
| `updateClip` | 更新属性 |
| `deleteClip` | 删除片段 |
| `addKeyframe` | 关键帧 |
| `setAnimation` | 入/出场动画 |
| `queryElement` | 查询元素 |
| `importAsset` | 导入素材 |

首版先实现：`createTrack`、`createClip`、`setAnimation`、`queryElement`。

---

## 3.2 LangChain Agent 编排

| 文件 | 职责 |
|------|------|
| `agent/llm-factory.js` | ChatOpenAI / ChatAnthropic（Phase 2.5） |
| `agent/prompts/system.js` | 系统 Prompt（LLM-Agent设计 §系统 Prompt） |
| `agent/state.js` | `AgentState`、`AgentTask` |
| `agent/graph.js` | `createToolCallingAgent` + `AgentExecutor` |
| `agent/index.js` | `runAgent({ input, context, onChunk })` |

流程对齐 LLM-Agent设计 §整体流程：意图 → Tool 链 → timeline 更新 → Generator → 反馈。

---

## 3.3 IPC

**发送**（[应用架构详细设计.md](../../docs/requirements/应用架构详细设计.md) §conversation）：

- `main:conversation:send` / `cancel` / `clear`
- `renderer:conversation:chunk` / `complete` / `error`

**持久化**（[IPC通信协议规范.md](../../docs/requirements/IPC通信协议规范.md) §6）：

- `main:conversation:load` / `save`

用户消息改走 `conversation:send`；`main:llm:stream` 保留调试。

---

## 3.4 渲染进程

[状态管理详细设计.md](../../docs/requirements/状态管理详细设计.md) §conversationStore：

- `sendMessage` → `conversation:send`
- `agentStatus` ← `conversation:status`
- timeline 更新 → `eventBus.emit('conversation.diffReady', …)` 或 `timelineStore.loadTimeline()`
- 组件拆分：[组件库清单.md](../../docs/requirements/组件库清单.md) `MessageList`、`GenerationProgress`

---

## 验收（A1）

「创建标题写着 Hello，带淡入」→ LangChain 调 Tool → 时间线 + 预览 + `conversation.json`。
