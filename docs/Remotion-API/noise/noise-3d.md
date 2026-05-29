---
title: "noise3D()"
source: https://www.remotion.dev/docs/noise/noise-3d
---

# noise3D()

*Part of the [`@remotion/noise`](/docs/noise) package.*

Creates 3D noise.

## API[​](#api "Direct link to API")

The function takes four arguments:

### `seed`[​](#seed "Direct link to seed")

Pass any *string* or *number*. If the seed is the same, you will get the same result for same `x`, `y` and `z` values. Change the seed to get different results for your `x`, `y` and `z` values.

### `x`[​](#x "Direct link to x")

*number*

The first dimensional value.

### `y`[​](#y "Direct link to y")

*number*

The second dimensional value.

### `z`[​](#z "Direct link to z")

*number*

The third dimensional value.

## Return value[​](#return-value "Direct link to Return value")

A value between `-1` and `1`, swinging as your `x`, `y` and `z` values change.

## Example[​](#example "Direct link to Example")

```tsx
import { noise3D } from "@remotion/noise";

const x = 32;
const y = 40;
const z = 50;
console.log(noise3D("my-seed", x, y, z));Copy
```

## Credits[​](#credits "Direct link to Credits")

Uses the [simplex-noise](https://www.npmjs.com/package/simplex-noise) dependency

## See also[​](#see-also "Direct link to See also")

- [Example: Noise visualization](/docs/noise-visualization)
- [noise2D()](/docs/noise/noise-2d)
- [noise4D()](/docs/noise/noise-4d)
- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/noise/src/index.ts)
- [`@remotion/noise`](/docs/noise)
