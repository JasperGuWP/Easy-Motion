---
title: "<Ellipse />"
source: https://www.remotion.dev/docs/shapes/ellipse
---

# <Ellipse />

*Part of the  [`@remotion/shapes`](/docs/shapes) package.*

Renders an SVG element drawing an ellipse.

## Explorer[​](#explorer "Direct link to Explorer")

rx

`150`

ry

`200`

## Example[​](#example "Direct link to Example")

```tsx
src/Ellipse.tsx

import { Ellipse } from "@remotion/shapes";
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
      <Ellipse rx={100} ry={50} fill="green" stroke="red" strokeWidth={1} />
    </AbsoluteFill>
  );
};Copy
```

## Props[​](#props "Direct link to Props")

### `rx`

*number*

The radius of the ellipse on the X axis.

### `ry`

*number*

The radius of the ellipse on the Y axis.

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

- [makeEllipse()](/docs/shapes/ellipse)- [`@remotion/shapes`](/docs/shapes)- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/shapes/src/components/ellipse.tsx)
