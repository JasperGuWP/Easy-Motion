---
title: "getBoundingBox()"
source: https://www.remotion.dev/docs/paths/get-bounding-box
---

# getBoundingBox()

*Part of the [`@remotion/paths`](/docs/paths) package. Available from v3.3.40*

Returns the bounding box of the given path, suitable for calculating the `viewBox` value that you need to pass to an SVG.

The bounding box is the smallest rectangle which can contain the shape in full.

```tsx
get-bounding-box.ts

import { getBoundingBox } from "@remotion/paths";

const boundingBox = getBoundingBox(
  "M 35,50 a 25,25,0,1,1,50,0 a 25,25,0,1,1,-50,0"
);
// { x1: 35, x2: 85, y1: 24.999999999999993, y2: 75 };Copy
```

This function will throw if the SVG path is invalid.

## Return type[​](#return-type "Direct link to Return type")

Includes the following properties:

- `x1`: The leftmost x coordinate of the bounding box
- `x2`: The rightmost x coordinate of the bounding box
- `y1`: The topmost y coordinate of the bounding box
- `y2`: The bottommost y coordinate of the bounding box
- `width`: The width of the bounding box, *returned from v3.3.97*
- `height`: The height of the bounding box, *returned from v3.3.97*
- `viewBox`: The `viewBox` value that you can pass to an SVG, *returned from v3.3.97*

## `BoundingBox` type[​](#boundingbox-type "Direct link to boundingbox-type")

In TypeScript, you can get the shape of the return value by importing the `BoundingBox` type:

```tsx
import type { BoundingBox } from "@remotion/paths";Copy
```

## See also[​](#see-also "Direct link to See also")

- [`@remotion/paths`](/docs/paths)
- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/paths/src/get-bounding-box.ts)
