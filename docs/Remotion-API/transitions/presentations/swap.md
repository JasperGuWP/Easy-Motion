---
title: "swap()v4.0.466"
source: https://www.remotion.dev/docs/transitions/presentations/swap
---

# swap()[v4.0.466](https://github.com/remotion-dev/remotion/releases/v4.0.466)

A presentation that swaps scenes with perspective, depth, and a floor reflection.

warning

This presentation is built with [HTML-in-canvas](/docs/remotion/html-in-canvas) and requires [Google Chrome](https://www.google.com/chrome/) with `chrome://flags/#canvas-draw-element` enabled. It does not work in Firefox or Safari.

## Example[​](#example "Direct link to Example")

```tsx
SwapTransition.tsx

import {linearTiming, TransitionSeries} from '@remotion/transitions';
import {swap} from '@remotion/transitions/swap';

const BasicTransition = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={40}>
        <Letter color="#0b84f3">A</Letter>
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={swap({})}
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

### `reflection?`[​](#reflection "Direct link to reflection")

Controls the strength of the reflected scenes on the floor.

Defaults to `0.4`.

### `perspective?`[​](#perspective "Direct link to perspective")

Controls the perspective distortion while the scenes move.

Defaults to `0.2`.

### `depth?`[​](#depth "Direct link to depth")

Controls how far each scene moves into depth during the swap.

Defaults to `3`.

## Compatibility[​](#compatibility "Direct link to Compatibility")

|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Browsers Servers Environments|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | Chrome  Firefox  Safari  Node.js  Bun  Serverless Functions  [Client-side rendering](/docs/client-side-rendering)  [Server-side rendering](/docs/ssr)  [Player](/docs/player)  [Studio](/docs/studio) |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |

For Preview, Chrome with the `chrome://flags/#canvas-draw-element` flag enabled is required.

## Credits[​](#credits "Direct link to Credits")

The fragment shader is adapted from the [`swap`](https://gl-transitions.com/editor/swap) GL Transition by [gre](https://github.com/gre), licensed under MIT.

## See also[​](#see-also "Direct link to See also")

- [Source code for this presentation](https://github.com/remotion-dev/remotion/blob/main/packages/transitions/src/presentations/swap.tsx)
- [HTML-in-canvas](/docs/client-side-rendering/html-in-canvas)
- [Presentations](/docs/transitions/presentations)
