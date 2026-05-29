---
title: "starburst()v4.0.468"
source: https://www.remotion.dev/docs/starburst/starburst-effect
---

# starburst()[v4.0.468](https://github.com/remotion-dev/remotion/releases/v4.0.468)

*Part of the [`@remotion/starburst`](/docs/starburst/api) package.*

Renders a WebGL2-based retro starburst ray pattern as an effect for canvas-based components such as [`<Video>`](/docs/media/video), [`<HtmlInCanvas>`](/docs/remotion/html-in-canvas) and [`<Solid>`](/docs/solid).

Use it when you want to apply starburst rays through an `effects` array instead of rendering the [`<Starburst>`](/docs/starburst/starburst) component.

`starburst()` replaces the underlying pixels instead of blending over them. It is usually the first effect in a chain, or applied to a [`<Solid>`](/docs/solid) background before other effects.

## Preview[​](#preview "Direct link to Preview")

rays

`16`

rotation

`0`

smoothness

`0`

origin

`[0.5, 0.5]`

## Example[​](#example "Direct link to Example")

```tsx
MyComp.tsx

import {starburst} from '@remotion/starburst';
import {AbsoluteFill, Solid} from 'remotion';

export const MyComp: React.FC = () => {
  return (
    <AbsoluteFill>
      <Solid
        width={1280}
        height={720}
        color="black"
        effects={[
          starburst({
            rays: 16,
            colors: ['#ffdd00', '#ff8800', '#ff4400'],
            rotation: 15,
            smoothness: 0.1,
            origin: [0.5, 0.5],
          }),
        ]}
      />
    </AbsoluteFill>
  );
};Copy
```

## API[​](#api "Direct link to API")

Pass an object with the following properties.

### `rays`[​](#rays "Direct link to rays")

The number of rays in the starburst pattern. Must be between `2` and `100`.

### `colors`[​](#colors "Direct link to colors")

An array of hex color strings for the rays. Colors are assigned to rays cyclically. Must contain at least 2 colors.

### `rotation?`[​](#rotation "Direct link to rotation")

Rotates the starburst pattern in degrees. Defaults to `0`.

### `smoothness?`[​](#smoothness "Direct link to smoothness")

Controls the softness of the ray edges. `0` gives hard edges, `1` gives very soft edges. Default: `0`.

### `origin?`[​](#origin "Direct link to origin")

UV coordinate of the starburst origin. `[0, 0]` is the top-left corner, `[1, 1]` is the bottom-right corner. Default: `[0.5, 0.5]`.

### `disabled?`[​](#disabled "Direct link to disabled")

When `true`, the effect is skipped. Defaults to `false`.

## Requirements[​](#requirements "Direct link to Requirements")

`starburst()` uses a WebGL2 backend. During renders, enable WebGL via [`Config.setChromiumOpenGlRenderer()`](/docs/config#setchromiumopenglrenderer) (for example `'angle'`). See [Using WebGL during renders](/docs/remotion/html-in-canvas#using-webgl-during-renders).

## See also[​](#see-also "Direct link to See also")

- [`@remotion/starburst`](/docs/starburst/api)
- [`<Starburst>`](/docs/starburst/starburst)
- [`@remotion/effects`](/docs/effects/api)
- [Source code for this effect](https://github.com/remotion-dev/remotion/blob/main/packages/starburst/src/starburst-effect.ts)
