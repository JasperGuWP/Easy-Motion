---
title: "<CanvasImage>v4.0.466"
source: https://www.remotion.dev/docs/canvasimage
---

# <CanvasImage>[v4.0.466](https://github.com/remotion-dev/remotion/releases/v4.0.466)

Renders a static image onto a [`<canvas>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/canvas) element.

Benefit: You can attach [`effects`](/docs/effects/api) to the image.  
Drawback: Assets must support CORS.  
Use [`<Img>`](/docs/img) if you want a component based on the regular `<img>` tag.

```tsx
MyComp.tsx

import {AbsoluteFill, CanvasImage, staticFile} from 'remotion';

export const MyComp: React.FC = () => {
  return (
    <AbsoluteFill>
      <CanvasImage src={staticFile('image.png')} />
    </AbsoluteFill>
  );
};Copy
```

## API[​](#api "Direct link to API")

### `src`[​](#src "Direct link to src")

The URL of the image. Can be a remote URL or a local file path from [`staticFile()`](/docs/staticfile).

Remote images need to support [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) because the image is drawn onto a canvas.

### `width?`[​](#width "Direct link to width")

The canvas width in pixels.  
If omitted, the decoded image width is used.

### `height?`[​](#height "Direct link to height")

The canvas height in pixels.  
If omitted, the decoded image height is used.

### `fit?`[​](#fit "Direct link to fit")

Must be one of these values:

- `'fill'`: The image will completely fill the canvas, and will be stretched if necessary. (*default*)
- `'contain'`: The image is scaled to fit the canvas, while aspect ratio is maintained.
- `'cover'`: The image completely fills the canvas and maintains its aspect ratio. It will be cropped if necessary.

### `effects?`[​](#effects "Direct link to effects")

An array of Remotion [effects](/docs/effects/api) to apply to the image after it has been drawn to the source canvas.

### `className?`[​](#classname "Direct link to classname")

A class name to apply to the `<canvas>` element.

### `id?`[​](#id "Direct link to id")

The HTML `id` attribute to apply to the `<canvas>` element.

### `style?`[​](#style "Direct link to style")

Inline styles to apply to the `<canvas>` element.

### `onError?`[​](#onerror "Direct link to onerror")

Called when the image cannot be loaded, decoded, or drawn after all retries are exhausted.  
If omitted, [`cancelRender()`](/docs/cancel-render) is called.

### `pauseWhenLoading?`[v4.0.467](https://github.com/remotion-dev/remotion/releases/v4.0.467)[​](#pausewhenloading "Direct link to pausewhenloading")

If `true`, the [Player](/docs/player) will pause playback while the image is loading. Default `false`.  
Has no effect during rendering (rendering always waits via `delayRender()`).

### `maxRetries?`[v4.0.467](https://github.com/remotion-dev/remotion/releases/v4.0.467)[​](#maxretries "Direct link to maxretries")

The number of times to retry loading the image after a failure before giving up. Default `2`.  
Retries use [exponential backoff](https://en.wikipedia.org/wiki/Exponential_backoff): the first retry waits 1 second, the second 2 seconds, the third 4 seconds, and so on.

### `delayRenderRetries?`[v4.0.467](https://github.com/remotion-dev/remotion/releases/v4.0.467)[​](#delayrenderretries "Direct link to delayrenderretries")

How many times [`delayRender()`](/docs/delay-render) may retry before the render times out.  
Passed directly to the `retries` option of `delayRender()`.

### `delayRenderTimeoutInMilliseconds?`[v4.0.467](https://github.com/remotion-dev/remotion/releases/v4.0.467)[​](#delayrendertimeoutinmilliseconds "Direct link to delayrendertimeoutinmilliseconds")

The timeout in milliseconds for each [`delayRender()`](/docs/delay-render) call.  
Passed directly to the `timeoutInMilliseconds` option of `delayRender()`.

### Inherited props[​](#inherited-props "Direct link to Inherited props")

`<CanvasImage>` inherits [`from`](/docs/sequence#from), [`durationInFrames`](/docs/sequence#durationinframes), [`name`](/docs/sequence#name), [`showInTimeline`](/docs/sequence#showintimeline) and [`hidden`](/docs/sequence#hidden) from [`<Sequence>`](/docs/sequence).

## Adding a ref[​](#adding-a-ref "Direct link to Adding a ref")

You can add a [React ref](https://react.dev/learn/manipulating-the-dom-with-refs) to a `<CanvasImage>` component.  
If you use TypeScript, type it with `HTMLCanvasElement`:

```tsx
MyComp.tsx

import {useRef} from 'react';
import {CanvasImage, staticFile} from 'remotion';

export const MyComp: React.FC = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  return <CanvasImage ref={ref} src={staticFile('image.png')} />;
};Copy
```

## Compatibility[​](#compatibility "Direct link to Compatibility")

|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Browsers Environments|  |  |  |  |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | Chrome  Firefox  Safari  [Client-side rendering](/docs/client-side-rendering)  [Server-side rendering](/docs/ssr)  [Player](/docs/player)  [Studio](/docs/studio) |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | | | | | | | | | | | | | | | | | | | | | | |

## See also[​](#see-also "Direct link to See also")

- [Source code for this component](https://github.com/remotion-dev/remotion/blob/main/packages/core/src/canvas-image/CanvasImage.tsx)
- [`<Img>`](/docs/img)
- [`<AnimatedImage>`](/docs/animatedimage)
