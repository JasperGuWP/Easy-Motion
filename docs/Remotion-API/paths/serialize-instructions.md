---
title: "serializeInstructions()"
source: https://www.remotion.dev/docs/paths/serialize-instructions
---

# serializeInstructions()

*Part of the [`@remotion/paths`](/docs/paths) package. Available from v3.3.40*

Takes an array of [`Instruction`](/docs/paths/parse-path)'s and serializes it into an SVG path string.

```tsx
serialize-instructions.ts

import { serializeInstructions } from "@remotion/paths";

const newPath = serializeInstructions([
  {
    type: "M",
    x: 10,
    y: 10,
  },
  {
    type: "L",
    x: 20,
    y: 20,
  },
]); // M 10 10 L 20 20Copy
```

This function may throw if the instructions don't match the [`Instruction`](/docs/paths/parse-path) type, but it does not explicitly check for invalid input.

## See also[​](#see-also "Direct link to See also")

- [`@remotion/paths`](/docs/paths)
- [`parsePath()`](/docs/paths/parse-path)
- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/paths/src/serialize-instructions.ts)
