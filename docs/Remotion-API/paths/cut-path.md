---
title: "cutPath()"
source: https://www.remotion.dev/docs/paths/cut-path
---

# cutPath()

*Part of the [`@remotion/paths`](/docs/paths) package.*

Cuts an SVG path at a specified length, returning the portion from the start to that length.

```tsx
import { cutPath } from "@remotion/paths";

const path = "M 0 0 L 100 0 L 100 100";
const cutAtLength = cutPath(path, 50);
console.log(cutAtLength); // "M 0 0 L 50 0"Copy
```

## Arguments[​](#arguments "Direct link to Arguments")

### `d`[​](#d "Direct link to d")

*string*

A valid SVG path property. For example:

```tsx
M 0 0 L 100 0 L 100 100 L 0 100 ZCopy
```

### `length`[​](#length "Direct link to length")

*number*

The length at which to cut the path. If the length is greater than the total path length, the entire path is returned. If the length is 0, only the initial move command is returned.

## Return value[​](#return-value "Direct link to Return value")

A string representing the cut path from the start to the specified length.

## Examples[​](#examples "Direct link to Examples")

### Cutting a simple line[​](#cutting-a-simple-line "Direct link to Cutting a simple line")

```tsx
import { cutPath } from "@remotion/paths";

const simpleLine = "M 0 0 L 100 0";
const halfLine = cutPath(simpleLine, 50);
console.log(halfLine); // "M 0 0 L 50 0"Copy
```

### Cutting a path with curves[​](#cutting-a-path-with-curves "Direct link to Cutting a path with curves")

```tsx
import { cutPath } from "@remotion/paths";

const curvePath = "M 0 0 C 50 0 50 50 100 50";
const cutCurve = cutPath(curvePath, 30);
console.log(cutCurve); // "M 0 0 C 30 0 30 15 60 15" (approximate)Copy
```

### Handling edge cases[​](#handling-edge-cases "Direct link to Handling edge cases")

```tsx
import { cutPath } from "@remotion/paths";

const path = "M 0 0 L 100 0";

// Length greater than path length
const fullPath = cutPath(path, 200);
console.log(fullPath); // "M 0 0 L 100 0"

// Zero length
const startOnly = cutPath(path, 0);
console.log(startOnly); // "M 0 0"Copy
```

## See also[​](#see-also "Direct link to See also")

- [getLength()](/docs/paths/get-length)
- [getPointAtLength()](/docs/paths/get-point-at-length)
- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/paths/src/cut-path.ts)
- [`@remotion/paths`](/docs/paths)
