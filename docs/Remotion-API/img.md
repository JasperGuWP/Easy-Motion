---
title: "<Img>"
source: https://www.remotion.dev/docs/img
---

# <Img>

The `<Img>` tag can be used like a regular `<img>` HTML tag.

If you use `<Img>`, Remotion will ensure that the image is loaded before rendering the frame. That way you can avoid flickers if the image does not load immediately during rendering.

## API[​](#api "Direct link to API")

### `src`[​](#src "Direct link to src")

[Put an image into the `public/` folder](/docs/assets) and use [`staticFile()`](/docs/staticfile) to reference it.

```tsx
import {AbsoluteFill, Img, staticFile} from 'remotion';

export const MyComp: React.FC = () => {
  return (
    <AbsoluteFill>
      <Img src={staticFile('hi.png')} />
    </AbsoluteFill>
  );
};Copy
```

You can also load a remote image:

```tsx
import {AbsoluteFill, Img} from 'remotion';

export const MyComp: React.FC = () => {
  return (
    <AbsoluteFill>
      <Img src={'https://picsum.photos/200/300'} />
    </AbsoluteFill>
  );
};Copy
```

### `effects?`[v4.0.469](https://github.com/remotion-dev/remotion/releases/v4.0.469)[​](#effects "Direct link to effects")

Apply [effects](/docs/effects/api) to the image.

When `effects` is omitted or an empty array, `<Img>` renders a native `<img>` element. When at least one effect is passed, `<Img>` renders through [`<CanvasImage>`](/docs/canvasimage) and outputs a `<canvas>`.

```tsx
MyComp.tsx

import {AbsoluteFill, Img, staticFile} from 'remotion';
import {blur} from '@remotion/effects/blur';

export const MyComp: React.FC = () => {
  return (
    <AbsoluteFill>
      <Img src={staticFile('hi.png')} effects={[blur({radius: 8})]} />
    </AbsoluteFill>
  );
};Copy
```

Because the element becomes a `<canvas>`, native image props that require an `<img>` element cannot be used with non-empty `effects`.

The unsupported props include `ref`, `srcSet`, `sizes`, `loading`, `decoding`, `fetchPriority`, `useMap`, `crossOrigin`, `onLoad`, `onError`, `onImageFrame` and `alt`.

Canvas-compatible props such as `aria-*`, `data-*`, `role`, `title`, `tabIndex` and pointer or mouse event handlers are forwarded to the underlying `<canvas>`.
When [`effects`](#effects) is a non-empty array, `style.objectFit` controls how the image is drawn into the canvas. Supported values are `"fill"`, `"contain"` and `"cover"`.

### `onError`[​](#onerror "Direct link to onerror")

To use the `<Img>` tag in a resilient way, handle the error that occurs when an image can not be loaded:

```tsx
import {AbsoluteFill, Img, staticFile} from 'remotion';

export const MyComp: React.FC = () => {
  return (
    <AbsoluteFill>
      <Img
        src={staticFile('hi.png')}
        onError={(event) => {
          // Handle image loading error here
        }}
      />
    </AbsoluteFill>
  );
};Copy
```

If an error occurs, the component must be unmounted or the `src` must be replaced, otherwise the render will time out.

From `v3.3.82`, the image load will first be retried before `onError` is thrown.

### `maxRetries`[v3.3.82](https://github.com/remotion-dev/remotion/releases/v3.3.82)[​](#maxretries "Direct link to maxretries")

If an image fails to load, it will be retried from `v3.3.82`. The default value is `2`.  
An exponential backoff is being used, with 1000ms delay between the first and second attempt, then 2000ms, then 4000ms and so on.

### `pauseWhenLoading?`[v4.0.111](https://github.com/remotion-dev/remotion/releases/v4.0.111)[​](#pausewhenloading "Direct link to pausewhenloading")

If set to `true`, pause the Player when the image is loading. See: [Buffer state](/docs/player/buffer-state).

### `delayRenderTimeoutInMilliseconds?`[v4.0.140](https://github.com/remotion-dev/remotion/releases/v4.0.140)[​](#delayrendertimeoutinmilliseconds "Direct link to delayrendertimeoutinmilliseconds")

Customize the [timeout](/docs/delay-render#modifying-the-timeout) of the [`delayRender()`](/docs/delay-render) call that this component makes.

### `delayRenderRetries?`[v4.0.140](https://github.com/remotion-dev/remotion/releases/v4.0.140)[​](#delayrenderretries "Direct link to delayrenderretries")

Customize the [number of retries](/docs/delay-render#retrying) of the [`delayRender()`](/docs/delay-render) call that this component makes.  
Prefer the [`maxRetries`](#maxretries) prop over this.

### Inherited props[v4.0.465](https://github.com/remotion-dev/remotion/releases/v4.0.465)[​](#inherited-props "Direct link to inherited-props")

`<Img>` inherits [`from`](/docs/sequence#from), [`durationInFrames`](/docs/sequence#durationinframes), [`name`](/docs/sequence#name), [`showInTimeline`](/docs/sequence#showintimeline) and [`hidden`](/docs/sequence#hidden) from [`<Sequence>`](/docs/sequence).

note

You can still wrap `<Img>` in an outer [`<Sequence>`](/docs/sequence). Timing [cascades](/docs/sequence#cascading) like nested sequences.

```tsx
Clip starting at frame 30, lasting 90 frames

import {AbsoluteFill, Img, staticFile} from 'remotion';

export const MyComp: React.FC = () => {
  return (
    <AbsoluteFill>
      <Img from={30} durationInFrames={90} src={staticFile('hi.png')} />
    </AbsoluteFill>
  );
};Copy
```

### Other props[​](#other-props "Direct link to Other props")

Remotion inherits the props of the regular `<img>` tag, like for example `style`. If [`effects`](#effects) is a non-empty array, only the props supported by [`<CanvasImage>`](/docs/canvasimage) are supported.

## GIFs[​](#gifs "Direct link to GIFs")

Don't use the `<Img>` tag for GIFs, use [`@remotion/gif`](/docs/gif) instead.

## Error behavior[​](#error-behavior "Direct link to Error behavior")

From v4.0.0: If the image fails to load and no retries are left, then [`cancelRender`](/docs/cancel-render) will be called to throw an error, unless you handle the error using `onError()`.

From v3.3.82: If an image fails to load, it will be retried up to two times.

In earlier versions, failing to load an image would lead to an error message in the console and an eventual timeout.

## Restrictions[​](#restrictions "Direct link to Restrictions")

- The maximum resolution that Chrome can display is `2^29` pixels (539 megapixels) [[source]](https://stackoverflow.com/questions/57223559/what-is-the-maximum-image-dimensions-supported-in-desktop-chrome#:~:text=than%202%5E29-,(539MP)). Remotion inherits this restriction.

## Compatibility[​](#compatibility "Direct link to Compatibility")

|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Browsers Environments|  |  |  |  |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | Chrome  Firefox  Safari  [Client-side rendering](/docs/client-side-rendering)  [Server-side rendering](/docs/ssr)  [Player](/docs/player)  [Studio](/docs/studio) |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | | | | | | | | | | | | | | | | | | | | | | |

## See also[​](#see-also "Direct link to See also")

- [Source code for this component](https://github.com/remotion-dev/remotion/blob/main/packages/core/src/Img.tsx)
- [Use `<Img>` and `<IFrame>` tags](/docs/use-img-and-iframe)
