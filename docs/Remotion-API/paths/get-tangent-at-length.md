---
title: "getTangentAtLength()"
source: https://www.remotion.dev/docs/paths/get-tangent-at-length
---

# getTangentAtLength()

*Part of the [`@remotion/paths`](/docs/paths) package.*

Gets tangent values `x` and `y` of a point which is on an SVG path. The first argument is an SVG path, the second one is the length at which the point should be sampled. It must be between 0 and the return value of [`getLength()`](/docs/paths/get-length).

Returns a point if the path is valid:

```tsx
import { getTangentAtLength } from "@remotion/paths";

const tangent = getTangentAtLength("M 50 50 L 150 50", 50);
console.log(tangent); // { x: 1, y: 0}Copy
```

The function will throw if the path is invalid:

```tsx
getTangentAtLength("remotion", 50); // Error: Malformed path data: ...Copy
```

## Credits[​](#credits "Direct link to Credits")

Source code stems mostly from [svg-path-properties](https://www.npmjs.com/package/svg-path-properties).

## See also[​](#see-also "Direct link to See also")

- [getLength()](/docs/paths/get-length)
- [getPointAtLength()](/docs/paths/get-point-at-length)
- [`@remotion/paths`](/docs/paths)
- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/paths/src/get-tangent-at-length.ts)
