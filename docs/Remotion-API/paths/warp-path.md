---
title: "warpPath()"
source: https://www.remotion.dev/docs/paths/warp-path
---

# warpPath()

*Part of the [`@remotion/paths`](/docs/paths) package. Available from v3.3.43*

Allows you to remap the coordinates of an SVG using a function in order to create a warp effect.

```tsx
warp-path.ts

import { warpPath, WarpPathFn } from "@remotion/paths";

const fn: WarpPathFn = ({ x, y }) => ({
  x: x + Math.sin(y / 4) * 5,
  y: y,
});

const newPath = warpPath("M 0 0 L 0 100", fn); // M 0 0 L 0.970365514464549 0.78125 L 1.9038320449619508 1.5625 L 2.7649037231526368 2.34375...;Copy
```

|  |  |  |  |
| --- | --- | --- | --- |
| Input Output|  |  | | --- | --- | | | | | |

## How it works[​](#how-it-works "Direct link to How it works")

This function works by splitting SVG instructions into many smaller SVG instructions and then remapping the coordinates of each instruction. This will result in the output being a much SVG path than the input.

## Arguments[​](#arguments "Direct link to Arguments")

### `path`[​](#path "Direct link to path")

An SVG path string.

### `fn`[​](#fn "Direct link to fn")

A function that takes the coordinates of the SVG path and returns the new coordinates. The type of the function is `WarpPathFn` which can also be imported from `@remotion/paths`.

```tsx
import { WarpPathFn } from "@remotion/paths";

const fn: WarpPathFn = ({ x, y }) => ({
  x: x + Math.sin(y / 4) * 5,
  y: y,
});Copy
```

### `options`[​](#options "Direct link to options")

#### `interpolationThreshold`[​](#interpolationthreshold "Direct link to interpolationthreshold")

The [interpolation algorithm](/docs/paths/warp-path#how-it-works) will split the SVG path recursively into smaller SVG paths. This option allows you to specify the distance of a segment at which the algorithm should stop dividing the path into smaller segments.

Since SVG is unitless, the threshold is measured in SVG units.

By default the threshold is the 1% width or height of the [bounding box](/docs/paths/get-bounding-box) of the path, whichever is bigger. In other terms, it is `Math.max(width, height) * 0.01`.

## Credits[​](#credits "Direct link to Credits")

This function is based on the [WarpJS](https://benjamminf.github.io/warpjs/) library and has been converted to use TypeScript and a pure functional programming API.

## See also[​](#see-also "Direct link to See also")

- [`@remotion/paths`](/docs/paths)
- [Example repo](https://github.com/remotion-dev/text-warping)
- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/paths/src/warp-path/index.ts)
