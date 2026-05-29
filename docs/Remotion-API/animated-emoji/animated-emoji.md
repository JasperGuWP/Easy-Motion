---
title: "<AnimatedEmoji>"
source: https://www.remotion.dev/docs/animated-emoji/animated-emoji
---

# <AnimatedEmoji>

所属包: `@remotion/animated-emoji` | 最低版本: v4.0.187

## 功能描述

`<AnimatedEmoji>` 组件用于显示来自 [Google Fonts Animated Emoji](https://googlefonts.github.io/noto-emoji-animation/) 的动画表情符号。

**Self-hosting**: 要加载资源，需要将 [`remotion-dev/animated-emoji`](https://github.com/remotion-dev/animated-emoji) 仓库中 `public` 文件夹下的视频文件复制到你 Remotion 项目的 `public` 文件夹中。

## 示例代码

```tsx
import { AnimatedEmoji } from "@remotion/animated-emoji";

export const MyAnimation: React.FC = () => {
  return <AnimatedEmoji emoji="blush" />;
};
```

## 属性 (Props)

### `emoji`

- **类型**: `string`
- **必需**: 是
- **说明**: 指定要显示的表情符号名称。可用的动画版本可以在 [这里](https://googlefonts.github.io/noto-emoji-animation/) 查看。
- **注意**: 默认情况下不会包含任何表情符号资源文件。需要从 `@remotion/animated-emoji` 的 `public` 文件夹中将视频文件复制到 Remotion 项目的 `public` 文件夹中。

### `scale?`

- **类型**: `number`（可选值: `0.5`、`1`、`2`）
- **默认值**: `1`
- **说明**: 更改要加载的视频分辨率。

| scale 值 | 分辨率 |
|----------|--------|
| `0.5` | 512x512px |
| `1` | 1024x1024px |
| `2` | 2048x2048px |

### `calculateSrc?`

- **类型**: `CalculateEmojiSrc`（函数类型）
- **说明**: 自定义视频资源的加载路径。

默认实现:

```tsx
import { staticFile } from "remotion";
import type { CalculateEmojiSrc } from "@remotion/animated-emoji";

export const defaultCalculateEmojiSrc: CalculateEmojiSrc = ({
  emoji,
  scale,
  format,
}) => {
  const extension = format === "hevc" ? "mp4" : "webm";
  return staticFile(`${emoji}-${scale}x.${extension}`);
};
```

参数说明:

| 参数 | 说明 |
|------|------|
| `emoji` | 表情符号的名称 |
| `scale` | 缩放比例（`0.5`、`1` 或 `2`） |
| `format` | 视频格式（`"hevc"` 或 `"webm"`） |

- 如果格式是 `"hevc"`，则使用 `.mp4` 扩展名
- 否则使用 `.webm` 扩展名
- 最终路径格式：`{emoji}-{scale}x.{extension}`

## 参见

- [@remotion/animated-emoji 包文档](/docs/animated-emoji)
- [getAvailableEmojis() 函数文档](/docs/animated-emoji/get-available-emoji)
