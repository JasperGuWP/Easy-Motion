---
title: "scalePath()"
source: https://www.remotion.dev/docs/paths/scale-path
---

# scalePath()

*Part of the [`@remotion/paths`](/docs/paths) package. Available from v3.3.43*

Allows you to grow or shrink the size of a path.

```tsx
scale-path.ts

import { scalePath } from "@remotion/paths";

const newPath = scalePath("M 0 0 L 100 100", 1, 2); // "M 0 0 L 100 200";Copy
```

The origin of the transform is the top left corner of the path. To use a different origin, first use [`translatePath()`](/docs/paths/translate-path) to move the path to the desired origin, then scale it, and finally move it back to the original origin.

## Arguments[​](#arguments "Direct link to Arguments")

### `path`[​](#path "Direct link to path")

*string*

A valid SVG Path string.

### `xScale`[​](#xscale "Direct link to xscale")

*number*

The factor of which to scale the path horizontally. `1` will leave the path unchanged.

### `yScale`[​](#yscale "Direct link to yscale")

*number*

The factor of which to scale the path vertically. `1` will leave the path unchanged.

## See also[​](#see-also "Direct link to See also")

- [`@remotion/paths`](/docs/paths)
- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/paths/src/scale-path.ts)
