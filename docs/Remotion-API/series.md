---
title: "<Series>"
source: https://www.remotion.dev/docs/series
---

# <Series>

[v2.3.1](https://github.com/remotion-dev/remotion/releases/v2.3.1)

Using this component, you can easily stitch together scenes that should play sequentially after another.

## Example[​](#example "Direct link to Example")

### Code[​](#code "Direct link to Code")

```tsx
src/Example.tsx

import {Series} from 'remotion';

export const Example: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={40}>
        <Square color={'#3498db'} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={20}>
        <Square color={'#5ff332'} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={70}>
        <Square color={'#fdc321'} />
      </Series.Sequence>
    </Series>
  );
};Copy
```

### Result[​](#result "Direct link to Result")

## `<Series>` props[​](#series-props "Direct link to series-props")

Since [v4.0.443](https://github.com/remotion-dev/remotion/releases/v4.0.443), `<Series>` is a [`<Sequence>`](/docs/sequence) under the hood and accepts all of its props, with `layout` defaulting to `"none"`.

Apart from the props listed below, all props from [`<Sequence>`](/docs/sequence) are accepted.

### `layout?`[​](#layout "Direct link to layout")

Either `"absolute-fill"` or `"none"` *(default)*. If set to `"absolute-fill"`, the series is wrapped in an [`<AbsoluteFill>`](/docs/absolute-fill) container.

## `<Series.Sequence>` props[​](#seriessequence-props "Direct link to seriessequence-props")

A `<Series.Sequence />` component accepts the following props:

### `durationInFrames?`[​](#durationinframes "Direct link to durationinframes")

For how many frames the sequence should be displayed. Children are unmounted if they are not within the time range of display.

Only the last `<Series.Sequence />` instance is allowed to have `Infinity` as a duration, all previous one must have a positive integer.

### `offset?`[​](#offset "Direct link to offset")

Pass a positive number to delay the beginning of the sequence. Pass a negative number to start the sequence earlier, and to overlay the sequence with the one that comes before.

The offset does not apply to sequences that come before, but the sequences that come after it will also be shifted.

**Example 1**: Pass `10` to delay the sequence by 10 frames and create a blank space of 10 frames before it.  
**Example 2**: Pass `-10` to start the sequence earlier and overlay the sequence on top of the previous one for 10 frames.

### `layout?`[​](#layout-1 "Direct link to layout-1")

Either `"absolute-fill"` *(default)* or `"none"` By default, your sequences will be absolutely positioned, so they will overlay each other. If you would like to opt out of it and handle layouting yourself, pass `layout="none"`.

### `style?`[v3.3.4](https://github.com/remotion-dev/remotion/releases/v3.3.4)[​](#style "Direct link to style")

CSS styles to be applied to the container. If `layout` is set to `none`, there is no container and setting this style is not allowed.

### `className?`[v3.3.45](https://github.com/remotion-dev/remotion/releases/v3.3.45)[​](#classname "Direct link to classname")

A class name to be applied to the container. If `layout` is set to `none`, there is no container and setting this style is not allowed.

### `premountFor?`[v4.0.140](https://github.com/remotion-dev/remotion/releases/v4.0.140)[​](#premountfor "Direct link to premountfor")

[Premount](/docs/player/premounting) the sequence for a set number of frames.

### `ref?`[v3.3.4](https://github.com/remotion-dev/remotion/releases/v3.3.4)[​](#ref "Direct link to ref")

You can add a [React ref](https://react.dev/learn/manipulating-the-dom-with-refs) to a `<Series.Sequence>`. If you use TypeScript, you need to type it with `HTMLDivElement`:

```tsx
src/Example.tsx

import React, {useRef} from 'react';
import {Series} from 'remotion';

export const Example: React.FC = () => {
  const first = useRef<HTMLDivElement>(null);
  const second = useRef<HTMLDivElement>(null);

  return (
    <Series>
      <Series.Sequence durationInFrames={40} ref={first}>
        <Square color={'#3498db'} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={20} ref={second}>
        <Square color={'#5ff332'} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={70}>
        <Square color={'#fdc321'} />
      </Series.Sequence>
    </Series>
  );
};Copy
```

## Compatibility[​](#compatibility "Direct link to Compatibility")

|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Browsers Environments|  |  |  |  |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | Chrome  Firefox  Safari  [Client-side rendering](/docs/client-side-rendering)  [Server-side rendering](/docs/ssr)  [Player](/docs/player)  [Studio](/docs/studio) |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | | | | | | | | | | | | | | | | | | | | | | |

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/core/src/series/index.tsx)
- [`<Sequence />`](/docs/sequence)
