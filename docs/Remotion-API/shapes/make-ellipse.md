---
title: "makeEllipse()"
source: https://www.remotion.dev/docs/shapes/make-ellipse
---

# makeEllipse()

*Part of the [`@remotion/shapes`](/docs/shapes) package.*

Generates an ellipse SVG path.

## Example[​](#example "Direct link to Example")

```tsx
ellipse.ts

import { makeEllipse } from "@remotion/shapes";

const { path, width, height, transformOrigin } = makeEllipse({
  rx: 100,
  ry: 50,
});

console.log(path); // M 100 0 a 100 100 0 1 0 1 0
console.log(width); // 200
console.log(height); // 100
console.log(transformOrigin); // '100 50'Copy
```

## Arguments[​](#arguments "Direct link to Arguments")

### `rx`

*number*

The radius of the ellipse on the X axis.

### `ry`

*number*

The radius of the ellipse on the Y axis.

## Return type[​](#return-type "Direct link to Return type")

### `path`

A string that is suitable as an argument for `d` in a `<path>` element.

### `width`

The width of the ellipse. Suitable for defining the `viewBox` of an `<svg>` tag.

### `height`

The height of the ellipse. Suitable for defining the `viewBox` of an `<svg>` tag.

### `instructions`

An array with SVG instructions. The type for a instruction can be seen by importing `Instruction` from `@remotion/shapes`.

### `transformOrigin`

A string representing the point of origin if a shape should be rotated around itself.

If you want to rotate the shape around its center, use the `transform-origin` CSS property and pass this value, and also add `transform-box: fill-box`. This is the default for [`<Ellipse />`](/docs/shapes/ellipse).

## See also[​](#see-also "Direct link to See also")

- [<Ellipse />](/docs/shapes/ellipse)- [`@remotion/shapes`](/docs/shapes)- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/shapes/src/utils/make-ellipse.ts)
