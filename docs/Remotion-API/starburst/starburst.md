---
title: "<Starburst>v4.0.435"
source: https://www.remotion.dev/docs/starburst/starburst
---

# <Starburst>[v4.0.435](https://github.com/remotion-dev/remotion/releases/v4.0.435)

Renders a static WebGL-based retro starburst ray pattern.  
Is a [`<Sequence>`](/docs/sequence) component under the hood and accepts its props.

rays

`12`

rotation

`0`

smoothness

`0`

vignette

`1`

originOffsetX

`0`

originOffsetY

`0`

## Example[​](#example "Direct link to Example")

```tsx
MyComp.tsx

import {Starburst} from '@remotion/starburst';
import {AbsoluteFill} from 'remotion';

const MyVideo = () => {
  return (
    <AbsoluteFill style={{backgroundColor: 'black'}}>
      <Starburst
        durationInFrames={60}
        rays={16}
        colors={['#ffdd00', '#ff8800', '#ff4400']}
        rotation={15}
        width={1080}
        height={1080}
      />
    </AbsoluteFill>
  );
};Copy
```

## API[​](#api "Direct link to API")

Apart from the props listed below, all props from [`<Sequence>`](/docs/sequence) except `children` and `layout` are accepted.

### `rays`[​](#rays "Direct link to rays")

The number of rays in the starburst pattern. Must be between `2` and `100`.

### `colors`[​](#colors "Direct link to colors")

An array of hex color strings for the rays. Colors are assigned to rays cyclically. Must contain at least 2 colors.

```tsx
<Starburst rays={12} colors={['#ff0066', '#6600ff', '#00ccff']} />Copy
```

### `rotation?`[​](#rotation "Direct link to rotation")

Rotates the starburst pattern in degrees (`0`-`360`). Default: `0`.

### `smoothness?`[​](#smoothness "Direct link to smoothness")

Controls the softness of the ray edges. `0` gives hard edges, `1` gives very soft edges. Default: `0`.

### `vignette?`[​](#vignette "Direct link to vignette")

Controls the radial transparency falloff from the center. `1` (default) means no vignette — the starburst is fully opaque. `0` makes the entire canvas transparent. Values in between create a circular fade from opaque at the center to transparent at the edges.

### `originOffsetX?`[​](#originoffsetx "Direct link to originoffsetx")

Shifts the origin of the starburst pattern horizontally. `-1` moves the origin to the left edge, `1` to the right edge. Default: `0` (centered).

### `originOffsetY?`[​](#originoffsety "Direct link to originoffsety")

Shifts the origin of the starburst pattern vertically. `-1` moves the origin to the top edge, `1` to the bottom edge. Default: `0` (centered).

## Compatibility[​](#compatibility "Direct link to Compatibility")

|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Browsers Environments|  |  |  |  |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | Chrome  Firefox  Safari  [Client-side rendering](/docs/client-side-rendering)  [Server-side rendering](/docs/ssr)  [Player](/docs/player)  [Studio](/docs/studio) |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | | | | | | | | | | | | | | | | | | | | | | |

## See also[​](#see-also "Direct link to See also")

- [`starburst()` effect](/docs/starburst/starburst-effect)
- [Source code for this component](https://github.com/remotion-dev/remotion/blob/main/packages/starburst/src/Starburst.tsx)
- [`<Sequence>`](/docs/sequence)
