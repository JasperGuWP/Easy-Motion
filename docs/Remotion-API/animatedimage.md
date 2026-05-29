---
title: "<AnimatedImage>v4.0.246"
source: https://www.remotion.dev/docs/animatedimage
---

# `<AnimatedImage>`[v4.0.246](https://github.com/remotion-dev/remotion/releases/v4.0.246)

Renders an animated GIF, PNG, AVIF or WebP image and syncs it with Remotion's timeline.  
Relies on the [`ImageDecoder`](https://developer.mozilla.org/en-US/docs/Web/API/ImageDecoder) Web API, meaning it only works in Google Chrome and Firefox as of writing.

```tsx
Loading a remote animated image

import {AnimatedImage} from 'remotion';

export const WebpAnimatedImage = () => {
  return <AnimatedImage src="https://mathiasbynens.be/demo/animated-webp-supported.webp" />;
};Copy
```

```tsx
Loading a local animated image

import {AnimatedImage, staticFile} from 'remotion';

export const GifAnimatedImage = () => {
  return <AnimatedImage src={staticFile('giphy.gif')} />;
};Copy
```

## Props[​](#props "Direct link to Props")

### `src`[​](#src "Direct link to src")

The URL of the animated image. Can be a remote URL or a local file path.

note

Remote images need to support [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).More info

- Remotion's origin is usually `http://localhost:3000`, but it may be different if rendering on Lambda or the port is busy.- You can [disable CORS](/docs/chromium-flags#--disable-web-security) during renders.

### `width?`[​](#width "Direct link to width")

The display width.

### `height?`[​](#height "Direct link to height")

The display height.

### `fit?`[​](#fit "Direct link to fit")

Must be one of these values:

- `'fill'`: The image will completely fill the container, and will be stretched if necessary. (*default*)
- `'contain'`: The image is scaled to fit the box, while aspect ratio is maintained.
- `'cover'`: The image completely fills the container and maintains it's aspect ratio. It will be cropped if necessary.

### `style?`[​](#style "Direct link to style")

Allows to pass in custom CSS styles. You may not pass `width` and `height`, instead use the props `width` and `height` to set the size of the image.

### `loopBehavior?`[​](#loopbehavior "Direct link to loopbehavior")

The looping behavior of the animated image. Can be one of these values:

- `'loop'`: The animated image will loop infinitely. (*default*)
- `'pause-after-finish'`: The animated image will play once and then show the last frame.
- `'clear-after-finish'`: The animated image will play once and then clear the canvas.

### `playbackRate?`[​](#playbackrate "Direct link to playbackrate")

The playback rate of the animated image. Defaults to `1`. For example, `2` will play the animation twice as fast, `0.5` will play it at half speed.

### `ref?`[v3.3.88](https://github.com/remotion-dev/remotion/releases/v3.3.88)[​](#ref "Direct link to ref")

You can add a [React ref](https://react.dev/learn/manipulating-the-dom-with-refs) to `<AnimatedImage />`. If you use TypeScript, you need to type it with `HTMLCanvasElement`.

## Differences to `<Gif>`[​](#differences-to-gif "Direct link to differences-to-gif")

- `<AnimatedImage>` also supports AVIF, APNG and WebP images.
- `<AnimatedImage>` uses the [`ImageDecoder`](https://developer.mozilla.org/en-US/docs/Web/API/ImageDecoder) Web API, which has limited browser support.
- `<AnimatedImage>` does not support the `onLoad` prop.

## Compatibility[​](#compatibility "Direct link to Compatibility")

|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Browsers Environments|  |  |  |  |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | Chrome  Firefox  Safari  [Client-side rendering](/docs/client-side-rendering)  [Server-side rendering](/docs/ssr)  [Player](/docs/player)  [Studio](/docs/studio) |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | | | | | | | | | | | | | | | | | | | | | | |

## See also[​](#see-also "Direct link to See also")

- [Source code for this component](https://github.com/remotion-dev/remotion/blob/main/packages/core/src/animated-image/AnimatedImage.tsx)
- [`<Gif>`](/docs/gif)
