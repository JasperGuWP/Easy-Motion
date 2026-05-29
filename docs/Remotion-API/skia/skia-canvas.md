---
title: "<SkiaCanvas />"
source: https://www.remotion.dev/docs/skia/skia-canvas
---

# <SkiaCanvas />

A [React Native Skia `<Canvas />` component](https://shopify.github.io/react-native-skia/docs/canvas/overview) that wraps Remotion contexts.

You can place elements from `@shopify/react-native-skia` in it!

```tsx
import { SkiaCanvas } from "@remotion/skia";
import { Fill } from "@shopify/react-native-skia";
import React from "react";
import { useVideoConfig } from "remotion";

const MySkiaVideo: React.FC = () => {
  const { width, height } = useVideoConfig();
  return (
    <SkiaCanvas width={width} height={height}>
      <Fill color="black" />
    </SkiaCanvas>
  );
};Copy
```

## Props[​](#props "Direct link to Props")

### `width`[​](#width "Direct link to width")

The width of the canvas in pixels.

### `height`[​](#height "Direct link to height")

The height of the canvas in pixels.

### Inherited props[​](#inherited-props "Direct link to Inherited props")

All the props that are accepted by [`<Canvas>`](https://shopify.github.io/react-native-skia/docs/canvas/overview) are accepted as well.

## See also[​](#see-also "Direct link to See also")

- [Installation](/docs/skia)
