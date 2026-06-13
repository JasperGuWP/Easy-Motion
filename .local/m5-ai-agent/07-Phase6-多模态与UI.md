# Phase 6 — 多模态与 UI 完善

**工期**：3 天（P2 stretch 部分可延后）  
**依赖**：Phase 5  
**PR**：`feat/m5-multimodal`  
**权威依据**：[LLM-Agent设计.md](../../docs/requirements/LLM-Agent设计.md) §视觉解析、[组件库清单.md](../../docs/requirements/组件库清单.md) §2.4

## 目标

满足 **A6**；对话 UI 对齐组件库清单。

## 任务清单

### 多模态（LangChain）

- [ ] `MessageInput` + `ImageAttachment` — 上传/预览/排序（组件库清单）
- [ ] 图片存 `assets/ai-refs/`
- [ ] `agent/prompts/vision.js` — LLM-Agent设计 §**视觉解析 Prompt**
- [ ] LangChain 多模态消息：`HumanMessage` content blocks（image_url + text）
- [ ] layout JSON → `createTrack` / `createClip` Tool 参数

### 对话组件树（组件库清单 §2.4）

```
AIAssistantPanel
├── MessageList
│   └── MessageItem (+ ActionButtons)
├── GenerationProgress  ← agentStatus / AgentState
└── MessageInput (+ ImageAttachment)
```

- [ ] `role: system` — 执行进度、降级、错误
- [ ] 空状态示例指令可点击填充（UI布局 §7.3 新手引导，可简化）

### 明确不做

- `BottomConversationBar` 全展开（组件库标注 v1.0，M5 不实现）

## 验收（A6）

上传参考图 + 布局描述 → LangChain 视觉链 + Tools → 布局大致合理。

## 降级

视觉解析失败 → 回退纯文字 Agent，system 提示补充描述（路线图风险表）。
