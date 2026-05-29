---
title: "<Heart />"
source: https://www.remotion.dev/docs/shapes/heart
---

# <Heart />

*available from v4.0.315*

Renders an SVG element containing a heart.

## Explorer[​](#explorer "Direct link to Explorer")

height

`300`

aspectRatio

`1.1`

depthAdjustment

`0`

bottomRoundnessAdjustment

`0`

debug

showStrokeInsteadPlaygroundOnly

## Example[​](#example "Direct link to Example")

```tsx
src/Heart.tsx

import {Heart} from '@remotion/shapes';
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
      <Heart height={100} fill="red" stroke="black" strokeWidth={2} />
    </AbsoluteFill>
  );
};Copy
```

## Props[​](#props "Direct link to Props")

### `height`

*number*

The height of the heart.

### `aspectRatio`

*number*

The aspect ratio of the heart. Default 1.1.

### `bottomRoundnessAdjustment`

*number*

The amount of bottom roundness deviation from the default. Negative values make the bottom point sharper, positive values make it rounder.

### `depthAdjustment`

*number*

The deviation of the default depth (how deep the top of the heart is). Negative values make the heart deeper, positive values make it shallower.

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

- [makeHeart()](/docs/shapes/heart)- [`@remotion/shapes`](/docs/shapes)- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/shapes/src/components/heart.tsx)
