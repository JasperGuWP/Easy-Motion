---
title: "makeRect()"
source: https://www.remotion.dev/docs/shapes/make-rect
---

# makeRect()

*Part of the [`@remotion/shapes`](/docs/shapes) package.*

Generates an SVG rectangle.

## Example[​](#example "Direct link to Example")

```tsx
rect.ts

import { makeRect } from "@remotion/shapes";

const { path, width, height, transformOrigin } = makeRect({
  width: 100,
  height: 100,
});

console.log(path); // M 0 0 l 100 0 l 0 100 l -100 0 Z
console.log(width); // 100
console.log(height); // 100
console.log(transformOrigin); // '50 50'Copy
```

## Arguments[​](#arguments "Direct link to Arguments")

### `width`

*number*

The width of the rectangle.

### `height`

*number*

The height of the rectangle.

### `edgeRoundness`

*null | number*

Allows to modify the shape by rounding the edges using bezier curves. Default `null`.

|  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `0` will lead to a rotated rectangle being drawn inside the natural dimensions of the rectangle.| `(4 * (Math.sqrt(2) - 1)) / 3` will draw a circle.| `1` will draw a squircle.| Values below `0` and above `1` are possible and may result in interesting shapes. Pictured: `2` | | | | | | | |

Cannot be used together with `cornerRadius`.

## Return type[​](#return-type "Direct link to Return type")

### `path`

A string that is suitable as an argument for `d` in a `<path>` element.

### `width`

The width of the rect. Suitable for defining the `viewBox` of an `<svg>` tag.

### `height`

The height of the rect. Suitable for defining the `viewBox` of an `<svg>` tag.

### `instructions`

An array with SVG instructions. The type for a instruction can be seen by importing `Instruction` from `@remotion/shapes`.

### `transformOrigin`

A string representing the point of origin if a shape should be rotated around itself.

If you want to rotate the shape around its center, use the `transform-origin` CSS property and pass this value, and also add `transform-box: fill-box`. This is the default for [`<Rect />`](/docs/shapes/rect).

## See also[​](#see-also "Direct link to See also")

- [<Rect />](/docs/shapes/rect)- [`@remotion/shapes`](/docs/shapes)- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/shapes/src/utils/make-rect.ts)
