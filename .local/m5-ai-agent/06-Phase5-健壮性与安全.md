# Phase 5 — 健壮性与安全

**工期**：2 天  
**依赖**：Phase 4  
**PR**：`feat/m5-agent-resilience`  
**权威依据**：[技术规格.md](../../docs/requirements/技术规格.md) §错误恢复、[错误码统一字典.md](../../docs/requirements/错误码统一字典.md)

## 目标

满足 **A4**、**A5**。

## 任务清单

### LangChain / LLM 超时（A4）

- [ ] `AgentExecutor` 外包超时控制（90s 首响应，对齐 IPC 规范 §llm）
- [ ] 失败自动重试 1 次（技术规格 §LLM 调用失败）
- [ ] 仍失败 → `agent/fallback-templates.js` 简化模式（`createTrack` + `createClip("Hello")`）
- [ ] system 消息通知用户进入简化模式

### 代码安全（A5）

- [ ] Generator 写入前 TSX 白名单扫描（禁止 `fs`、`child_process`、`eval`）
- [ ] LangChain Tool 层仅 mutate timeline JSON，不直接写任意 TSX
- [ ] 违规 → 拒绝 + 错误码

### Agent 取消

- [ ] `main:conversation:cancel` → `AbortController` 中止 LangChain stream + 进行中的 Tool
- [ ] 取消后不写入 partial timeline

### 错误码

| 码 | 场景 |
|----|------|
| E2700 | 消息发送失败 |
| E2701 | conversation 损坏 |
| E2800/E2804/E2810 | LLM 域 |

## 验收

断网/无效 Key/流中断有明确 UI；简化模式可生成基础文字；恶意 TSX 被拦截。
