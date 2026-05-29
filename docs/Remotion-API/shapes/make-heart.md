---
title: "makeHeart()"
source: https://www.remotion.dev/docs/shapes/make-heart
---

# makeHeart()

*available from v4.0.315*

Generates an SVG path for a heart.

## Example[​](#example "Direct link to Example")

```tsx
make-heart.ts

import {makeHeart} from '@remotion/shapes';

const {path, width, height, transformOrigin, instructions} = makeHeart({
  height: 100,
});

console.log(path); // M 100 120 C 40 110 20 70 60 60 C 90 40 110 40 140 60 C 180 70 160 110 100 120 Z
console.log(width); // 200
console.log(height); // 160
console.log(transformOrigin); // "100 80"
console.log(instructions); // Instruction[]Copy
```

## Arguments[​](#arguments "Direct link to Arguments")

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

## Return type[​](#return-type "Direct link to Return type")

The function returns an object with the following properties:

- `path`: The SVG path string
- `width`: The width of the heart
- `height`: The height of the heart
- `transformOrigin`: The transform origin of the heart
- `instructions`: An array of path instructions

## See also[​](#see-also "Direct link to See also")

- [<Heart />](/docs/shapes/heart)- [`@remotion/shapes`](/docs/shapes)- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/shapes/src/utils/make-heart.ts)
