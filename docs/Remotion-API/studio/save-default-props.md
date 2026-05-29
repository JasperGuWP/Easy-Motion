---
title: "saveDefaultProps()v4.0.147"
source: https://www.remotion.dev/docs/studio/save-default-props
---

# saveDefaultProps()[v4.0.147](https://github.com/remotion-dev/remotion/releases/v4.0.147)

Saves the [`defaultProps`](/docs/composition) for a [composition](/docs/terminology/composition) back to the [root file](/docs/terminology/root-file).
[`updateDefaultProps()`](/docs/studio/update-default-props) is an alias for this function.

## Examples[​](#examples "Direct link to Examples")

```tsx
Saving {color: 'green'} to Root.tsx

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

You can access the saved default props to only override part of it (reducer-style):

```tsx
Accessing the saved default props

import { saveDefaultProps } from "@remotion/studio";

await saveDefaultProps({
  compositionId: "my-composition",
  defaultProps: ({ savedDefaultProps }) => {
    return {
      ...savedDefaultProps,
      color: "green",
    };
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

Before v4.0.437, the Props Editor had a concept of "unsaved props" that were not yet written back to the root file.
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

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/studio/src/api/save-default-props.ts)
