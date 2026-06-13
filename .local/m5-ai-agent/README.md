# M5 — AI 对话面板 + Agent 集成

> 执行计划对齐 [`docs/requirements/`](../../docs/requirements/)。**Agent 框架：LangChain.js**（技术规格、LLM-Agent设计、依赖清单）。  
> 基线日期：2026-06-13 | 预估工期：3 周

## 当前进度

| 模块 | 状态 | 说明 |
|------|------|------|
| LLM 流式代理 | ✅ Phase 0 | `main:llm:*` + 聊天 UI |
| 设置 / Key 安全 | ✅ Phase 1 | `settings.json` + `secrets.json` |
| 对话持久化 | ✅ Phase 2 | `conversation.json` + `conversationStore` |
| LangChain 接入 | ⬜ Phase 2.5 | `langchain` + `llm-factory` |
| Agent + 8 Tools | ⬜ Phase 3 | LangChain AgentExecutor |
| 多模态 | ⬜ Phase 6 | 视觉解析 Prompt |

**整体约 40–45%**

## 阅读顺序

| 步骤 | 文档 |
|------|------|
| 1. 背景与决策 | [00-概述与现状.md](./00-概述与现状.md) |
| 2. Phase 0–2 | [01](./01-Phase0-合入基线.md) → [03](./03-Phase2-对话持久化.md) |
| 3. **LangChain** | [03b-Phase2.5-LangChain依赖与模型接入.md](./03b-Phase2.5-LangChain依赖与模型接入.md) |
| 4. Agent 闭环 | [04](./04-Phase3-Agent闭环.md) → [07](./07-Phase6-多模态与UI.md) |
| 5. 工程与验收 | [08](./08-文件清单与PR拆分.md) · [09](./09-排期分工与风险.md) · [10](./10-验收与测试.md) |

## 权威规范（必读）

| 文档 | 用途 |
|------|------|
| [开发里程碑与路线图.md](../../docs/requirements/开发里程碑与路线图.md) | M5 交付物与验收 |
| [LLM-Agent设计.md](../../docs/requirements/LLM-Agent设计.md) | **LangChain** 工作流、Prompt、8 工具 |
| [技术规格.md](../../docs/requirements/技术规格.md) | LangChain 选型、安全、降级 |
| [依赖清单与许可证.md](../../docs/requirements/依赖清单与许可证.md) | `langchain` 包引入时机 |
| [应用架构详细设计.md](../../docs/requirements/应用架构详细设计.md) | conversation IPC、目录结构 |
| [状态管理详细设计.md](../../docs/requirements/状态管理详细设计.md) | conversationStore、eventBus |
| [IPC通信协议规范.md](../../docs/requirements/IPC通信协议规范.md) | 通道、错误码 |
| [配置管理参考.md](../../docs/requirements/配置管理参考.md) | settings / secrets |
| [组件库清单.md](../../docs/requirements/组件库清单.md) | 对话 UI 组件树 |

## 与 `docs/` 的关系

- `docs/requirements/`：**权威规范**（含 LangChain 选型）
- `.local/m5-ai-agent/`：**执行排期**；若与 docs 冲突，以 docs 为准并更新本计划
