---
title: "measureSpring()"
source: https://www.remotion.dev/docs/measure-spring
---

# measureSpring()

[v2.0.8](https://github.com/remotion-dev/remotion/releases/v2.0.8)

Based on a [spring()](/docs/spring) configuration and the frame rate, return how long it takes for a spring animation to settle.

```tsx
import {measureSpring, SpringConfig} from 'remotion';

const config: Partial<SpringConfig> = {
  damping: 200,
};

measureSpring({
  fps: 30,
  config: {
    damping: 200,
  },
}); // => 23Copy
```

info

Theoretically, a spring animation never ends. There is always a miniscule amount or energy left in the spring that causes tiny movements. Instead, we set a threshold to define when the spring animation is considered done.

## Arguments[​](#arguments "Direct link to Arguments")

An object with these keys:

### `fps`[​](#fps "Direct link to fps")

The frame rate on which the spring animation is based on.

### `threshold?`[​](#threshold "Direct link to threshold")

Defines when the animation should be considered finished. Default: `0.005`. `0.01` means that the animation is finished when it always stays within 1% of the `to` value. For example an animation that goes from 0 to 1 is considered finished when the value never leaves the range [0.99, 1.01] after the end point.

Lower values mean the spring duration is longer, higher values result in the spring duration being shorter.

### `config?`[​](#config "Direct link to config")

The spring configuration that you pass to [spring()](/docs/spring#config).

### `from?`[​](#from "Direct link to from")

The initial value of the animation. Default: `0`.

### `to?`[​](#to "Direct link to to")

The end value of the animation. Default: `1`. Note that depending on the parameters, spring animations may overshoot the target a bit, before they bounce back to their final target.

## Compatibility[​](#compatibility "Direct link to Compatibility")

|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Browsers Servers Environments|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | Chrome  Firefox  Safari  Node.js  Bun  Serverless Functions  [Client-side rendering](/docs/client-side-rendering)  [Server-side rendering](/docs/ssr)  [Player](/docs/player)  [Studio](/docs/studio) |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/core/src/spring/measure-spring.ts)
- [spring()](/docs/spring)
