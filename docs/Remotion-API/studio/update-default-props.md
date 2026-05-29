---
title: "updateDefaultProps()v4.0.154"
source: https://www.remotion.dev/docs/studio/update-default-props
---

# ~~updateDefaultProps()~~[v4.0.154](https://github.com/remotion-dev/remotion/releases/v4.0.154)

info

**Deprecated**: This function is an alias for [`saveDefaultProps()`](/docs/studio/save-default-props). Use `saveDefaultProps()` instead.

Before v4.0.437, this function only updated the props in the Props Editor without saving them to the root file.
Starting from v4.0.437, all prop changes are immediately saved, making this function identical to `saveDefaultProps()`.

## Examples[​](#examples "Direct link to Examples")

```tsx
Setting {color: 'green'} as the default props

import { saveDefaultProps } from "@remotion/studio";

await saveDefaultProps({
  compositionId: "my-composition",
  defaultProps: () => {
    return {
      color: "green",
    };
  },
});Copy
```

You can access the current default props to only override part of it (reducer-style):

```tsx
Accessing the current props

import { saveDefaultProps } from "@remotion/studio";

await saveDefaultProps({
  compositionId: "my-composition",
  defaultProps: ({ savedDefaultProps }) => {
    return { ...savedDefaultProps, color: "green" };
  },
});Copy
```

If you have a Zod schema, you can also access its runtime value:

```tsx
Accessing the Zod schema

import { saveDefaultProps } from "@remotion/studio";

await saveDefaultProps({
  compositionId: "my-composition",
  defaultProps: ({ schema, savedDefaultProps }) => {
    // Do something with the Zod schema

    return {
      ...savedDefaultProps,
      color: "red",
    };
  },
});Copy
```

## `unsavedDefaultProps`[​](#unsaveddefaultprops "Direct link to unsaveddefaultprops")

info

Before v4.0.437, `unsavedDefaultProps` contained props that were modified in the Props Editor but not yet written back to the root file.
Starting from v4.0.437, all prop changes are immediately saved, so `unsavedDefaultProps` is now always the same as `savedDefaultProps`.

It is still accepted for backwards compatibility, but you should use `savedDefaultProps` instead.

## Requirements[​](#requirements "Direct link to Requirements")

In order to use this function:

[1](#1)

 You need to be inside the Remotion Studio.  

[2](#2)

 The Studio must be running (no static deployment)  

[3](#3)

 `zod` needs to be installed.  
  

Otherwise, the function will throw.

## See also[​](#see-also "Direct link to See also")

- [`saveDefaultProps()`](/docs/studio/save-default-props)
- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/studio/src/api/update-default-props.ts)
