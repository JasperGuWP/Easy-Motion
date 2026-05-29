---
title: "crosswarp()v4.0.466"
source: https://www.remotion.dev/docs/transitions/presentations/crosswarp
---

# crosswarp()[v4.0.466](https://github.com/remotion-dev/remotion/releases/v4.0.466)

A presentation that warps the outgoing scene and incoming scene against each other across the x-axis.

warning

This presentation is built with [HTML-in-canvas](/docs/remotion/html-in-canvas) and requires [Google Chrome](https://www.google.com/chrome/) with `chrome://flags/#canvas-draw-element` enabled. It does not work in Firefox or Safari.

## Example[​](#example "Direct link to Example")

```tsx
CrosswarpTransition.tsx

import {linearTiming, TransitionSeries} from '@remotion/transitions';
import {crosswarp} from '@remotion/transitions/crosswarp';

const BasicTransition = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={40}>
        <Letter color="#0b84f3">A</Letter>
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={crosswarp({})}
        timing={linearTiming({durationInFrames: 30})}
      />
      <TransitionSeries.Sequence durationInFrames={60}>
        <Letter color="pink">B</Letter>
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};Copy
```

## Compatibility[​](#compatibility "Direct link to Compatibility")

|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Browsers Servers Environments|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | Chrome  Firefox  Safari  Node.js  Bun  Serverless Functions  [Client-side rendering](/docs/client-side-rendering)  [Server-side rendering](/docs/ssr)  [Player](/docs/player)  [Studio](/docs/studio) |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |

For Preview, Chrome with the `chrome://flags/#canvas-draw-element` flag enabled is required.

## Credits[​](#credits "Direct link to Credits")

The fragment shader is adapted from the [`crosswarp`](https://gl-transitions.com/editor/crosswarp) GL Transition by Eke Péter, licensed under MIT.

## See also[​](#see-also "Direct link to See also")

- [Source code for this presentation](https://github.com/remotion-dev/remotion/blob/main/packages/transitions/src/presentations/crosswarp.tsx)
- [HTML-in-canvas](/docs/client-side-rendering/html-in-canvas)
- [Presentations](/docs/transitions/presentations)
