---
title: "translatePath()"
source: https://www.remotion.dev/docs/paths/translate-path
---

# translatePath()

*Part of the [`@remotion/paths`](/docs/paths) package.*

Translates the path by the given `x` and `y` coordinates.

## Arguments[​](#arguments "Direct link to Arguments")

The function takes three arguments:

- `path`, the original SVG path.
- `x`, the amount of horizontal translation.
- `y` the amount of vertical translation.

## Return value[​](#return-value "Direct link to Return value")

Returns a new `string` containing a path if it is valid:

```tsx
translate-x.ts

import { translatePath } from "@remotion/paths";

const translatedPath = translatePath("M 50 50 L 150 50", 10, 0);
console.log(translatedPath); // "M 50 50 L 150 50"Copy
```

```tsx
translate-y.ts

import { translatePath } from "@remotion/paths";

const translatedPath = translatePath("M10 10 L15 15", 10, 10);
console.log(translatedPath); // "M 20 20 L 25 25"Copy
```

```tsx
translate-x-and-y.ts

import { translatePath } from "@remotion/paths";

const translatedPath = translatePath(
  "M 35,50 a 25,25,0,1,1,50,0 a 25,25,0,1,1,-50,0",
  10,
  20
);
console.log(translatedPath); // "M 45 70 a 25 25 0 1 1 50 0 a 25, 5 0 1 1 -50 0"Copy
```

The function will throw if the path is invalid:

```tsx
translatePath("remotion", 10, 0); // Malformed path data: "m" ...Copy
```

## Credits[​](#credits "Direct link to Credits")

Source code stems mostly from [translate-svg-path](https://github.com/michaelrhodes/translate-svg-path) and [serialize-svg-path](https://github.com/jkroso/serialize-svg-path).

## See also[​](#see-also "Direct link to See also")

- [`@remotion/paths`](/docs/paths)
- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/paths/src/translate-path.ts)
