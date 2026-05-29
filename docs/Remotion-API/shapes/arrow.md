---
title: "<Arrow />"
source: https://www.remotion.dev/docs/shapes/arrow
---

# <Arrow />

*Part of the [`@remotion/shapes`](/docs/shapes) package.*

Renders an SVG element containing an arrow shape.

## Explorer[​](#explorer "Direct link to Explorer")

length

`300`

headWidth

`185`

headLength

`120`

shaftWidth

`80`

direction

updownleftright

cornerRadius

`0`

## Example[​](#example "Direct link to Example")

```tsx
src/Arrow.tsx

import {Arrow} from '@remotion/shapes';
import {AbsoluteFill} from 'remotion';

export const MyComposition = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Arrow length={300} headWidth={185} headLength={120} shaftWidth={80} fill="red" direction="right" />
    </AbsoluteFill>
  );
};Copy
```

## Props[​](#props "Direct link to Props")

### `length`

*number*

The total length of the arrow along its direction axis. Default 300.

### `headWidth`

*number*

The width of the arrowhead at its widest point. Default 185.

### `headLength`

*number*

The length of the arrowhead portion. Default 120.

### `shaftWidth`

*number*

The width of the arrow shaft. Default 80.

### `direction`

*"left" | "right" | "up" | "down"*

The direction the arrow points. Default right.

### `cornerRadius`

*number*

Rounds the corner using an arc. Similar to CSS's border-radius.

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

- [makeArrow()](/docs/shapes/arrow)- [`@remotion/shapes`](/docs/shapes)- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/shapes/src/components/arrow.tsx)
