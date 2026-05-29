---
title: "<AbsoluteFill>"
source: https://www.remotion.dev/docs/absolute-fill
---

# <AbsoluteFill>

A helper component - it is an absolutely positioned `<div>` with the following styles:

```tsx
Styles of AbsoluteFill

const style: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
};Copy
```

This component is useful for layering content on top of each other. For example, you can use it to create a full-screen video background:

```tsx
Layer example

import {AbsoluteFill, OffthreadVideo} from 'remotion';

const MyComp = () => {
  return (
    <AbsoluteFill>
      <AbsoluteFill>
        <OffthreadVideo src="https://example.com/video.mp4" />
      </AbsoluteFill>
      <AbsoluteFill>
        <h1>This text is written on top!</h1>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};Copy
```

The layers that get rendered last appear on top - this is because of how HTML works.

## Adding a ref[​](#adding-a-ref "Direct link to Adding a ref")

You can add a [React ref](https://react.dev/learn/manipulating-the-dom-with-refs) to an `<AbsoluteFill>` from version `v3.2.13` on. If you use TypeScript, you need to type it with `HTMLDivElement`:

```tsx
const MyComp = () => {
  const ref = useRef<HTMLDivElement>(null);
  return <AbsoluteFill ref={ref}>{content}</AbsoluteFill>;
};Copy
```

## TailwindCSS class detection[v4.0.249](https://github.com/remotion-dev/remotion/releases/v4.0.249)[​](#tailwindcss-class-detection "Direct link to tailwindcss-class-detection")

This component has a `style` object, which has higher importance than `className`'s.

In order to make this behave like you expect (row layout):

```tsx
<AbsoluteFill className="flex flex-row" />Copy
```

We detect conflicting Tailwind classes and disable the corresponding inline styles if they are present from Remotion v4.0.249.  
Review the source code below to see how we detect Tailwind classes.

## Compatibility[​](#compatibility "Direct link to Compatibility")

|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Browsers Environments|  |  |  |  |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | Chrome  Firefox  Safari  [Client-side rendering](/docs/client-side-rendering)  [Server-side rendering](/docs/ssr)  [Player](/docs/player)  [Studio](/docs/studio) |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | | | | | | | | | | | | | | | | | | | | | | |

## See also[​](#see-also "Direct link to See also")

- [Source code for this component](https://github.com/remotion-dev/remotion/blob/main/packages/core/src/AbsoluteFill.tsx)
