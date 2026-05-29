---
title: "zoomBlur()v4.0.456"
source: https://www.remotion.dev/docs/transitions/presentations/zoom-blur
---

# zoomBlur()[v4.0.456](https://github.com/remotion-dev/remotion/releases/v4.0.456)

A presentation where the outgoing scene zooms out and rotates while the incoming scene zooms in from the opposite angle, blended with a radial zoom blur.

warning

This presentation is built with [HTML-in-canvas](/docs/remotion/html-in-canvas) and requires [Google Chrome](https://www.google.com/chrome/) with `chrome://flags/#canvas-draw-element` enabled. It does not work in Firefox or Safari.

## Example[​](#example "Direct link to Example")

```tsx
ZoomBlurTransition.tsx

import {linearTiming, TransitionSeries} from '@remotion/transitions';
import {zoomBlur} from '@remotion/transitions/zoom-blur';

const BasicTransition = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={40}>
        <Letter color="#0b84f3">A</Letter>
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={zoomBlur({})}
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

### `rotation?`[​](#rotation "Direct link to rotation")

The maximum rotation angle in radians applied to each scene as it transitions. The outgoing scene rotates from `0` to `-rotation` and the incoming scene rotates from `+rotation` to `0`.

Defaults to `Math.PI / 6` (30°).

## Compatibility[​](#compatibility "Direct link to Compatibility")

|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Browsers Servers Environments|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | Chrome  Firefox  Safari  Node.js  Bun  Serverless Functions  [Client-side rendering](/docs/client-side-rendering)  [Server-side rendering](/docs/ssr)  [Player](/docs/player)  [Studio](/docs/studio) |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |

For Preview, Chrome with the `chrome://flags/#canvas-draw-element` flag enabled is required.

## See also[​](#see-also "Direct link to See also")

- [Source code for this presentation](https://github.com/remotion-dev/remotion/blob/main/packages/transitions/src/presentations/zoom-blur.tsx)
- [HTML-in-canvas](/docs/client-side-rendering/html-in-canvas)
- [Presentations](/docs/transitions/presentations)
