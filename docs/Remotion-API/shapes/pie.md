---
title: "<Pie />"
source: https://www.remotion.dev/docs/shapes/pie
---

# <Pie />

*Part of the [`@remotion/shapes`](/docs/shapes) package.*

Renders an SVG element drawing a pie piece.

## Explorer[​](#explorer "Direct link to Explorer")

radius

`200`

progress

`0.5`

rotation

`0`

closePath

counterClockwise

showStrokeInsteadPlaygroundOnly

## Example[​](#example "Direct link to Example")

```tsx
src/Pie.tsx

import { Pie } from "@remotion/shapes";
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
      <Pie
        radius={100}
        progress={0.5}
        fill="green"
        stroke="red"
        strokeWidth={1}
      />
    </AbsoluteFill>
  );
};Copy
```

## Props[​](#props "Direct link to Props")

### `radius`

*number*

The radius of the circle.

### `progress`

*number*

The percentage of the circle that is filled. `0` means fully empty, `1` means fully filled.

### `counterClockwise`

*boolean*

If set, the circle gets filled counterclockwise instead of clockwise. Default false.

### `closePath`

*boolean*

If set to `false`, no path to the middle of the circle will be drawn, leading to an open arc. Default `true`.

### `rotation`

*number*

Add rotation to the path. `0` means no rotation, `Math.PI * 2` means 1 full clockwise rotation

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

- [makePie()](/docs/shapes/pie)- [`@remotion/shapes`](/docs/shapes)- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/shapes/src/components/pie.tsx)
