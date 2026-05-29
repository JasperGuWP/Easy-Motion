---
title: "<Freeze>"
source: https://www.remotion.dev/docs/freeze
---

# <Freeze>

[v2.2.0](https://github.com/remotion-dev/remotion/releases/v2.2.0)

When using the `<Freeze/>` component, all of its children will freeze to the frame that you specify as a prop.

If a component is a child of `<Freeze/>`, calling the [`useCurrentFrame()`](/docs/use-current-frame) hook will always return the frame number you specify, irrespective of any [`<Sequence>`](/docs/sequence).

[`<Html5Video />`](/docs/html5-video), [`<Video>`](/docs/media/video) and [`<OffthreadVideo />`](/docs/offthreadvideo) elements will be paused and [`<Html5Audio />`](/docs/html5-audio) and [`<Audio>`](/docs/media/audio) elements will render muted.

## Example[​](#example "Direct link to Example")

```tsx
MyComp.tsx

import {Freeze} from 'remotion';

const MyVideo = () => {
  return (
    <Freeze frame={30}>
      <BlueSquare />
    </Freeze>
  );
};Copy
```

## API[​](#api "Direct link to API")

The Freeze component is a high order component and accepts, besides it's children, the following props:

### `frame`[​](#frame "Direct link to frame")

At which frame it's children should freeze.

### `active`[v4.0.127](https://github.com/remotion-dev/remotion/releases/v4.0.127)[​](#active "Direct link to active")

Deactivate freezing component by passing `false`.  
You may also pass a callback function and accept the current frame and return a boolean.

```tsx
From frame 30 on

import {Freeze} from 'remotion';

const MyVideo = () => {
  return (
    <Freeze frame={30} active={(f) => f < 30}>
      <BlueSquare />
    </Freeze>
  );
};Copy
```

## Demo[​](#demo "Direct link to Demo")

Use Freeze component

## Compatibility[​](#compatibility "Direct link to Compatibility")

|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Browsers Environments|  |  |  |  |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | Chrome  Firefox  Safari  [Client-side rendering](/docs/client-side-rendering)  [Server-side rendering](/docs/ssr)  [Player](/docs/player)  [Studio](/docs/studio) |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | | | | | | | | | | | | | | | | | | | | | | |

## See also[​](#see-also "Direct link to See also")

- [Source code for this component](https://github.com/remotion-dev/remotion/blob/main/packages/core/src/freeze.tsx)
- [`useCurrentFrame()`](/docs/use-current-frame)
