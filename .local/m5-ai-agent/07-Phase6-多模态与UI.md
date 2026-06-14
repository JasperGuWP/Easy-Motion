# Phase 6 — 多模态与 UI 完善

**工期**：3 天（P2 stretch 部分可延后）  
**依赖**：Phase 5  
**PR**：`feat/m5-multimodal`  
**状态**：✅ 核心完成（2026-06-14）；折叠 ⏭️ 不做（右侧 Tab）  
**权威依据**：[LLM-Agent设计.md](../../docs/requirements/LLM-Agent设计.md) §视觉解析、[组件库清单.md](../../docs/requirements/组件库清单.md) §2.4

## 目标

满足 **A6**；对话 UI 对齐组件库清单。

## 任务清单

### 多模态（LangChain）

- [x] `MessageInput` + `ImageAttachment` — 上传/预览
- [x] 图片存 `assets/ai-refs/`（`ai-ref-service.js`）
- [x] `agent/prompts/vision.js`
- [x] `agent/multimodal.js` — `HumanMessage` content blocks
- [x] `vision-analyze.js` + `layout-mapper.js` → Tool 参数
- [x] 视觉失败 → 纯文字 Agent + `systemNotice`

### 对话组件树

```
AIAssistantPanel
├── MessageList
│   └── MessageItem (+ ActionButtons)
├── GenerationProgress  ← agentStatus
└── MessageInput (+ ImageAttachment)
```

- [x] 上述结构已落地
- [x] `role: system` — 进度、降级、错误
- [x] 空状态示例指令可点击（`MessageList`）

### 未完成（见 [11-剩余工作与验收.md](./11-剩余工作与验收.md)）

- [x] **历史消息**中 `attachedImages` 缩略图（`MessageImageThumbnails`）
- [x] **参考图拖拽排序**（`useImageReorder` → `reorderImages`）
- [x] **对话面板收起/展开** — ⏭️ 不做（右侧 Tab 切换已覆盖；见路线图 `BottomConversationBar` 为可选模式）

### 明确不做

- `BottomConversationBar` 全展开（v1.0 范围外）

## 验收（A6）

- [x] 上传参考图 + 布局描述 → 视觉链 + Tools — 路径已通
- ⬜ 布局「大致合理」— 待手测；可标 **M5.1**
