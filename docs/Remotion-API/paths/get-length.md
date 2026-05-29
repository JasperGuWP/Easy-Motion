---
title: "getLength()"
source: https://www.remotion.dev/docs/paths/get-length
---

# getLength()

*Part of the [`@remotion/paths`](/docs/paths) package.*

Gets the length of an SVG path. The argument must be a valid SVG path property.

A number is returned if the path is valid:

```tsx
import { getLength } from "@remotion/paths";

const length = getLength("M 0 0 L 100 0");
console.log(length); // 100Copy
```

The function will throw if the path is invalid:

```tsx
getLength("remotion"); // Error: Malformed path data: ...Copy
```

## Credits[​](#credits "Direct link to Credits")

Source code stems mostly from [svg-path-properties](https://www.npmjs.com/package/svg-path-properties).

## See also[​](#see-also "Direct link to See also")

- [getPointAtLength()](/docs/paths/get-point-at-length)
- [getTangentAtLength()](/docs/paths/get-point-at-length)
- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/paths/src/get-length.ts)
- [`@remotion/paths`](/docs/paths)
