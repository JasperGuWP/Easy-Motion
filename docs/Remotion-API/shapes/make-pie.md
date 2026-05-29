---
title: "makePie()"
source: https://www.remotion.dev/docs/shapes/make-pie
---

# makePie()

*Part of the [`@remotion/shapes`](/docs/shapes) package.*

Generates a piece of pie SVG path.

## Example[​](#example "Direct link to Example")

```tsx
pie.ts

import { makePie } from "@remotion/shapes";

const { path, width, height, transformOrigin } = makePie({
  radius: 100,
  progress: 0.5,
});

console.log(path); // M 100 0 A 100 100 0 0 1 100 200 L 100 100 z
console.log(width); // 200
console.log(height); // 200
console.log(transformOrigin); // '100 100'Copy
```

## Arguments[​](#arguments "Direct link to Arguments")

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

## Return type[​](#return-type "Direct link to Return type")

### `path`

A string that is suitable as an argument for `d` in a `<path>` element.

### `width`

The width of the pie. Suitable for defining the `viewBox` of an `<svg>` tag.

### `height`

The height of the pie. Suitable for defining the `viewBox` of an `<svg>` tag.

### `instructions`

An array with SVG instructions. The type for a instruction can be seen by importing `Instruction` from `@remotion/shapes`.

### `transformOrigin`

A string representing the point of origin if a shape should be rotated around itself.

If you want to rotate the shape around its center, use the `transform-origin` CSS property and pass this value, and also add `transform-box: fill-box`. This is the default for [`<Pie />`](/docs/shapes/pie).

## See also[​](#see-also "Direct link to See also")

- [<Pie />](/docs/shapes/pie)- [`@remotion/shapes`](/docs/shapes)- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/shapes/src/utils/make-pie.ts)
