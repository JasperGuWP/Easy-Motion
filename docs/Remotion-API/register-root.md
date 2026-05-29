---
title: "registerRoot()"
source: https://www.remotion.dev/docs/register-root
---

# registerRoot()

`registerRoot` is a function that registers the root component of the Remotion project. In the root component, one or multiple compositions should be returned (in the case of multiple compositions, they should be wrapped in a React Fragment).

info

`registerRoot()` should live in a file that is separate from the list of compositions. This is because when using React Fast Refresh, all the code in the file that gets refreshed gets executed again, however, this function should only be called once.

## Example[​](#example "Direct link to Example")

```tsx
src/index.ts

import {registerRoot} from 'remotion';
import {RemotionRoot} from './Root';

registerRoot(RemotionRoot);Copy
```

```tsx
src/Root.tsx

import MyComponent from './MyComponent';
import MyOtherComponent from './MyOtherComponent';

export const RemotionRoot = () => {
  return (
    <>
      <Composition id="comp" fps={30} height={1080} width={1920} durationInFrames={90} component={MyComponent} />
      <Composition id="anothercomp" fps={30} height={1080} width={1920} durationInFrames={90} component={MyOtherComponent} />
    </>
  );
};Copy
```

## Defer registerRoot()[​](#defer-registerroot "Direct link to Defer registerRoot()")

In some cases, such as dynamically importing roots or loading WebAssembly, you might want to defer the loading of registerRoot(). In newer versions of Remotion, you may do so, without having to invoke `delayRender()`.

```tsx
import {continueRender, delayRender, registerRoot} from 'remotion';
import {RemotionRoot} from './Root';

loadWebAssembly().then(() => {
  registerRoot(RemotionRoot);
});Copy
```

## Compatibility[​](#compatibility "Direct link to Compatibility")

|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Browsers Servers Environments|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | Chrome  Firefox  Safari  Node.js  Bun  Serverless Functions  [Client-side rendering](/docs/client-side-rendering)  [Server-side rendering](/docs/ssr)  [Player](/docs/player)  [Studio](/docs/studio) |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/core/src/register-root.ts)
- [`<Composition />` component](/docs/composition)
- [The fundamentals](/docs/the-fundamentals)
