# Phase 2 — 对话持久化

**工期**：2 天  
**依赖**：Phase 0（可与 Phase 1 并行）  
**PR**：`feat/m5-conversation-persistence`  
**权威依据**：[IPC通信协议规范.md](../../docs/requirements/IPC通信协议规范.md) §6、[状态管理详细设计.md](../../docs/requirements/状态管理详细设计.md) §3、[项目管理.md](../../docs/requirements/项目管理.md)

## 目标

实现 `conversation.json` 读写 + `conversationStore`，满足验收 **A3**。

## 任务清单

### 主进程

- [x] `services/conversation-service.js`
- [x] `ipc-handlers/conversation.js`（`load` / `save` / `clear`）

### 渲染进程

- [x] `stores/conversationStore.ts`
- [x] `types/conversation.ts`
- [x] `lib/eventBus.ts`（`mitt`）
- [x] 重构 `AIAssistantPanel`
- [x] `projectStore` / `App.tsx` → `loadConversation`

### 数据结构

对齐 [状态管理详细设计.md](../../docs/requirements/状态管理详细设计.md) §Message：

```typescript
interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: number;
  attachedImages?: string[];
  codeDiff?: CodeDiff;
  actionButtons?: ActionButton[];
}
```

## 验收

- [ ] 发消息后关闭项目再打开，历史仍在（A3）
- [ ] 切换子项目，对话历史独立
- [ ] 损坏文件 → `E2701`（[错误码统一字典.md](../../docs/requirements/错误码统一字典.md)）
- [ ] 切换 Tab 不丢 state（RightPanel keep-alive）

## 注意

- 此阶段 `sendMessage` 可仍调 `main:llm:stream` 验证持久化
- **Phase 2.5** 引入 LangChain；**Phase 3** 将 `sendMessage` 切到 `main:conversation:send`
