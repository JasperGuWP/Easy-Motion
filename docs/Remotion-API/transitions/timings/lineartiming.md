---
title: "linearTiming()"
source: https://www.remotion.dev/docs/transitions/timings/lineartiming
---

# linearTiming()

A timing function for [`<TransitionSeries>`](/docs/transitions/transitionseries) based on [`interpolate()`](/docs/interpolate).

```tsx
SlideTransition.tsx

import {linearTiming, TransitionSeries} from '@remotion/transitions';
import {slide} from '@remotion/transitions/slide';
import {Easing} from 'remotion';

const BasicTransition = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={40}>
        <Letter color="#0b84f3">A</Letter>
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={slide()}
        timing={linearTiming({
          durationInFrames: 30,
          easing: Easing.in(Easing.ease),
        })}
      />
      <TransitionSeries.Sequence durationInFrames={60}>
        <Letter color="pink">B</Letter>
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};Copy
```

## API[​](#api "Direct link to API")

An object with the following properties:

### `durationInFrames`[​](#durationinframes "Direct link to durationinframes")

The duration of the transition in frames.

### `easing?`[​](#easing "Direct link to easing")

An easing function, see [`Easing`](/docs/easing).

## See also[​](#see-also "Direct link to See also")

- [Source code for this presentation](https://github.com/remotion-dev/remotion/blob/main/packages/transitions/src/timings/linear-timing.ts)
