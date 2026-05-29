---
title: "normalizePath()"
source: https://www.remotion.dev/docs/paths/normalize-path
---

# normalizePath()

*Part of the [`@remotion/paths`](/docs/paths) package.*

Removes all relative coordinates from a path and converts them into absolute coordinates.

Returns a string if the path is valid:

```tsx
import { normalizePath } from "@remotion/paths";

const normalizedPath = normalizePath("M 50 50 l 100 0");
console.log(normalizedPath); // "M 50 50 L 150 50"Copy
```

The function will throw if the path is invalid:

```tsx
normalizePath("remotion"); // Error: Malformed path data: ...Copy
```

## Credits[​](#credits "Direct link to Credits")

Source code stems mostly from [svg-path-reverse](https://www.npmjs.com/package/svg-path-reverse).

## See also[​](#see-also "Direct link to See also")

- [`@remotion/paths`](/docs/paths)
- [`reduceInstructions()`](/docs/paths/reduce-instructions)
- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/paths/src/normalize-path.ts)
