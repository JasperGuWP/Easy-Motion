# Phase 4 — 对话调整

**工期**：3 天  
**依赖**：Phase 3  
**PR**：`feat/m5-langchain-agent-modify`  
**状态**：✅ 已实现（2026-06-14）  
**权威依据**：[LLM-Agent设计.md](../../docs/requirements/LLM-Agent设计.md) §参数调整 Prompt

## 目标

满足验收 **A2**：LangChain Agent 通过 `updateClip` 等 Tool 微调已有元素。

## 任务清单

### LangChain / Prompt

- [x] `agent/prompts/adjust.js` — 参数调整 Prompt
- [x] Agent 上下文注入选中 `clipJSON`（`buildAdjustPromptSection`）
- [x] `updateClip`、`queryElement` Tool 完整可用

### 相对调整规则

- [x] 大一点/小一点 → `clip-updates.js` ±20%
- [x] 快/慢 → `durationInFrames` 减半/加倍
- [x] 左/右/上/下 → position 偏移
- [x] 颜色 → hex / `style.background` 等

### 冲突检测

- [x] `lastModifiedBy === "user"` + 5 分钟内 → `window.confirm`
- [x] 用户取消 → Tool 层 `E2010` / 不写入

### UI

- [x] `MessageItem` — user / assistant / system
- [x] `ActionButtons` — 「撤销此次 AI 修改」
- [x] Assistant 消息 `codeDiff.summary`

### 跨 Store

- [x] `eventBus.emit('conversation.diffReady', …)`
- [x] timeline 更新 + `syncPreviewAfterTimelineEdit`（经 `conversation.diffReady` → `timelineStore`）

## 验收（A2）

- [x] 选中 clip →「字体大一点」→ `updateClip` → 预览 — 路径已通，⬜ 待 E2E 签字

## 补充（会话中已修）

- [x] `NewsletterBackground` 等 animation 背景组件支持 `clip.style` 覆盖（否则 AI 改背景不生效）
