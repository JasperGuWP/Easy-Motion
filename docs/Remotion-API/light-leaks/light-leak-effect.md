---
title: "lightLeak()v4.0.468"
source: https://www.remotion.dev/docs/light-leaks/light-leak-effect
---

# lightLeak()[v4.0.468](https://github.com/remotion-dev/remotion/releases/v4.0.468)

*Part of the [`@remotion/light-leaks`](/docs/light-leaks/api) package.*

Applies a WebGL2-based light leak effect to canvas-based components such as [`<Video>`](/docs/media/video), [`<CanvasImage>`](/docs/canvasimage) and [`<Solid>`](/docs/solid).

Use it when you want to add the light leak effect through an `effects` array instead of rendering the [`<LightLeak>`](/docs/light-leaks/light-leak) component.

## Preview[​](#preview "Direct link to Preview")

seed

`0`

hueShift

`0`

progress

`0.5`

## Example[​](#example "Direct link to Example")

```tsx
MyComp.tsx

import {lightLeak} from '@remotion/light-leaks';
import {CanvasImage, interpolate, staticFile, useCurrentFrame} from 'remotion';

export const MyComp: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <CanvasImage
      src={staticFile('image.png')}
      width={1280}
      height={720}
      fit="cover"
      effects={[
        lightLeak({
          seed: 3,
          hueShift: 30,
          progress,
        }),
      ]}
    />
  );
};Copy
```

## API[​](#api "Direct link to API")

Pass an object with the following properties.

### `seed?`[​](#seed "Direct link to seed")

Determines the shape of the light leak pattern. Different seeds produce different patterns. Default: `0`.

### `hueShift?`[​](#hueshift "Direct link to hueshift")

Rotates the hue of the light leak in degrees (`0`-`360`).

- `0` (default) yellow-to-orange
- `120` shifts toward green
- `240` shifts toward blue

### `progress?`[​](#progress "Direct link to progress")

Controls the evolve/retract phase from `0` to `1`.

Effects do not animate on their own. Drive `progress` with [`useCurrentFrame()`](/docs/use-current-frame), [`interpolate()`](/docs/interpolate), or input props. Defaults to `0.5` so the light leak is visible when the effect is first added.

### `disabled?`[​](#disabled "Direct link to disabled")

When `true`, the effect is skipped. Defaults to `false`.

## Requirements[​](#requirements "Direct link to Requirements")

`lightLeak()` uses a WebGL2 backend. During renders, enable WebGL via [`Config.setChromiumOpenGlRenderer()`](/docs/config#setchromiumopenglrenderer) (for example `'angle'`). See [Using WebGL during renders](/docs/remotion/html-in-canvas#using-webgl-during-renders).

## See also[​](#see-also "Direct link to See also")

- [`@remotion/light-leaks`](/docs/light-leaks/api)
- [`<LightLeak>`](/docs/light-leaks/light-leak)
- [`@remotion/effects`](/docs/effects/api)
- [Source code for this effect](https://github.com/remotion-dev/remotion/blob/main/packages/effects/src/light-leak.ts)
