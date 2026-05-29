---
title: "getAvailableFonts()"
source: https://www.remotion.dev/docs/google-fonts/get-available-fonts
---

# getAvailableFonts()

所属包: `@remotion/google-fonts` | 最低版本: v3.3.64 (`.load()` 支持)

## 描述

返回 `@remotion/google-fonts` 中所有可用字体的数组。从 v3.3.64 版本起，如果使用 ES Modules 加载该函数，可以通过调用 `.load()` 来单独加载每个字体。

## 用法示例

```ts
import { getAvailableFonts } from "@remotion/google-fonts";

console.log(getAvailableFonts());
```

## 返回值

返回一个数组，每个元素包含以下字段：

| 字段名 | 说明 |
|--------|------|
| `fontFamily` | 在 CSS 中引用该字体时应使用的名称 |
| `importName` | 导入该字体的标识符，格式为 `@remotion/google-fonts/[import-name]` |
| `load` | 动态加载该字体的函数，返回一个 `import()` 调用，从 v3.3.64 起可用 |

示例结构:

```ts
[
  {
    fontFamily: "ABeeZee",
    importName: "ABeeZee",
    load: () => import("./ABeeZee"), // 从 v3.3.64 起可用
  },
  {
    fontFamily: "Abel",
    importName: "Abel",
    load: () => import("./Abel"),
  },
  {
    fontFamily: "Abhaya Libre",
    importName: "AbhayaLibre",
    load: () => import("./AbhayaLibre"),
  },
];
```

## 注意事项

### CommonJS

如果使用 `require()` 加载该模块，则无法动态加载字体。这同样适用于在底层转译为 `require()` 的代码。较新版本的 Next.js、Vite 和 Astro 默认已配置支持懒加载。

## 参见

- [Fonts](/docs/fonts) — 通用字体文档
- [@remotion/google-fonts](/docs/google-fonts) — 该包的详细文档
