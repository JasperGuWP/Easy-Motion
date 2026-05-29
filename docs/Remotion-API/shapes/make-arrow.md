---
title: "makeArrow()"
source: https://www.remotion.dev/docs/shapes/make-arrow
---

# makeArrow()

*Part of the [`@remotion/shapes`](/docs/shapes) package.*

Generates an SVG path for an arrow shape.

## Example[​](#example "Direct link to Example")

```tsx
arrow.ts

import {makeArrow} from '@remotion/shapes';

const {path, width, height, transformOrigin} = makeArrow({
  length: 300,
  headWidth: 185,
  headLength: 120,
  shaftWidth: 80,
  direction: 'right',
});Copy
```

## Arguments[​](#arguments "Direct link to Arguments")

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

## Return type[​](#return-type "Direct link to Return type")

### `path`

A string that is suitable as an argument for `d` in a `<path>` element.

### `width`

The width of the arrow. Suitable for defining the `viewBox` of an `<svg>` tag.

### `height`

The height of the arrow. Suitable for defining the `viewBox` of an `<svg>` tag.

### `instructions`

An array with SVG instructions. The type for a instruction can be seen by importing `Instruction` from `@remotion/shapes`.

### `transformOrigin`

A string representing the point of origin if a shape should be rotated around itself.

If you want to rotate the shape around its center, use the `transform-origin` CSS property and pass this value, and also add `transform-box: fill-box`. This is the default for [`<Arrow />`](/docs/shapes/arrow).

## See also[​](#see-also "Direct link to See also")

- [<Arrow />](/docs/shapes/arrow)- [`@remotion/shapes`](/docs/shapes)- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/shapes/src/utils/make-arrow.ts)
