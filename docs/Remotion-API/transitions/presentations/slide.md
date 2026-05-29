---
title: "slide()"
source: https://www.remotion.dev/docs/transitions/presentations/slide
---

# slide()

A presentation where the entering slide pushes out the exiting slide.

direction

from-leftfrom-bottomfrom-rightfrom-top

## Example[​](#example "Direct link to Example")

```tsx
SlideTransition.tsx

import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";

const BasicTransition = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={40}>
        <Letter color="#0b84f3">A</Letter>
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={slide()}
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

Takes an object with the following properties:

### `direction`[​](#direction "Direct link to direction")

One of `from-left`, `from-right`, `from-top`, `from-bottom`.

```tsx
TypeScript type

import { SlideDirection } from "@remotion/transitions/slide";

const slideDirection: SlideDirection = "from-left";Copy
```

### `enterStyle?`[v4.0.84](https://github.com/remotion-dev/remotion/releases/v4.0.84)[​](#enterstyle "Direct link to enterstyle")

The style of the container when the scene is is entering.

### `exitStyle?`[v4.0.84](https://github.com/remotion-dev/remotion/releases/v4.0.84)[​](#exitstyle "Direct link to exitstyle")

The style of the container when the scene is exiting.

## Compatibility[​](#compatibility "Direct link to Compatibility")

|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Browsers Environments|  |  |  |  |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | Chrome  Firefox  Safari  [Client-side rendering](/docs/client-side-rendering)  [Server-side rendering](/docs/ssr)  [Player](/docs/player)  [Studio](/docs/studio) |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | | | | | | | | | | | | | | | | | | | | | | |

## See also[​](#see-also "Direct link to See also")

- [Source code for this presentation](https://github.com/remotion-dev/remotion/blob/main/packages/transitions/src/presentations/slide.tsx)
- [Presentations](/docs/transitions/presentations)
