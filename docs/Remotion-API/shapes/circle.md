---
title: "<Circle />"
source: https://www.remotion.dev/docs/shapes/circle
---

# <Circle />

*Part of the [`@remotion/shapes`](/docs/shapes) package.*

Renders an SVG element drawing a circle.

## Explorer[​](#explorer "Direct link to Explorer")

radius

`200`

## Example[​](#example "Direct link to Example")

```tsx
src/Circle.tsx

import { Circle } from "@remotion/shapes";
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
      <Circle radius={100} fill="green" stroke="red" strokeWidth={1} />
    </AbsoluteFill>
  );
};Copy
```

## Props[​](#props "Direct link to Props")

### `radius`

*number*

The radius of the circle.

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

### Other props

All other props that can be passed to a `<path>` are accepted and will be forwarded.

## See also[​](#see-also "Direct link to See also")

- [makeCircle()](/docs/shapes/circle)- [`@remotion/shapes`](/docs/shapes)- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/shapes/src/components/circle.tsx)
