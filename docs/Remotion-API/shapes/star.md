---
title: "<Star />"
source: https://www.remotion.dev/docs/shapes/star
---

# <Star />

*Part of the  [`@remotion/shapes`](/docs/shapes) package.*

Renders an SVG element containing a star.

## Explorer[​](#explorer "Direct link to Explorer")

innerRadius

`100`

outerRadius

`200`

edgeRoundness

points

`5`

cornerRadius

`0`

## Example[​](#example "Direct link to Example")

```tsx
src/Star.tsx

import {Star} from '@remotion/shapes';
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
      <Star points={5} innerRadius={100} outerRadius={200} fill="red" />
    </AbsoluteFill>
  );
};Copy
```

## Props[​](#props "Direct link to Props")

### `points`

*number*

The amount of points of the star.

### `innerRadius`

*number*

The inner radius of the star.

### `outerRadius`

*number*

The outer radius of the star.

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

- [makeStar()](/docs/shapes/star)- [`@remotion/shapes`](/docs/shapes)- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/shapes/src/components/star.tsx)
