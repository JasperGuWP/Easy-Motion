---
title: "reversePath()"
source: https://www.remotion.dev/docs/paths/reverse-path
---

# reversePath()

*Part of the [`@remotion/paths`](/docs/paths) package.*

Reverses a path so the end and start are switched.

```tsx
import { reversePath } from "@remotion/paths";

const reversedPath = reversePath("M 0 0 L 100 0");
console.log(reversedPath); // "L 100 0 M 0 0"Copy
```

The function will throw if the path is invalid:

```tsx
reversePath("remotion"); // Error: Malformed path data: ...Copy
```

## Credits[​](#credits "Direct link to Credits")

Source code stems mostly from [svg-path-reverse](https://www.npmjs.com/package/svg-path-reverse).

## See also[​](#see-also "Direct link to See also")

- [`@remotion/paths`](/docs/paths)
- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/paths/src/reverse-path.ts)
