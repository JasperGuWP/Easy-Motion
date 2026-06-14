# Phase 5 — 健壮性与安全

**工期**：2 天  
**依赖**：Phase 4  
**PR**：`feat/m5-agent-resilience`  
**状态**：🟡 大部分完成（2026-06-14；E2700 已补）  
**权威依据**：[技术规格.md](../../docs/requirements/技术规格.md) §错误恢复

## 目标

满足 **A4**、**A5**。

## 任务清单

### LangChain / LLM 超时（A4）

- [x] `agent/stream-timeout.js` — 90s 首响应
- [x] 失败自动重试 1 次（`agent/index.js` `maxAttempts = 2`）
- [x] 仍失败 → `agent/fallback-templates.js` 简化模式
- [x] system 消息通知简化模式（`conversationStore` 插入 `role: system`）

### 代码安全（A5）

- [x] `generator/security-scan.js` — TSX 白名单（禁止 eval/fs/child_process 等）
- [x] Generator 写入前 `assertTsxSecurity`
- [x] Tool 层仅 mutate timeline JSON
- [x] 违规 → `E2408` 拒绝

### Agent 取消

- [x] `main:conversation:cancel` → `AbortController`
- [x] abort 后不落盘 partial timeline（`saveTimeline` 前有 abort 检查）

### 错误码

| 码 | 场景 | 状态 |
|----|------|------|
| E2700 | 消息发送失败 | ✅ |
| E2701 | conversation 损坏 | ✅ |
| E2800/E2804/E2810 | LLM 域 | ✅ |

### 测试

- [x] `scripts/test-agent-resilience.js`

## 验收

- [x] 简化模式可生成基础文字 — 脚本覆盖
- [x] 恶意 TSX 被拦截 — 脚本覆盖
- ⬜ 断网/无效 Key/流中断 UI 手测签字
