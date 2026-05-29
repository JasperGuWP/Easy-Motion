---
title: "renderStillOnVercel()v4.0.426"
source: https://www.remotion.dev/docs/vercel/render-still-on-vercel
---

# renderStillOnVercel()[v4.0.426](https://github.com/remotion-dev/remotion/releases/v4.0.426)

warning

Experimental package: We reserve the right to make breaking changes in order to correct bad design decisions until this notice is gone.

Renders a still image inside a Vercel Sandbox.

The rendered file stays inside the sandbox. Use [`uploadToVercelBlob()`](/docs/vercel/upload-to-vercel-blob) to upload it to Vercel Blob.

## Example[​](#example "Direct link to Example")

```tsx
route.ts

const {sandboxFilePath} = await renderStillOnVercel({
  sandbox,
  compositionId: 'MyComp',
  inputProps: {title: 'Hello World'},
  imageFormat: 'png',
});Copy
```

## Arguments[​](#arguments "Direct link to Arguments")

An object with the following properties:

### `sandbox`[​](#sandbox "Direct link to sandbox")

A [`Sandbox`](https://vercel.com/docs/vercel-sandbox/sdk-reference#sandbox-class) instance.

### `compositionId`[​](#compositionid "Direct link to compositionid")

The ID of the Remotion composition to render.

### `inputProps`[​](#inputprops "Direct link to inputprops")

Props to pass to the composition.

### `imageFormat?`[​](#imageformat "Direct link to imageformat")

The image format to use when rendering a still. Must be one of "png", "jpeg", "pdf", "webp". Default: `"png"`.

### `outputFile?`[​](#outputfile "Direct link to outputfile")

The output file path inside the sandbox. Default: `"/tmp/still.png"`.

### `frame?`[​](#frame "Direct link to frame")

Which frame should be rendered when rendering a still. Default `0`. From v3.2.27, negative values are allowed, with `-1` being the last frame.

### `jpegQuality?`[​](#jpegquality "Direct link to jpegquality")

Sets the quality of the generated JPEG images. Must be an integer between 0 and 100. Default: 80.

### `envVariables?`[​](#envvariables "Direct link to envvariables")

An object containing key-value pairs of environment variables which will be injected into your Remotion project and which can be accessed by reading the global `process.env` object. Default: `{}`.

### `chromiumOptions?`[​](#chromiumoptions "Direct link to chromiumoptions")

Allows you to set certain Chromium / Google Chrome flags. See: [Chromium flags](/docs/chromium-flags).

### `scale?`[​](#scale "Direct link to scale")

Scales the output dimensions by a factor. For example, a 1280x720px frame will become a 1920x1080px frame with a scale factor of `1.5`. See [Scaling](https://www.remotion.dev/docs/scaling) for more details.

### `logLevel?`[​](#loglevel "Direct link to loglevel")

One of `trace`, `verbose`, `info`, `warn`, `error`.  
 Determines how much info is being logged to the console.  
  
 Default `info`.

### `timeoutInMilliseconds?`[​](#timeoutinmilliseconds "Direct link to timeoutinmilliseconds")

A number describing how long the render may take to resolve all [`delayRender()`](https://remotion.dev/docs/delay-render) calls [before it times out](https://remotion.dev/docs/timeout). Default: `30000`

### `offthreadVideoCacheSizeInBytes?`[​](#offthreadvideocachesizeinbytes "Direct link to offthreadvideocachesizeinbytes")

From v4.0, Remotion has a cache for [`<OffthreadVideo>`](https://remotion.dev/docs/offthreadvideo) frames. The default is `null`, corresponding to half of the system memory available when the render starts.  
 This option allows to override the size of the cache. The higher it is, the faster the render will be, but the more memory will be used.  
The used value will be printed when running in verbose mode.  
Default: `null`

### `mediaCacheSizeInBytes?`[​](#mediacachesizeinbytes "Direct link to mediacachesizeinbytes")

Specify the maximum size of the cache that `<Video>` and `<Audio>` from `@remotion/media` may use combined, in bytes.   
The default is half of the available system memory when the render starts.

### `offthreadVideoThreads?`[​](#offthreadvideothreads "Direct link to offthreadvideothreads")

The number of threads that[`<OffthreadVideo>`](https://remotion.dev/docs/offthreadvideo) can start to extract frames. The default is 2. Increase carefully, as too many threads may cause instability.

### `licenseKey?`[​](#licensekey "Direct link to licensekey")

License key for sending a usage event using `@remotion/licensing`.

### `onProgress?`[​](#onprogress "Direct link to onprogress")

*function* [`RenderStillOnVercelProgress`](/docs/vercel/types#renderstillonvercelprogress "You can import the TypeScript type `RenderStillOnVercelProgress` from @remotion/vercel")

A callback that receives render progress updates. Every variant includes `overallProgress` (0–1).

## Return value[​](#return-value "Direct link to Return value")

An object containing:

### `sandboxFilePath`[​](#sandboxfilepath "Direct link to sandboxfilepath")

The path to the rendered still image inside the sandbox.

### `contentType`[​](#contenttype "Direct link to contenttype")

The MIME type of the rendered output (e.g. `"image/png"`, `"image/jpeg"`, `"image/webp"`).

## See also[​](#see-also "Direct link to See also")

- [`renderMediaOnVercel()`](/docs/vercel/render-media-on-vercel)
- [`uploadToVercelBlob()`](/docs/vercel/upload-to-vercel-blob)
- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/vercel/src/render-still-on-vercel.ts)
