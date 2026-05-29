---
title: "wipe()"
source: https://www.remotion.dev/docs/transitions/presentations/wipe
---

# wipe()

A presentation where the entering slide slides over the exiting slide.

direction

from-leftfrom-top-leftfrom-topfrom-top-rightfrom-rightfrom-bottom-rightfrom-bottomfrom-bottom-left

## Example[​](#example "Direct link to Example")

```tsx
WipeTransition.tsx

import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { wipe } from "@remotion/transitions/wipe";

const BasicTransition = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={40}>
        <Letter color="#0b84f3">A</Letter>
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={wipe()}
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

One of `from-left`, `from-top-left`, `from-top`, `from-top-right`, `from-right`, `from-bottom-right`, `from-bottom`, `from-bottom-left`.

```tsx
TypeScript type

import { WipeDirection } from "@remotion/transitions/wipe";

const wipeDirection: WipeDirection = "from-left";Copy
```

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

- [Source code for this presentation](https://github.com/remotion-dev/remotion/blob/main/packages/transitions/src/presentations/wipe.tsx)
- [Presentations](/docs/transitions/presentations)
