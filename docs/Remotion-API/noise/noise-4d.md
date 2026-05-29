---
title: "noise4D()"
source: https://www.remotion.dev/docs/noise/noise-4d
---

# noise4D()

*Part of the [`@remotion/noise`](/docs/noise) package.*

Creates 4D noise.

## API[​](#api "Direct link to API")

The function takes five arguments:

### `seed`[​](#seed "Direct link to seed")

Pass any *string* or *number*. If the seed is the same, you will get the same result for same `x`, `y`, `z` and `w` values. Change the seed to get different results for your `x`, `y`, `z`, `w` values.

### `x`[​](#x "Direct link to x")

*number*

The first dimensional value.

### `y`[​](#y "Direct link to y")

*number*

The second dimensional value.

### `z`[​](#z "Direct link to z")

*number*

The third dimensional value.

### `w`[​](#w "Direct link to w")

*number*

The fourth dimensional value.

## Return value[​](#return-value "Direct link to Return value")

A value between `-1` and `1`, swinging as your `x`, `y`, `z` and `w` values change.

## Example[​](#example "Direct link to Example")

```tsx
import { noise4D } from "@remotion/noise";

const x = 32;
const y = 40;
const z = 50;
const w = 64;
console.log(noise4D("my-seed", x, y, z, w));Copy
```

## Credits[​](#credits "Direct link to Credits")

Dependency: [simplex-noise](https://www.npmjs.com/package/simplex-noise)

## See also[​](#see-also "Direct link to See also")

- [Example: Noise visualization](/docs/noise-visualization)
- [noise2D()](/docs/noise/noise-2d)
- [noise3D()](/docs/noise/noise-3d)
- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/noise/src/index.ts)
- [`@remotion/noise`](/docs/noise)
