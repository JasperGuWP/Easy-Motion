---
title: "iris()v4.0.316"
source: https://www.remotion.dev/docs/transitions/presentations/iris
---

# iris()[v4.0.316](https://github.com/remotion-dev/remotion/releases/v4.0.316)

A presentation where the next scene is revealed through a circular mask that expands from the center outward, similar to a camera iris opening.

## Example[​](#example "Direct link to Example")

```tsx
IrisTransition.tsx

import {linearTiming, TransitionSeries} from '@remotion/transitions';
import {iris} from '@remotion/transitions/iris';
import {useVideoConfig} from 'remotion';

const BasicTransition = () => {
  const {width, height} = useVideoConfig();

  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={40}>
        <Letter color="#0b84f3">A</Letter>
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={iris({width, height})} timing={linearTiming({durationInFrames: 30})} />
      <TransitionSeries.Sequence durationInFrames={60}>
        <Letter color="pink">B</Letter>
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};Copy
```

## API[​](#api "Direct link to API")

Accepts an object with the following options:

### `width`[​](#width "Direct link to width")

Should be set to the width of the video.

### `height`[​](#height "Direct link to height")

Should be set to the height of the video.

### `outerEnterStyle?`[​](#outerenterstyle "Direct link to outerenterstyle")

The style of the outer element when the scene is is entering.

### `outerExitStyle?`[​](#outerexitstyle "Direct link to outerexitstyle")

The style of the outer element when the scene is exiting.

### `innerEnterStyle?`[​](#innerenterstyle "Direct link to innerenterstyle")

The style of the inner element when the scene is entering.

### `innerExitStyle?`[​](#innerexitstyle "Direct link to innerexitstyle")

The style of the inner element when the scene is exiting.

## Compatibility[​](#compatibility "Direct link to Compatibility")

|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Browsers Environments|  |  |  |  |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | Chrome  Firefox  Safari  [Client-side rendering](/docs/client-side-rendering)  [Server-side rendering](/docs/ssr)  [Player](/docs/player)  [Studio](/docs/studio) |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | | | | | | | | | | | | | | | | | | | | | | |

## See also[​](#see-also "Direct link to See also")

- [Source code for this presentation](https://github.com/remotion-dev/remotion/blob/main/packages/transitions/src/presentations/iris.tsx)
- [Presentations](/docs/transitions/presentations)
