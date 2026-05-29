---
title: "<Folder>"
source: https://www.remotion.dev/docs/folder
---

# <Folder>

[v3.0.1](https://github.com/remotion-dev/remotion/releases/v3.0.1)

By wrapping a [`<Composition />`](/docs/composition) inside a `<Folder />`, you can visually categorize it in your sidebar, should you have many compositions.

## Example[​](#example "Direct link to Example")

```tsx
import {Composition, Folder} from 'remotion';

export const Video = () => {
  return (
    <>
      <Folder name="Visuals">
        <Composition id="CompInFolder" durationInFrames={100} fps={30} width={1080} height={1080} component={Component} />
      </Folder>
      <Composition id="CompOutsideFolder" durationInFrames={100} fps={30} width={1080} height={1080} component={Component} />
    </>
  );
};Copy
```

will create a tree structure in the sidebar that looks like this:

## Folder behavior[​](#folder-behavior "Direct link to Folder behavior")

- They only visually change the sidebar in the Remotion Studio and have no further behavior.
- Folder names can only contain `a-z`, `A-Z`, `0-9` and `-`.
- Folders can be nested.

## Compatibility[​](#compatibility "Direct link to Compatibility")

|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Browsers Environments|  |  |  |  |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | Chrome  Firefox  Safari  [Client-side rendering](/docs/client-side-rendering)  [Server-side rendering](/docs/ssr)  [Player](/docs/player)  [Studio](/docs/studio) |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | | | | | | | | | | | | | | | | | | | | | | |

## See also[​](#see-also "Direct link to See also")

- [Source code for this component](https://github.com/remotion-dev/remotion/blob/main/packages/core/src/Folder.tsx)
- [`<Composition />`](/docs/composition)
