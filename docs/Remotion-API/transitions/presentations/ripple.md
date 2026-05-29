---
title: "ripple()v4.0.465"
source: https://www.remotion.dev/docs/transitions/presentations/ripple
---

# ripple()[v4.0.465](https://github.com/remotion-dev/remotion/releases/v4.0.465)

A presentation that displaces the outgoing scene with a sinusoidal wave radiating from the center while crossfading to the incoming scene.

warning

This presentation is built with [HTML-in-canvas](/docs/remotion/html-in-canvas) and requires [Google Chrome](https://www.google.com/chrome/) with `chrome://flags/#canvas-draw-element` enabled. It does not work in Firefox or Safari.

## Example[​](#example "Direct link to Example")

```tsx
RippleTransition.tsx

import {linearTiming, TransitionSeries} from '@remotion/transitions';
import {ripple} from '@remotion/transitions/ripple';

const BasicTransition = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={40}>
        <Letter color="#0b84f3">A</Letter>
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={ripple({})}
        timing={linearTiming({durationInFrames: 30})}
      />
      <TransitionSeries.Sequence durationInFrames={60}>
        <Letter color="pink">B</Letter>
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};Copy
```

## API[​](#api "Direct link to API")

Accepts an object with the following options:

### `amplitude?`[​](#amplitude "Direct link to amplitude")

Controls the spatial frequency of the ripple wave. Larger values produce more, tighter ripples emanating from the center.

Defaults to `100`.

### `speed?`[​](#speed "Direct link to speed")

Controls how quickly the ripple wave travels outward over the course of the transition. Larger values make the wave race outward faster.

Defaults to `50`.

## Compatibility[​](#compatibility "Direct link to Compatibility")

|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Browsers Servers Environments|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | Chrome  Firefox  Safari  Node.js  Bun  Serverless Functions  [Client-side rendering](/docs/client-side-rendering)  [Server-side rendering](/docs/ssr)  [Player](/docs/player)  [Studio](/docs/studio) |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |

For Preview, Chrome with the `chrome://flags/#canvas-draw-element` flag enabled is required.

## Credits[​](#credits "Direct link to Credits")

The fragment shader is adapted from the [`ripple`](https://gl-transitions.com/editor/ripple) GL Transition by [gre](https://github.com/gre), licensed under MIT.

## See also[​](#see-also "Direct link to See also")

- [Source code for this presentation](https://github.com/remotion-dev/remotion/blob/main/packages/transitions/src/presentations/ripple.tsx)
- [HTML-in-canvas](/docs/client-side-rendering/html-in-canvas)
- [Presentations](/docs/transitions/presentations)
