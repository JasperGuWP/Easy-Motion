---
title: "focusDefaultPropsPath()v4.0.165"
source: https://www.remotion.dev/docs/studio/focus-default-props-path
---

# focusDefaultPropsPath()[v4.0.165](https://github.com/remotion-dev/remotion/releases/v4.0.165)

Scrolls to a specific field in the default props editor.

## Example[​](#example "Direct link to Example")

For the following Zod schema:

```tsx
schema.ts

import { z } from "zod";

const MySchema = z.object({
  array: z.array(
    z.object({
      subfield: z.string(),
    }),
  ),
});Copy
```

Call `focusDefaultPropsPath()` with the path to the field you want to focus on:

```tsx
MyComp.tsx

import { focusDefaultPropsPath } from "@remotion/studio";

focusDefaultPropsPath({
  path: ["array", 0, "subfield"],
});Copy
```

## API[​](#api "Direct link to API")

### `path`[​](#path "Direct link to path")

The path to the field you want to focus on. An array containing numbers and strings.

### `scrollBehavior`[​](#scrollbehavior "Direct link to scrollbehavior")

The behavior of the scrolling.  
One of `"auto" | "instant" | "smooth"`.  
Defaults to the [default scroll behavior](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView).

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/studio/src/api/focus-default-props-path.ts)
- [Visual editing](/docs/visual-editing)
