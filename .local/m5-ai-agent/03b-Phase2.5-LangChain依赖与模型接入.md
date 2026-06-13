# Phase 2.5 — LangChain 依赖与模型接入

**工期**：1 天  
**依赖**：Phase 1（可与 Phase 2 并行）  
**PR**：`feat/m5-langchain-bootstrap`  
**权威依据**：[技术规格.md](../../docs/requirements/技术规格.md) §LLM 与 Agent、[依赖清单与许可证.md](../../docs/requirements/依赖清单与许可证.md) §未来依赖扩展规划

## 目标

在 Phase 3 Agent 开发前，按需求文档引入 **LangChain.js**，完成主进程 ChatModel 工厂与冒烟验证。避免 Phase 3 边写工具边踩 Electron + LangChain 集成问题。

## 依赖安装

在 `apps/electron/package.json` 增加（版本锁定，不带 `^`）：

| 包名 | 用途 | 文档出处 |
|------|------|----------|
| `langchain` | Agent 编排、Tool、Prompt 模板 | 技术规格、LLM-Agent设计 |
| `@langchain/openai` | OpenAI / 兼容端点 ChatModel | 依赖清单 |
| `@langchain/anthropic` | Anthropic / MiniMax 兼容 ChatModel | 依赖清单 |
| `zod` | Tool 参数 schema（若尚未在 electron 包内） | LLM-Agent设计 §工具 JSON Schema |

> 注：`@anthropic-ai/sdk` 在依赖清单中为「备用」；M5 优先走 `@langchain/anthropic`，与 LangChain Tool 链路一致。

## 任务清单

### 主进程

- [ ] `agent/llm-factory.js` — 从 `settings-service` + `secrets-service` 构建 `ChatOpenAI` / `ChatAnthropic`
  - `provider: "openai" | "anthropic"`（与 [配置管理参考.md](../../docs/requirements/配置管理参考.md) 一致，禁止 `claude` 别名）
  - 支持自定义 `baseUrl`（MiniMax Anthropic 兼容）
  - `.env` 仅作开发后备（与 Phase 1 一致）
- [ ] `agent/llm-factory.test.js` 或脚本 — 主进程冒烟：单轮 `invoke("你好")` 返回非空
- [ ] `llm-service.js` 角色调整：
  - **保留** `main:llm:stream` 直通路径（调试用 / 纯聊天）
  - Phase 3 起用户消息改走 `conversation:send` → LangChain Agent；`llm-service` 可被 `llm-factory` 复用配置解析逻辑

### 文档对齐检查

- [ ] 确认 LangChain 运行在 **Electron 主进程**（`apps/electron/src/main/`），不打包进渲染进程
- [ ] 更新 [08-文件清单与PR拆分.md](./08-文件清单与PR拆分.md) 依赖列表

## 验收

- [ ] `pnpm install` 后 electron 包可 `require('langchain')` 无报错
- [ ] 配置有效 Key 后，主进程冒烟脚本收到 LLM 回复
- [ ] 无 Key 时明确 `E2804`，不崩溃

## 与 Phase 3 的衔接

Phase 3 在此基础上新增：

- `agent/tools/*` — 8 个 LangChain `DynamicStructuredTool`（见 [LLM-Agent设计.md](../../docs/requirements/LLM-Agent设计.md) §工具调用）
- `agent/graph.js` — `createToolCallingAgent` + `AgentExecutor`（或 LangGraph，见 Phase 3 文档）
- Prompt 模板从 `agent/prompts/` 加载，内容复制自 LLM-Agent设计 §Prompt 模板规范
