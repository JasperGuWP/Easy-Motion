---
title: "getRemotionEnvironment()v4.0.25"
source: https://www.remotion.dev/docs/get-remotion-environment
---

# getRemotionEnvironment()[v4.0.25](https://github.com/remotion-dev/remotion/releases/v4.0.25)

With the `getRemotionEnvironment()` function, you can retrieve information about the current Remotion Environment.

info

Consider using the [`useRemotionEnvironment()`](/docs/use-remotion-environment) hook instead, as it is future-proof for browser rendering scenarios.

It returns an object with the following properties:

- `isStudio`: Whether the function got called in the [Remotion Studio](/docs/cli/studio).
- `isRendering`: Whether the function got called in a render. Also available in the [`calculateMetadata()`](/docs/calculate-metadata) function.
- `isPlayer`: Whether a [`<Player>`](/docs/player) is mounted on the current page.
- `isReadOnlyStudio`: Whether in a [statically deployed studio](https://www.remotion.dev/docs/studio/deploy-static), where the [`@remotion/studio`](/docs/studio/api) APIs cannot be used (*available from v4.0.238*)
- `isClientSideRendering`: Whether the function [got called in a client-side rendering context](/docs/miscellaneous/render-in-browser) (*available from v4.0.344*)

This can be useful if you want components or functions to behave differently depending on the environment.

### Example[​](#example "Direct link to Example")

```tsx
import React from 'react';
import {getRemotionEnvironment} from 'remotion';

export const MyComp: React.FC = () => {
  const {isStudio, isPlayer, isRendering} = getRemotionEnvironment();

  if (isStudio) {
    return <div>I'm in the Studio!</div>;
  }

  if (isPlayer) {
    return <div>I'm in the Player!</div>;
  }

  if (isRendering) {
    return <div>I'm Rendering</div>;
  }

  return <div>Hello World!</div>;
};Copy
```

A more realistic use case: You might want to debounce a request during editing in the Remotion Studio, but not during rendering. See: [debouncing requests](/docs/data-fetching#debouncing-requests)

## Compatibility[​](#compatibility "Direct link to Compatibility")

|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Browsers Servers Environments|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | Chrome  Firefox  Safari  Node.js  Bun  Serverless Functions  [Client-side rendering](/docs/client-side-rendering)  [Server-side rendering](/docs/ssr)  [Player](/docs/player)  [Studio](/docs/studio) |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | All false  All false  All false  Use useRemotionEnvironment()  | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/core/src/get-remotion-environment.ts)
- [`useRemotionEnvironment()`](/docs/use-remotion-environment) - a new preferred way to get the environment information
- [`useVideoConfig()`](/docs/use-video-config)
- [`<OffthreadVideo/> while rendering`](/docs/video-tags#using-a-different-tag-in-preview-and-rendering)
