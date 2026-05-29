---
title: "<Gif>"
source: https://www.remotion.dev/docs/gif/gif
---

# <Gif>

*Part of the [`@remotion/gif`](/docs/gif) package*

Displays a GIF that synchronizes with Remotions [`useCurrentFrame()`](/docs/use-current-frame).

```tsx
import {Gif} from '@remotion/gif';

export const MyComponent: React.FC = () => {
  const {width, height} = useVideoConfig();
  const ref = useRef<HTMLCanvasElement>(null);

  return (
    <Gif
      ref={ref}
      src="https://media.giphy.com/media/3o72F7YT6s0EMFI0Za/giphy.gif"
      width={width}
      height={height}
      fit="fill"
      playbackRate={2}
    />
  );
};Copy
```

## Props[​](#props "Direct link to Props")

### `src`[​](#src "Direct link to src")

The source of the GIF. Can be an URL or a local image - see [Importing assets](/docs/assets).

note

Remote GIFs need to support [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).More info

- Remotion's origin is usually `http://localhost:3000`, but it
  may be different if rendering on Lambda or the port is busy.- You can 
    [disable CORS](/docs/chromium-flags#--disable-web-security) 
    during renders.

### `width`[​](#width "Direct link to width")

The display width.

### `height`[​](#height "Direct link to height")

The display height.

### `fit`[​](#fit "Direct link to fit")

Must be one of these values:

- `'fill'`: The GIF will completely fill the container, and will be stretched if necessary. (*default*)
- `'contain'`: The GIF is scaled to fit the box, while aspect ratio is maintained.
- `'cover'`: The GIF completely fills the container and maintains it's aspect ratio. It will be cropped if necessary.

### `onLoad`[​](#onload "Direct link to onload")

Callback that gets called once the GIF has loaded and finished processing. As its only argument, the callback gives the following object:

- `width`: Width of the GIF file in pixels.
- `height`: Height of the GIF file in pixels.
- `delays`: Array of timestamps of type `number` containing position of each frame.
- `frames`: Array of frames of type [`ImageData`](https://developer.mozilla.org/en-US/docs/Web/API/ImageData)

### `style`[​](#style "Direct link to style")

Allows to pass in custom CSS styles. You may not pass `width` and `height`, instead use the props `width` and `height` to set the size of the GIF.

### `loopBehavior`[v3.3.4](https://github.com/remotion-dev/remotion/releases/v3.3.4)[​](#loopbehavior "Direct link to loopbehavior")

The looping behavior of the GIF. Can be one of these values:

- `'loop'`: The GIF will loop infinitely. (*default*)
- `'pause-after-finish'`: The GIF will play once and then show the last frame.
- `'unmount-after-finish'`: The GIF will play once and then unmount. Note that if you attach a `ref`, it will become `null` after the GIF has finished playing.

### `ref`[v3.3.88](https://github.com/remotion-dev/remotion/releases/v3.3.88)[​](#ref "Direct link to ref")

You can add a [React ref](https://react.dev/learn/manipulating-the-dom-with-refs) to `<Gif>`. If you use TypeScript, you need to type it with `HTMLCanvasElement`.

### playbackRate[v4.0.44](https://github.com/remotion-dev/remotion/releases/v4.0.44)[​](#playbackrate "Direct link to playbackrate")

The `playbackRate` prop controls the playback speed of the GIF animation within your Remotion video. It enables you to adjust how fast or slow the GIF animation plays, allowing for precise synchronization with your video content.

Default: 1 (Normal speed)
Values:

- `1`: Plays the GIF at normal speed.
- `< 1`: Slows down the GIF speed (e.g., 0.5 plays it at half speed).
- `> 1:` Speeds up the GIF speed (e.g., 2.0 plays it at double speed).

### `delayRenderTimeoutInMilliseconds?`[v4.0.403](https://github.com/remotion-dev/remotion/releases/v4.0.403)[​](#delayrendertimeoutinmilliseconds "Direct link to delayrendertimeoutinmilliseconds")

Modifies the timeout of the internal [`delayRender()`](/docs/delay-render) call when loading the GIF. By default, Remotion will wait 30 seconds for the GIF to load before timing out. You can increase or decrease this timeout by passing a custom value.

See: [Modifying the timeout](/docs/delay-render#modifying-the-timeout)

```tsx
<Gif
  src="https://example.com/large-gif.gif"
  delayRenderTimeoutInMilliseconds={60000} // 60 seconds
/>Copy
```

## Differences to `<AnimatedImage>`[​](#differences-to-animatedimage "Direct link to differences-to-animatedimage")

- `<Gif>` does not support animated AVIF and WebP images.
- `<Gif>` works in Safari as well since it uses a JavaScript-based GIF decoder.
- `<Gif>` supports the [`onLoad`](#onload) prop.

## See also[​](#see-also "Direct link to See also")

- [`<AnimatedImage>`](/docs/animatedimage)
- [`getGifDurationInSeconds()`](/docs/gif/get-gif-duration-in-seconds)
- [Source code for this component](https://github.com/remotion-dev/remotion/blob/main/packages/gif/src/Gif.tsx)
