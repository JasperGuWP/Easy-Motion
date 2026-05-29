---
title: "noise2D()"
source: https://www.remotion.dev/docs/noise/noise-2d
---

# noise2D()

*Part of the [`@remotion/noise`](/docs/noise) package.*

Creates 2D noise.

## API[​](#api "Direct link to API")

The function takes three arguments:

### `seed`[​](#seed "Direct link to seed")

Pass any *string* or *number*. If the seed is the same, you will get the same result for same `x` and `y` values. Change the seed to get different results for your `x` and `y` values.

### `x`[​](#x "Direct link to x")

*number*

The first dimensional value.

### `y`[​](#y "Direct link to y")

*number*

The second dimensional value.

## Return value[​](#return-value "Direct link to Return value")

A value between `-1` and `1`, swinging as your `x` and `y` values change.

## Example[​](#example "Direct link to Example")

```tsx
import { noise2D } from "@remotion/noise";

const x = 32;
const y = 40;
console.log(noise2D("my-seed", x, y)); // a number in the interval [-1, 1] which corresponds to (x, y) coord.Copy
```

## Credits[​](#credits "Direct link to Credits")

Uses the [simplex-noise](https://www.npmjs.com/package/simplex-noise) dependency

## See also[​](#see-also "Direct link to See also")

- [Example: Noise visualization](/docs/noise-visualization)
- [noise3D()](/docs/noise/noise-3d)
- [noise4D()](/docs/noise/noise-4d)
- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/noise/src/index.ts)
- [`@remotion/noise`](/docs/noise)
