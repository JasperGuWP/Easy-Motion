---
title: "interpolateColors()v2.0.3"
source: https://www.remotion.dev/docs/interpolate-colors
---

# interpolateColors()[v2.0.3](https://github.com/remotion-dev/remotion/releases/v2.0.3)

Allows you to map a range of values to colors using a concise syntax.

## API[​](#api "Direct link to API")

Takes three arguments:

1. The input value.
2. The range of values that you expect the input to assume.
3. The range of output colors that you want the input to map to.

`inputRange` and `outputRange` must have the same length and at least one color.
With one color, `interpolateColors()` always returns the only output color as an `rgba` string.
Single-color ranges are supported from [v4.0.469](https://github.com/remotion-dev/remotion/releases/v4.0.469).

## Returns[​](#returns "Direct link to Returns")

A `rgba` color string. eg: `rgba(255, 100, 12, 1)`

## Example[​](#example "Direct link to Example")

In this example, we are interpolating colors from red to yellow. At frame 0 (the start of the video), we want the color to be `red`. At frame 20, we want the color to be `yellow`.

Using the following snippet, we can calculate the current color for any frame:

```tsx
import {interpolateColors, useCurrentFrame} from 'remotion';

const frame = useCurrentFrame() / 10;

const color = interpolateColors(frame, [0, 20], ['red', 'yellow']); // rgba(255, 128, 0, 1)

const color2 = interpolateColors(frame, [0, 20], ['#ff0000', '#ffff00']); // rgba(255, 128, 0, 1)Copy
```

## Interpolating `rgb` or `rgba` colors[​](#interpolating-rgb-or-rgba-colors "Direct link to interpolating-rgb-or-rgba-colors")

In this example, we are interpolating colors from red to yellow. At frame 0 (the start of the video), we want the color to be `red` (`rgb(255, 0, 0)`). At frame 20, we want the color to be `yellow` (`rgba(255, 255, 0)`).

Using the following snippet, we can calculate the current color for any frame:

```tsx
import {interpolateColors, useCurrentFrame} from 'remotion';

const frame = useCurrentFrame(); // 10

// RGB colors
const color = interpolateColors(frame, [0, 20], ['rgb(255, 0, 0)', 'rgb(255, 255, 0)']); // rgba(255, 128, 0, 1)

// RGBA colors
const color2 = interpolateColors(frame, [0, 20], ['rgba(255, 0, 0, 1)', 'rgba(255, 255, 0, 0)']); // rgba(255, 128, 0, 0.5)Copy
```

## Interpolating `hsl` or `hsla` colors[​](#interpolating-hsl-or-hsla-colors "Direct link to interpolating-hsl-or-hsla-colors")

In this example, we are interpolating colors from red to yellow. At frame 0 (the start of the video), we want the color to be `red` (`hsl(0, 100%, 50%)`). At frame 20, we want the color to be `yellow` (`hsl(60, 100%, 50%)`).

Using the following snippet, we can calculate the current color for any frame:

```tsx
import {useCurrentFrame, interpolateColors} from 'remotion';

const frame = useCurrentFrame(); // 10
//hsl example
const color = interpolateColors(frame, [0, 20], ['hsl(0, 100%, 50%)', 'hsl(60, 100%, 50%)']); // rgba(255, 128, 0, 1)

//hsla example
const color2 = interpolateColors(frame, [0, 20], ['hsla(0, 100%, 50%, 1)', 'hsla(60, 100%, 50%, 1)']); // rgba(255, 128, 0, 1)Copy
```

## Interpolating color names[​](#interpolating-color-names "Direct link to Interpolating color names")

Interpolating CSS color names is also supported.

```tsx
import {useCurrentFrame, interpolateColors} from 'remotion';

const frame = useCurrentFrame(); // 10

const color = interpolateColors(frame, [0, 20], ['red', 'yellow']); // rgba(255, 128, 0, 1)Copy
```

## Interpolating `oklch` colors[​](#interpolating-oklch-colors "Direct link to interpolating-oklch-colors")

[v4.0.439](https://github.com/remotion-dev/remotion/releases/v4.0.439)

Support for [`oklch()`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch) colors using space-separated syntax with optional alpha via `/`:

```tsx
import {useCurrentFrame, interpolateColors} from 'remotion';

const frame = useCurrentFrame(); // 10

const color = interpolateColors(frame, [0, 20], ['oklch(0.5 0.2 240)', 'oklch(0.9 0.1 120)']);

// With alpha
const color2 = interpolateColors(frame, [0, 20], ['oklch(0.5 0.2 240 / 1)', 'oklch(0.9 0.1 120 / 0.5)']);Copy
```

## Interpolating `oklab`, `lab`, `lch`, and `hwb` colors[​](#interpolating-oklab-lab-lch-and-hwb-colors "Direct link to interpolating-oklab-lab-lch-and-hwb-colors")

[v4.0.439](https://github.com/remotion-dev/remotion/releases/v4.0.439)

The following CSS Color Level 4 formats are also supported:

```tsx
import {useCurrentFrame, interpolateColors} from 'remotion';

const frame = useCurrentFrame(); // 10

// oklab
const a = interpolateColors(frame, [0, 20], ['oklab(0.5 -0.1 0.1)', 'oklab(0.9 0 0)']);

// lab
const b = interpolateColors(frame, [0, 20], ['lab(50 -20 40)', 'lab(90 0 0)']);

// lch
const c = interpolateColors(frame, [0, 20], ['lch(50 60 240)', 'lch(90 30 120)']);

// hwb
const d = interpolateColors(frame, [0, 20], ['hwb(0 0% 0%)', 'hwb(120 10% 10%)']);Copy
```

All modern color functions support the optional `/ alpha` syntax (e.g., `oklch(0.7 0.15 180 / 0.5)`).

## Compatibility[​](#compatibility "Direct link to Compatibility")

|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Browsers Servers Environments|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | Chrome  Firefox  Safari  Node.js  Bun  Serverless Functions  [Client-side rendering](/docs/client-side-rendering)  [Server-side rendering](/docs/ssr)  [Player](/docs/player)  [Studio](/docs/studio) |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/core/src/interpolate-colors.ts)
- [interpolate()](/docs/interpolate)
