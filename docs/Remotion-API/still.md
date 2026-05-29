---
title: "<Still>"
source: https://www.remotion.dev/docs/still
---

# <Still>

A `<Still />` is a single-frame [`<Composition />`](/docs/composition). It is a convenient way to define a composition that renders an image rather than a video.

## Example[​](#example "Direct link to Example")

The `<Still />` component has the same API as the [`<Composition />`](/docs/composition) component, except that it's not necessary to pass `durationInFrames` and `fps`.

```tsx
import {Composition, Still} from 'remotion';
import {MyComp} from './MyComp';

export const MyVideo = () => {
  return (
    <>
      <Composition id="my-video" component={MyComp} width={1080} height={1080} fps={30} durationInFrames={3 * 30} />
      <Still id="my-image" component={MyComp} width={1080} height={1080} />
    </>
  );
};Copy
```

## Compatibility[​](#compatibility "Direct link to Compatibility")

|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Browsers Servers Environments|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | Chrome  Firefox  Safari  Node.js  Bun  Serverless Functions  [Client-side rendering](/docs/client-side-rendering)  [Server-side rendering](/docs/ssr)  [Player](/docs/player)  [Studio](/docs/studio) |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |

## See also[​](#see-also "Direct link to See also")

- [Source code for this component](https://github.com/remotion-dev/remotion/blob/main/packages/core/src/Still.tsx)
- [`<Composition />`](/docs/composition)
