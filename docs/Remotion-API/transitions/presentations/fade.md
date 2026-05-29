---
title: "fade()"
source: https://www.remotion.dev/docs/transitions/presentations/fade
---

# fade()

A simple fade animation. The incoming slide fades in over the outgoing slide, while the outgoing slide does not change. Works only if the incoming slide is fully opaque.

## Example[​](#example "Direct link to Example")

```tsx
FadeTransition.tsx

import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";

const BasicTransition = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={40}>
        <Letter color="#0b84f3">A</Letter>
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 30 })}
      />
      <TransitionSeries.Sequence durationInFrames={60}>
        <Letter color="pink">B</Letter>
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};Copy
```

## API[​](#api "Direct link to API")

An object which takes:

### `enterStyle?`[v4.0.84](https://github.com/remotion-dev/remotion/releases/v4.0.84)[​](#enterstyle "Direct link to enterstyle")

The style of the container element when the scene is is entering.

### `exitStyle?`[v4.0.84](https://github.com/remotion-dev/remotion/releases/v4.0.84)[​](#exitstyle "Direct link to exitstyle")

The style of the container element when the scene is exiting.

### `shouldFadeOutExitingScene?`[v4.0.166](https://github.com/remotion-dev/remotion/releases/v4.0.166)[​](#shouldfadeoutexitingscene "Direct link to shouldfadeoutexitingscene")

Whether the exiting scene should fade out or not. Default `false`.

note

The default is `false` because if both the entering and existing scene are semi-opaque, the whole scene will be semi-opaque, which will make the content underneath shine though.  
We recommend for transitioning between fully opaque scenes setting this to `false`.  
If the scenes are not fully covered (like fading between overlays), we recommend setting this to `false`.

## Compatibility[​](#compatibility "Direct link to Compatibility")

|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Browsers Environments|  |  |  |  |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | Chrome  Firefox  Safari  [Client-side rendering](/docs/client-side-rendering)  [Server-side rendering](/docs/ssr)  [Player](/docs/player)  [Studio](/docs/studio) |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | | | | | | | | | | | | | | | | | | | | | | |

## See also[​](#see-also "Direct link to See also")

- [Source code for this presentation](https://github.com/remotion-dev/remotion/blob/main/packages/transitions/src/presentations/fade.tsx)
- [Presentations](/docs/transitions/presentations)
