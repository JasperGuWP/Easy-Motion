---
title: "flip()v4.0.54"
source: https://www.remotion.dev/docs/transitions/presentations/flip
---

# flip()[v4.0.54](https://github.com/remotion-dev/remotion/releases/v4.0.54)

A presentation where the exiting slide flips by 180 degrees, revealing the next slide on the back side.

direction

from-leftfrom-bottomfrom-rightfrom-top

## Example[​](#example "Direct link to Example")

```tsx
SlideTransition.tsx

import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { flip } from "@remotion/transitions/flip";

const BasicTransition = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={40}>
        <Letter color="#0b84f3">A</Letter>
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={flip()}
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

import { FlipDirection } from "@remotion/transitions/flip";

const flipDirection: FlipDirection = "from-left";Copy
```

### `perspective?`[​](#perspective "Direct link to perspective")

The CSS `perspective` of the flip animation. Defaults to `1000`.

### `outerEnterStyle?`[v4.0.84](https://github.com/remotion-dev/remotion/releases/v4.0.84)[​](#outerenterstyle "Direct link to outerenterstyle")

The style of the outer element when the scene is is entering.

### `outerExitStyle?`[v4.0.84](https://github.com/remotion-dev/remotion/releases/v4.0.84)[​](#outerexitstyle "Direct link to outerexitstyle")

The style of the outer element when the scene is exiting.

### `innerEnterStyle?`[v4.0.84](https://github.com/remotion-dev/remotion/releases/v4.0.84)[​](#innerenterstyle "Direct link to innerenterstyle")

The style of the inner element when the scene is entering.

### `innerExitStyle?`[v4.0.84](https://github.com/remotion-dev/remotion/releases/v4.0.84)[​](#innerexitstyle "Direct link to innerexitstyle")

The style of the inner element when the scene is exiting.

## Compatibility[​](#compatibility "Direct link to Compatibility")

|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Browsers Environments|  |  |  |  |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | Chrome  Firefox  Safari  [Client-side rendering](/docs/client-side-rendering)  [Server-side rendering](/docs/ssr)  [Player](/docs/player)  [Studio](/docs/studio) |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | | | | | | | | | | | | | | | | | | | | | | |

## See also[​](#see-also "Direct link to See also")

- [Source code for this presentation](https://github.com/remotion-dev/remotion/blob/main/packages/transitions/src/presentations/flip.tsx)
- [Presentations](/docs/transitions/presentations)
