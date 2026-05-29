---
title: "<Loop>"
source: https://www.remotion.dev/docs/loop
---

# <Loop>

[v2.5.0](https://github.com/remotion-dev/remotion/releases/v2.5.0)

The `<Loop />` component allows you to quickly lay out an animation so it repeats itself.

```tsx
MyComp.tsx

const MyComp = () => {
  return (
    <Loop durationInFrames={50} times={2}>
      <BlueSquare />
    </Loop>
  );
};Copy
```

note

Good to know: You can nest loops within each other and they will cascade.

## API[​](#api "Direct link to API")

The Loop component is a high order component and accepts, besides it's children, the following props:

### `durationInFrames`[​](#durationinframes "Direct link to durationinframes")

How many frames one iteration of the loop should be long.

### `times?`[​](#times "Direct link to times")

How many times to loop the content. Default: `Infinity`.

### `layout?`[​](#layout "Direct link to layout")

Either `"absolute-fill"` or `"none"`. Default: `"absolute-fill"`.  
By default, your content will be absolutely positioned.  
If you would like to disable layout side effects, pass `layout="none"`.

### `style?`[v3.3.4](https://github.com/remotion-dev/remotion/releases/v3.3.4)[​](#style "Direct link to style")

CSS styles to be applied to the container. If `layout` is set to `none`, there is no container and setting this style is not allowed.

## Examples[​](#examples "Direct link to Examples")

All the examples below are based on the following animation of a blue square:

  

```tsx
const MyComp = () => {
  return <BlueSquare />;
};Copy
```

### Continuous loop[​](#continuous-loop "Direct link to Continuous loop")

  

```tsx
const MyComp = () => {
  return (
    <Loop durationInFrames={50}>
      <BlueSquare />
    </Loop>
  );
};Copy
```

### Fixed count loop[​](#fixed-count-loop "Direct link to Fixed count loop")

  

```tsx
const MyComp = () => {
  return (
    <Loop durationInFrames={50} times={2}>
      <BlueSquare />
    </Loop>
  );
};Copy
```

### Nested loop[​](#nested-loop "Direct link to Nested loop")

  

```tsx
const MyComp = () => {
  return (
    <Loop durationInFrames={75}>
      <Loop durationInFrames={30}>
        <BlueSquare />
      </Loop>
    </Loop>
  );
};Copy
```

## `useLoop()`[v4.0.142](https://github.com/remotion-dev/remotion/releases/v4.0.142)[​](#useloop "Direct link to useloop")

A child component can use the `Loop.useLoop()` hook to get information about the current loop.  
You should check for `null`, which is the case if the component is not inside a loop.

If inside a loop, an object with two properties is returned:

- `durationInFrames`: The duration of the loop in frames as passed to the `<Loop />` component.
- `iteration`: The current iteration of the loop, starting at 0.

```tsx
import React from 'react';
import {Loop, useCurrentFrame} from 'remotion';

const LoopedVideo: React.FC = () => {
  return (
    <Loop durationInFrames={50} times={3} name="MyLoop">
      <Child />
    </Loop>
  );
};

const Child = () => {
  const frame = useCurrentFrame(); // 75
  const loop = Loop.useLoop();

  if (loop === null) {
    // Not inside a loop
  } else {
    console.log(loop.durationInFrames); // 50
    console.log(loop.iteration); // 1
  }

  return <div>{frame}</div>;
};Copy
```

## Compatibility[​](#compatibility "Direct link to Compatibility")

|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Browsers Environments|  |  |  |  |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | Chrome  Firefox  Safari  [Client-side rendering](/docs/client-side-rendering)  [Server-side rendering](/docs/ssr)  [Player](/docs/player)  [Studio](/docs/studio) |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | | | | | | | | | | | | | | | | | | | | | | |

## See also[​](#see-also "Direct link to See also")

- [Source code for this component](https://github.com/remotion-dev/remotion/blob/main/packages/core/src/loop/index.tsx)
- [`<Sequence>`](/docs/sequence)
