---
title: "makeCancelSignal()v3.0.15"
source: https://www.remotion.dev/docs/renderer/make-cancel-signal
---

# makeCancelSignal()[v3.0.15](https://github.com/remotion-dev/remotion/releases/v3.0.15)

*Part of the `@remotion/renderer` package.*

This function returns a signal and a cancel function that allows to you cancel a render triggered using [`renderMedia()`](/docs/renderer/render-media), [`renderStill()`](/docs/renderer/render-still), [`renderFrames()`](/docs/renderer/render-frames) or [`stitchFramesToVideo()`](/docs/renderer/stitch-frames-to-video)
.

## Example[​](#example "Direct link to Example")

```tsx
import {makeCancelSignal, renderMedia} from '@remotion/renderer';

const {cancelSignal, cancel} = makeCancelSignal();

// Note that no `await` is used yet
const render = renderMedia({
  composition,
  codec: 'h264',
  serveUrl: '/path/to/bundle',
  outputLocation: 'out/render.mp4',
  cancelSignal,
});

// Cancel render after 10 seconds
setTimeout(() => {
  cancel();
}, 10000);

// If the render completed within 10 seconds, renderMedia() will resolve
await render;

// If the render did not complete, renderMedia() will reject
// ==> "[Error: renderMedia() got cancelled]"Copy
```

## API[​](#api "Direct link to API")

Calling `makeCancelSignal` returns an object with two properties:

- `cancelSignal`: An object to be passed to one of the above mentioned render functions
- `cancel`: A function you should call when you want to cancel the render.

## Compatibility[​](#compatibility "Direct link to Compatibility")

|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Browsers Servers Environments|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | Chrome  Firefox  Safari  Node.js  Bun  Serverless Functions  [Client-side rendering](/docs/client-side-rendering)  [Server-side rendering](/docs/ssr)  [Player](/docs/player)  [Studio](/docs/studio) |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |

## See also[​](#see-also "Direct link to See also")

- [Source code for this component](https://github.com/remotion-dev/remotion/blob/main/packages/renderer/src/make-cancel-signal.ts)
- [`renderMedia()`](/docs/renderer/render-media)
- [`renderStill()`](/docs/renderer/render-still)
- [`renderFrames()`](/docs/renderer/render-frames)
- [`stitchFramesToVideo()`](/docs/renderer/stitch-frames-to-video)
