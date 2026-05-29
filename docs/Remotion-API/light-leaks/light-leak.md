---
title: "<LightLeak>v4.0.415"
source: https://www.remotion.dev/docs/light-leaks/light-leak
---

# <LightLeak>[v4.0.415](https://github.com/remotion-dev/remotion/releases/v4.0.415)

Renders a WebGL-based light leak effect.  
The effect reveals during the first half of the duration and retracts during the second half.  
Is a [`<Sequence>`](/docs/sequence) component under the hood and accepts it's props.

Use [`lightLeak()`](/docs/light-leaks/light-leak-effect) to apply the same visual as a canvas effect.

## Example[​](#example "Direct link to Example")

seed

`0`

hueShift

`0`

```tsx
MyComp.tsx

import {LightLeak} from '@remotion/light-leaks';
import {AbsoluteFill} from 'remotion';

const MyVideo = () => {
  return (
    <AbsoluteFill style={{backgroundColor: 'black'}}>
      <LightLeak durationInFrames={60} seed={3} hueShift={30} />
    </AbsoluteFill>
  );
};Copy
```

## API[​](#api "Direct link to API")

Apart from the props listed below, all props from [`<Sequence>`](/docs/sequence) except `children` and `layout` are accepted.

### `durationInFrames?`[​](#durationinframes "Direct link to durationinframes")

The duration of the light leak effect in frames. The effect reveals during the first half and retracts during the second half.  
During the midpoint, the light leak will cover most of the canvas.

If not specified, defaults to the duration of the composition or sequence, reading from [`useVideoConfig()`](/docs/use-video-config).

### `seed?`[​](#seed "Direct link to seed")

Determines the shape of the light leak pattern. Different seeds produce different patterns. Default: `0`.

### `hueShift?`[​](#hueshift "Direct link to hueshift")

Rotates the hue of the light leak in degrees (`0`-`360`).

- `0` (default) yellow-to-orange
- `120` shifts toward green
- `240` shifts toward blue

## Compatibility[​](#compatibility "Direct link to Compatibility")

|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Browsers Environments|  |  |  |  |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | Chrome  Firefox  Safari  [Client-side rendering](/docs/client-side-rendering)  [Server-side rendering](/docs/ssr)  [Player](/docs/player)  [Studio](/docs/studio) |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | | | | | | | | | | | | | | | | | | | | | | |

## See also[​](#see-also "Direct link to See also")

- [`lightLeak()`](/docs/light-leaks/light-leak-effect)
- [Source code for this component](https://github.com/remotion-dev/remotion/blob/main/packages/light-leaks/src/LightLeak.tsx)
- [`<Sequence>`](/docs/sequence)
