---
title: "renderMediaOnVercel()v4.0.426"
source: https://www.remotion.dev/docs/vercel/render-media-on-vercel
---

# renderMediaOnVercel()[v4.0.426](https://github.com/remotion-dev/remotion/releases/v4.0.426)

warning

Experimental package: We reserve the right to make breaking changes in order to correct bad design decisions until this notice is gone.

Renders a video inside a Vercel Sandbox.

The rendered file stays inside the sandbox. Use [`uploadToVercelBlob()`](/docs/vercel/upload-to-vercel-blob) to upload it to Vercel Blob.

Set [`detached: true`](#detached) to return immediately and poll the render with [`getRenderProgress()`](/docs/vercel/get-render-progress).

## Example[​](#example "Direct link to Example")

```tsx
route.ts

const {sandboxFilePath} = await renderMediaOnVercel({
  sandbox,
  compositionId: 'MyComp',
  inputProps: {title: 'Hello World'},
  onProgress: async (update) => {
    console.log(`Overall: ${Math.round(update.overallProgress * 100)}%`);
    if (update.stage === 'render-progress') {
      console.log(`Rendering: ${Math.round(update.progress.progress * 100)}%`);
    }
  },
});Copy
```

## Detached render[​](#detached-render "Direct link to Detached render")

```tsx
route.ts

const {sandboxId, cmdId} = await renderMediaOnVercel({
  sandbox,
  compositionId: 'MyComp',
  inputProps: {title: 'Hello World'},
  detached: true,
  vercelBlob: {
    blobToken: process.env.BLOB_READ_WRITE_TOKEN!,
    access: 'public',
  },
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

### `codec?`[​](#codec "Direct link to codec")

*string* [`Codec`](/docs/renderer/types#codec "You can import the TypeScript type `Codec` from @remotion/renderer")

Choose a suitable codec for your output media. Refer to the [Encoding guide](/docs/encoding) to find the best codec for your use case. Default: `"h264"`.

### `outputFile?`[​](#outputfile "Direct link to outputfile")

The output file path inside the sandbox. Default: `"/tmp/video.mp4"`.

### `detached?`[v4.0.469](https://github.com/remotion-dev/remotion/releases/v4.0.469)[​](#detached "Direct link to detached")

When set to `true`, starts the render and returns `{sandboxId, cmdId, outputFile}` without waiting for it to finish.

Use [`getRenderProgress()`](/docs/vercel/get-render-progress) to poll the returned IDs.

### `vercelBlob?`[v4.0.469](https://github.com/remotion-dev/remotion/releases/v4.0.469)[​](#vercelblob "Direct link to vercelblob")

[`VercelBlobUploadOptions`](/docs/vercel/types#vercelblobuploadoptions "You can import the TypeScript type `VercelBlobUploadOptions` from @remotion/vercel")

Uploads the rendered video from inside the sandbox to Vercel Blob.

This option is only available when [`detached: true`](#detached), and required in that mode because the route that started the render returns before the video exists.

### `detachedSandboxTimeoutInMilliseconds?`[v4.0.469](https://github.com/remotion-dev/remotion/releases/v4.0.469)[​](#detachedsandboxtimeoutinmilliseconds "Direct link to detachedsandboxtimeoutinmilliseconds")

Extends the sandbox lifetime before returning from a detached render. Default: `1800000` (30 minutes).

### `crf?`[​](#crf "Direct link to crf")

No matter which codec you end up using, there's always a tradeoff between file size and video quality. You can control it by setting the CRF (Constant Rate Factor). The lower the number, the better the quality, the higher the number, the smaller the file is – of course at the cost of quality.

### `imageFormat?`[​](#imageformat "Direct link to imageformat")

The image format to use when rendering frames for a video. Must be one of "png", "jpeg", "none". Default: `"jpeg"`. JPEG is faster, but does not support transparency.

### `pixelFormat?`[​](#pixelformat "Direct link to pixelformat")

Sets the pixel format in FFmpeg. See [the FFmpeg docs for an explanation](https://trac.ffmpeg.org/wiki/Chroma%20Subsampling). Acceptable values: "yuv420p", "yuva420p", "yuv422p", "yuv444p", "yuv420p10le", "yuv422p10le", "yuv444p10le", "yuva444p10le".

### `envVariables?`[​](#envvariables "Direct link to envvariables")

`Record<string, string>`

An object containing environment variables to be injected in your project.

See: [Environment variables](/docs/env-variables/)

### `frameRange?`[​](#framerange "Direct link to framerange")

*number | [number, number] | [number, null]* [`FrameRange`](/docs/renderer/types#framerange "You can import the TypeScript type `FrameRange` from @remotion/renderer")

Specify a single frame (passing a `number`) or a range of frames (passing a tuple `[number, number]`) to be rendered. By passing `null` (default) all frames of a composition get rendered.

### `everyNthFrame?`[​](#everynthframe "Direct link to everynthframe")

This option may only be set when rendering GIFs. It determines how many frames are rendered, while the other ones get skipped in order to lower the FPS of the GIF. For example, if the `fps` is 30, and `everyNthFrame` is 2, the FPS of the GIF is `15`.

### `proResProfile?`[​](#proresprofile "Direct link to proresprofile")

Set the ProRes profile. This option is only valid if the codec has been set to `prores`. Possible values: "4444-xq", "4444", "hq", "standard", "light", "proxy". Default: `"hq"`. See [here](https://video.stackexchange.com/a/14715) for an explanation of possible values.

### `chromiumOptions?`[​](#chromiumoptions "Direct link to chromiumoptions")

Allows you to set certain Chromium / Google Chrome flags. See: [Chromium flags](/docs/chromium-flags).

### `scale?`[​](#scale "Direct link to scale")

Scales the output dimensions by a factor. For example, a 1280x720px frame will become a 1920x1080px frame with a scale factor of `1.5`. See [Scaling](https://www.remotion.dev/docs/scaling) for more details.

### `preferLossless?`[​](#preferlossless "Direct link to preferlossless")

Uses a lossless audio codec, if one is available for the codec. If you set`audioCodec`, it takes priority over `preferLossless`.

### `enforceAudioTrack?`[​](#enforceaudiotrack "Direct link to enforceaudiotrack")

Render a silent audio track if there would be none otherwise.

### `disallowParallelEncoding?`[​](#disallowparallelencoding "Direct link to disallowparallelencoding")

Disallows the renderer from doing rendering frames and encoding at the same time. This makes the rendering process more memory-efficient, but possibly slower.

### `concurrency?`[​](#concurrency "Direct link to concurrency")

How many CPU threads to use. Minimum 1. The maximum is the amount of threads you have (In Node.JS `os.cpus().length`). You can also provide a percentage value (e.g. `50%`).

### `metadata?`[​](#metadata "Direct link to metadata")

An object containing metadata to be embedded in the video. See [here](/docs/metadata) for which metadata is accepted.

### `logLevel?`[​](#loglevel "Direct link to loglevel")

One of `trace`, `verbose`, `info`, `warn`, `error`.  
 Determines how much info is being logged to the console.  
  
 Default `info`.

### `timeoutInMilliseconds?`[​](#timeoutinmilliseconds "Direct link to timeoutinmilliseconds")

A number describing how long the render may take to resolve all [`delayRender()`](https://remotion.dev/docs/delay-render) calls [before it times out](https://remotion.dev/docs/timeout). Default: `30000`

### `videoBitrate?`[​](#videobitrate "Direct link to videobitrate")

Specify the target bitrate for the generated video. The syntax for FFmpeg's`-b:v` parameter should be used. FFmpeg may encode the video in a way that will not result in the exact video bitrate specified. Example values: `512K` for 512 kbps, `1M` for 1 Mbps.

### `audioBitrate?`[​](#audiobitrate "Direct link to audiobitrate")

Specify the target bitrate for the generated video. The syntax for FFmpeg's `-b:a` parameter should be used. FFmpeg may encode the video in a way that will not result in the exact audio bitrate specified. Example values: `512K` for 512 kbps, `1M` for 1 Mbps. Default: `320k`

### `audioCodec?`[​](#audiocodec "Direct link to audiocodec")

Set the format of the audio that is embedded in the video. Not all codec and audio codec combinations are supported and certain combinations require a certain file extension and container format. See the table in the docs to see possible combinations.

### `encodingMaxRate?`[​](#encodingmaxrate "Direct link to encodingmaxrate")

The value for the `-maxrate` flag of FFmpeg. Should be used in conjunction with the encoding buffer size flag.

### `encodingBufferSize?`[​](#encodingbuffersize "Direct link to encodingbuffersize")

The value for the `-bufsize` flag of FFmpeg. Should be used in conjunction with the encoding max rate flag.

### `muted?`[​](#muted "Direct link to muted")

The Audio of the video will be omitted.

### `numberOfGifLoops?`[​](#numberofgifloops "Direct link to numberofgifloops")

Allows you to set the number of loops as follows:

- `null` (or omitting in the CLI) plays the GIF indefinitely.- `0` disables looping- `1` loops the GIF once (plays twice in total)- `2` loops the GIF twice (plays three times in total) and so on.

### `x264Preset?`[​](#x264preset "Direct link to x264preset")

Sets a x264 preset profile. Only applies to videos rendered with `h264` codec.  
Possible values: `superfast`, `veryfast`, `faster`, `fast`, `medium`, `slow`, `slower`, `veryslow`, `placebo`.  
Default: `medium`

### `gopSize?`[v4.0.466](https://github.com/remotion-dev/remotion/releases/v4.0.466)[​](#gopsize "Direct link to gopsize")

Set the maximum number of frames between two keyframes. This maps to FFmpeg's `-g` option. Default: Let the encoder decide.

### `colorSpace?`[​](#colorspace "Direct link to colorspace")

Color space to use for the video. Acceptable values: `"default"`(default since 5.0), `"bt601"` (same as `"default"`, since v4.0.424), `"bt709"` (since v4.0.28), `"bt2020-ncl"` (since v4.0.88), `"bt2020-cl"` (since v4.0.88), .  
For best color accuracy, it is recommended to also use `"png"` as the image format to have accurate color transformations throughout.  
Only since v4.0.83, colorspace conversion is actually performed, previously it would only tag the metadata of the video.

### `jpegQuality?`[​](#jpegquality "Direct link to jpegquality")

Sets the quality of the generated JPEG images. Must be an integer between 0 and 100. Default: 80.

### `forSeamlessAacConcatenation?`[​](#forseamlessaacconcatenation "Direct link to forseamlessaacconcatenation")

If enabled, the audio is trimmed to the nearest AAC frame, which is required for seamless concatenation of AAC files. This is a requirement if you later want to combine multiple video snippets seamlessly.  
  
 This option is used internally. There is currently no documentation yet for to concatenate the audio chunks.

### `separateAudioTo?`[​](#separateaudioto "Direct link to separateaudioto")

If set, the audio will not be included in the main output but rendered as a separate file at the location you pass. It is recommended to use an absolute path. If a relative path is passed, it is relative to the Remotion Root.

### `hardwareAcceleration?`[​](#hardwareacceleration "Direct link to hardwareacceleration")

One of
"disable", "if-possible", or "required"
. Default "disable". Encode using a hardware-accelerated encoder if
available. If set to "required" and no hardware-accelerated encoder is
available, then the render will fail.

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

*function* [`RenderMediaOnVercelProgress`](/docs/vercel/types#rendermediaonvercelprogress "You can import the TypeScript type `RenderMediaOnVercelProgress` from @remotion/vercel")

A callback that receives progress updates. Every variant includes `overallProgress` (0–1).

```tsx
const onProgress = async (update: RenderMediaOnVercelProgress) => {
  console.log(`Overall: ${Math.round(update.overallProgress * 100)}%`);
  if (update.stage === 'render-progress') {
    console.log(`Rendering: ${Math.round(update.progress.progress * 100)}%`);
  }
};Copy
```

## Return value[​](#return-value "Direct link to Return value")

When [`detached`](#detached) is unset or `false`, an object containing:

### `sandboxFilePath`[​](#sandboxfilepath "Direct link to sandboxfilepath")

The path to the rendered video inside the sandbox.

### `contentType`[​](#contenttype "Direct link to contenttype")

The MIME type of the rendered output (e.g. `"video/mp4"`, `"video/webm"`, `"image/gif"`).

When [`detached`](#detached) is `true`, an object containing:

### `sandboxId`[​](#sandboxid "Direct link to sandboxid")

The ID of the sandbox that is rendering the video.

### `cmdId`[​](#cmdid "Direct link to cmdid")

The ID of the command that is rendering the video.

### `outputFile`[​](#outputfile-1 "Direct link to outputfile-1")

The path to the rendered video inside the sandbox.

## See also[​](#see-also "Direct link to See also")

- [`renderStillOnVercel()`](/docs/vercel/render-still-on-vercel)
- [`getRenderProgress()`](/docs/vercel/get-render-progress)
- [`uploadToVercelBlob()`](/docs/vercel/upload-to-vercel-blob)
- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/vercel/src/render-media-on-vercel.ts)
