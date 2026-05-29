---
title: "<Polygon />"
source: https://www.remotion.dev/docs/shapes/polygon
---

# <Polygon />

*Part of the  [`@remotion/shapes`](/docs/shapes) package.*

Renders an SVG element containing a polygon.

## Explorer[​](#explorer "Direct link to Explorer")

points

`3`

radius

`100`

cornerRadius

`0`

edgeRoundness

## Example[​](#example "Direct link to Example")

```tsx
src/Polygon.tsx

import { Polygon } from "@remotion/shapes";
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
      <Polygon points={5} radius={80} />
    </AbsoluteFill>
  );
};Copy
```

## Props[​](#props "Direct link to Props")

### `points`

*number*

The number of points in the polygon.

### `radius`

*number*

The radius of the polygon.

### `edgeRoundness`

*number | null*

Allows to modify the shape by rounding the edges using bezier curves. Default null.

### `cornerRadius`

*number*

Rounds the corner using an arc. Similar to CSS's border-radius. Cannot be used together with edgeRoundness.

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

### Other props

All other props that can be passed to a `<path>` are accepted and will be forwarded.

## See also[​](#see-also "Direct link to See also")

- [makePolygon()](/docs/shapes/polygon)- [`@remotion/shapes`](/docs/shapes)- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/shapes/src/components/polygon.tsx)
