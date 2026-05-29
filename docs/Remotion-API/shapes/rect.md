---
title: "<Rect />"
source: https://www.remotion.dev/docs/shapes/rect
---

# <Rect />

*Part of the  [`@remotion/shapes`](/docs/shapes) package.*

Renders an SVG element containing a rectangle.

## Explorer[​](#explorer "Direct link to Explorer")

width

`200`

height

`200`

cornerRadius

`0`

edgeRoundness

debug

## Example[​](#example "Direct link to Example")

```tsx
src/Rect.tsx

import { Rect } from "@remotion/shapes";
import { AbsoluteFill } from "remotion";

export const MyComposition = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Rect width={200} height={200} fill="red" />
    </AbsoluteFill>
  );
};Copy
```

## Props[​](#props "Direct link to Props")

### `width`

*number*

The width of the rectangle.

### `height`

*number*

The height of the rectangle.

### `fill`

*string*

The color of the shape.

### `stroke`

*string*

The color of the stroke. Should be used together with `strokeWidth`.

### `strokeWidth`

*string*

The width of the stroke. Should be used together with `stroke`.

### `style`

*string*

CSS properties that will be applied to the `<svg>` tag. Default style: `overflow: 'visible'`

### `pathStyle`

*string*

CSS properties that will be applied to the `<path>` tag. Default style: `transform-box: 'fill-box'` and a dynamically calculated `transform-origin` which is the center of the shape, so that the shape rotates around its center by default.

### `strokeDasharray`

*string*

Allows to animate a path. See [evolvePath()](/docs/paths/evolve-path) for an example.

### `strokeDashoffset`

*string*

Allows to animate a path. See [evolvePath()](/docs/paths/evolve-path) for an example.

### `cornerRadius`

*number*

Rounds the corner using an arc. Similar to CSS's `border-radius`. Cannot be used together with `edgeRoundness`.

### `edgeRoundness`

*null | number*

Allows to modify the shape by rounding the edges using bezier curves. Default `null`.

|  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `0` will lead to a rotated rectangle being drawn inside the natural dimensions of the rectangle.| `(4 * (Math.sqrt(2) - 1)) / 3` will draw a circle.| `1` will draw a squircle.| Values below `0` and above `1` are possible and may result in interesting shapes. Pictured: `2` | | | | | | | |

Cannot be used together with `cornerRadius`.

### `debug`

*boolean*

If enabled, draws the lines for Bézier curves. This is meant for debugging, note that the visuals may change in any version.

### Other props

All other props that can be passed to a `<path>` are accepted and will be forwarded.

## See also[​](#see-also "Direct link to See also")

- [makeRect()](/docs/shapes/rect)- [`@remotion/shapes`](/docs/shapes)- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/shapes/src/components/rect.tsx)
