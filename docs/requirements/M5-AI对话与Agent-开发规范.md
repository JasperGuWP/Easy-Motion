# M5：AI 对话与 Agent — 开发规范

> 日期：2026-06-08  
> 里程碑：M5（Week 13–15）  
> 并行开发：与 M6 同时进行时，须遵守 [M5-M6-并行开发协作规范.md](M5-M6-并行开发协作规范.md)。

---

## 1. 目标

实现对话式 AI：用户用自然语言创建/调整时间线与动画，流式反馈，工具调用驱动 `timeline` 变更并触发 Generator 预览。

---

## 2. 范围

### In scope

- 对话面板 UI（消息列表、输入、图片上传、收起）
- LLM 服务（OpenAI / Claude，流式 SSE）
- API Key 安全存储与设置入口
- Agent 工具链：`createTrack`、`createClip`、`updateClip`、`deleteClip`、`queryElement`
- `importAsset`：**调用 M6 素材 IPC**，不自行写文件
- `conversation.json` 按子项目持久化
- 与现有 `timelineStore` + Generator 集成

### Out of scope（属 M6 / M7）

- 素材导入实现、删除素材 UI、SQLite 素材表 → **M6**
- 桌面拖入时间线、延长成片时长弹窗 → **M6**
- 关键帧曲线编辑 → **M7**
- 导出渲染 → **M8**

---

## 3. 目录与文件归属（M5 主改）

```
apps/electron/src/main/services/llm-service.js      # 新建
apps/electron/src/main/services/agent-service.js    # 新建（工具编排）
apps/electron/src/main/ipc-handlers/chat.js         # 新建
apps/electron/src/renderer/src/components/chat/     # 新建
apps/electron/src/renderer/src/stores/chatStore.ts  # 新建
apps/electron/src/preload/index.js                  # 追加 chat API（小步 PR）
apps/python/                                        # Agent 可选后端
packages/shared/src/agent-tools.js                  # 工具 schema（与 M6 共审）
```

### 禁止修改（除非与 M6 负责人协商）

- `asset-service.js` 内部实现
- `components/assets/`、`placeAssetClip.ts`
- `AppLayout.tsx` 左栏与素材相关布局

### 允许只读/调用

- `timelineStore`：通过已有 `runMutation`、`placeAssetAtFrame`（若 M6 已暴露）
- IPC：`main:asset:import`、`main:asset:list`
- IPC：`main:timeline:*` 现有接口

---

## 4. 开发规范

### 4.1 时间线变更

- **必须**走 `timelineStore` 已有 mutation 或 `lib/timeline/mutations.ts`
- **禁止**在 Agent 内直接 `fs.writeFile` 修改 `subproject.json`
- 每次工具成功执行后依赖现有 `scheduleGenerate` 更新预览
- 涉及删除片段时须可纳入撤销栈（与 M4 行为一致）

### 4.2 素材工具 `importAsset`

```text
用户/Agent 请求导入
    → IPC main:asset:import（M6 实现）
    → 返回 ProjectAsset { id, publicPath, durationInFrames, ... }
    → createClip(source.kind = 'asset', assetId, publicPath)
```

- **禁止**在 M5 复制文件到 `assets/` 或 `remotion/public/`
- M6-08 SQLite 切换前后，仅依赖 IPC 返回类型，不依赖 manifest 内部结构

### 4.3 对话与覆盖冲突

- 用户手动改时间线后，Agent 再改同一 `clipId` 须提示覆盖（见 [LLM-Agent设计.md](LLM-Agent设计.md)）
- 对话历史压缩策略：最近 10 轮 + 关键操作原文保留

### 4.4 UI

- 对话面板默认在 **右侧**（`RightPanel`），不挤占左侧素材库主区域
- 流式输出不阻塞时间线操作（异步 IPC）

### 4.5 安全

- 生成 Remotion 代码须经 [代码生成规范.md](代码生成规范.md) 白名单校验
- API Key 不得写入日志或 `conversation.json` 明文

---

## 5. IPC 规划（M5 新增）

| Channel | 责任方 | 说明 |
|---------|--------|------|
| `main:chat:send` | M5 | 发送消息，支持流式事件推送 `renderer:chat:chunk` |
| `main:chat:loadHistory` | M5 | 读取子项目 `conversation.json` |
| `main:chat:saveHistory` | M5 | 持久化 |
| `main:asset:*` | **M6** | M5 只调用 |

错误码沿用 [错误码统一字典.md](错误码统一字典.md)（建议 E3xxx 对话 / E4xxx Agent）。

---

## 6. 验收标准（M5）

- [ ] 输入「创建标题 Hello」→ 时间线出现 text 片段 → 预览可见
- [ ] 「字体大一点」→ `updateClip` 生效 → 预览更新
- [ ] Agent 调用 `importAsset` → 使用 M6 导入结果 → 可 `createClip` 引用视频
- [ ] LLM 超时重试 + 简化模式降级
- [ ] 违规生成代码被拒绝写入
- [ ] 切换子项目后对话历史独立

---

## 7. 测试

- `apps/electron/scripts/test-agent-tools.js`（mock LLM，不访问外网）
- 联调用例：M5 `importAsset` + M6 导入链 → 预览 `staticFile` 200

---

## 8. 依赖与顺序

| 依赖 | 说明 |
|------|------|
| M4 | 时间线编辑、Generator、预览 |
| M6 IPC 契约 | 开工前与 M6 对齐 §4.1（可先用现有 `main:asset:import`） |
| M6-08 | SQLite 可晚于 M5 文本 Agent；`importAsset` 联调前需 M6 导入稳定 |

---

## 9. 相关文档

- [M5-M6-并行开发协作规范.md](M5-M6-并行开发协作规范.md)
- [M6-素材管理与预设-开发规范.md](M6-素材管理与预设-开发规范.md)
- [LLM-Agent设计.md](LLM-Agent设计.md)
- [开发里程碑与路线图.md](开发里程碑与路线图.md) § M5
