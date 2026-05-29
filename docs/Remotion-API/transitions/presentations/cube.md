---
title: "cube()"
source: https://www.remotion.dev/docs/transitions/presentations/cube
---

# cube()

note

This is a paid item which you can [buy here](https://remotion.pro/cube-transition).

A presentation where both the entering and exiting scene rotate with 3D perspective.

direction

from-leftfrom-topfrom-rightfrom-bottom

## Example[​](#example "Direct link to Example")

```tsx
CubeTransition.tsx

import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { cube } from "@remotion-dev/cube-presentation";

const BasicTransition = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={40}>
        <Letter color="#0b84f3">A</Letter>
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={cube({ direction: "from-left" })}
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

The `cube()` function does take an object with the following properties:

### `direction`[​](#direction "Direct link to direction")

One of `from-left`, `from-right`, `from-top`, `from-bottom`.

```tsx
import { CubeDirection } from "@remotion-dev/cube-presentation";

const flipDirection: CubeDirection = "from-left";Copy
```

### `perspective?`[​](#perspective "Direct link to perspective")

The CSS `perspective` of the flip animation. Defaults to `1000`.

## Compatibility[​](#compatibility "Direct link to Compatibility")

|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Browsers Environments|  |  |  |  |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | Chrome  Firefox  Safari  [Client-side rendering](/docs/client-side-rendering)  [Server-side rendering](/docs/ssr)  [Player](/docs/player)  [Studio](/docs/studio) |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | | | | | | | | | | | | | | | | | | | | | | |

## See also[​](#see-also "Direct link to See also")

- [Presentations](/docs/transitions/presentations)
