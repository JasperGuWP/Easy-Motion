---
title: "renderMediaOnCloudrun()"
source: https://www.remotion.dev/docs/cloudrun/rendermediaoncloudrun
---

# renderMediaOnCloudrun()

EXPERIMENTAL

Cloud Run is in [Alpha status and not actively being developed.](/docs/cloudrun/status)

Kicks off a media rendering process on Remotion Cloud Run.

Requires a [service](/docs/cloudrun/deployservice) to already be deployed to execute the render.  
A [site](/docs/cloudrun/deploysite) or a [Serve URL](/docs/terminology/serve-url) needs to be specified to determine what will be rendered.

## Example[​](#example "Direct link to Example")

```tsx
import {renderMediaOnCloudrun} from '@remotion/cloudrun/client';

const result = await renderMediaOnCloudrun({
  region: 'us-east1',
  serviceName: 'remotion-render-bds9aab',
  composition: 'MyVideo',
  serveUrl: 'https://storage.googleapis.com/remotioncloudrun-123asd321/sites/abcdefgh',
  codec: 'h264',
});

if (result.type === 'success') {
  console.log(result.bucketName);
  console.log(result.renderId);
}Copy
```

note

Import from [`@remotion/cloudrun/client`](/docs/cloudrun/light-client) to not load the whole renderer, which cannot be bundled.

## Arguments[​](#arguments "Direct link to Arguments")

An object with the following properties:

### `cloudRunUrl?`[​](#cloudrunurl "Direct link to cloudrunurl")

Required if `serviceName` not supplied. The url of the Cloud Run service which should be used to perform the render. You must set either `cloudRunUrl` or `serviceName`, but not both.

### `serviceName?`[​](#servicename "Direct link to servicename")

Required if `cloudRunUrl` not supplied. The name of the Cloud Run service which should be used to perform the render. This is used in conjunction with the region to determine the service endpoint, as the same service name can exist across multiple regions.

### `region`[​](#region "Direct link to region")

In which [GCP region](/docs/cloudrun/region-selection) your Cloud Run service is deployed. It's highly recommended that your Remotion site is also in the same region.

### `serveUrl`[​](#serveurl "Direct link to serveurl")

A URL pointing to a Remotion project. Use [`deploySite()`](/docs/cloudrun/deploysite) to deploy a Remotion project.

### `composition`[​](#composition "Direct link to composition")

The `id` of the [composition](/docs/composition) you want to render.

### `codec`[​](#codec "Direct link to codec")

Which codec should be used to encode the video.

Video codecs `h264`, `vp8` and `prores` are supported.

Audio codecs `mp3`, `aac` and `wav` are also supported.

See also [`renderMedia() -> codec`](/docs/renderer/render-media#codec).

### `metadata?`[v4.0.216](https://github.com/remotion-dev/remotion/releases/v4.0.216)[​](#metadata "Direct link to metadata")

An object containing metadata to be embedded in the video. See [here](/docs/metadata) for which metadata is accepted.

### `inputProps?`[​](#inputprops "Direct link to inputprops")

[Input Props to pass to the selected composition of your video.](/docs/passing-props#passing-input-props-in-the-cli).  
Must be a JSON object.  
From the root component the props can be read using [`getInputProps()`](/docs/get-input-props).  
You may transform input props using [`calculateMetadata()`](/docs/calculate-metadata).

### `privacy?`[​](#privacy "Direct link to privacy")

One of:

- `"public"` (*default*): The rendered media is publicly accessible under the Cloud Storage URL.
- `"private"`: The rendered media is not publicly available, but is available within the GCP project to those with the correct permissions.

### `forceBucketName?`[​](#forcebucketname "Direct link to forcebucketname")

Specify a specific bucket name to be used for the output. The resulting Google Cloud Storage URL will be in the format `gs://{bucket-name}/renders/{render-id}/{file-name}`. If not set, Remotion will choose the right bucket to use based on the region.

### `updateRenderProgress?`[​](#updaterenderprogress "Direct link to updaterenderprogress")

```tsx
import type {UpdateRenderProgress} from '@remotion/cloudrun/client';

const updateRenderProgress: UpdateRenderProgress = (progress: number, error: boolean) => {
  if (error) {
    console.error('Render failed');
  } else {
    console.log(`Render progress: ${progress * 100}%`);
  }
};Copy
```

### `renderStatusWebhook?`[​](#renderstatuswebhook "Direct link to renderstatuswebhook")

Your webhook URL that will be called with the progress of the render. This will be sent using a POST request.

#### Arguments[​](#arguments-1 "Direct link to Arguments")

- `url`: The webhook URL endpoint.
- `headers`: The headers to send. `Content-Type: application/json` is added automatically.
- `data`: The data that you want to be sent alongside the progress data.
- `webhookProgressInterval (optional)`: The interval at which the webhook is called. Defaults to 0.1 (10%). (min: 0.01, max: 1)

```tsx
Example Webhook URL Declaration

{
  "url": "https://example.com/webhook",
  "headers": {
    "Authorization": "Bearer 1234567890"
  },
  "data": {
    "projectId": "1234567890"
  },
  "webhookProgressInterval": 0.1
}Copy
```

#### Example Webhook Response[​](#example-webhook-response "Direct link to Example Webhook Response")

```tsx
Example Webhook Response

{
  "progress": 0.1,
  "renderedFrames": 100,
  "encodedFrames": 100,
  "renderId": "1234567890",
  "projectId": "1234567890"
}Copy
```

### `renderIdOverride?`[​](#renderidoverride "Direct link to renderidoverride")

Provide a specific render ID for the render. Otherwise a random one will be generated.

note

You will be responsible for ensuring that the render ID is unique, otherwise it will overwrite existing renders with the same configured Render ID.

### `audioCodec?`[​](#audiocodec "Direct link to audiocodec")

Choose the encoding of your audio.

- Choose `pcm-16` if you need uncompressed audio.
- Not all video containers support all audio codecs.
- This option takes precedence if the `codec` option also specifies an audio codec.

Refer to the [Encoding guide](/docs/encoding/#audio-codec) to see defaults and supported combinations.

### `jpegQuality?`[​](#jpegquality "Direct link to jpegquality")

See [`renderMedia() -> jpegQuality`](/docs/renderer/render-media#jpegquality).

### `audioBitrate?`[​](#audiobitrate "Direct link to audiobitrate")

Specify the target bitrate for the generated video. The syntax for FFmpeg's `-b:a` parameter should be used. FFmpeg may encode the video in a way that will not result in the exact audio bitrate specified. Example values: `512K` for 512 kbps, `1M` for 1 Mbps. Default: `320k`

### `videoBitrate?`[​](#videobitrate "Direct link to videobitrate")

Specify the target bitrate for the generated video. The syntax for FFmpeg's`-b:v` parameter should be used. FFmpeg may encode the video in a way that will not result in the exact video bitrate specified. Example values: `512K` for 512 kbps, `1M` for 1 Mbps.

### `bufferSize?`[v4.0.78](https://github.com/remotion-dev/remotion/releases/v4.0.78)[​](#buffersize "Direct link to buffersize")

The value for the `-bufsize` flag of FFmpeg. Should be used in conjunction with the encoding max rate flag.

### `maxRate?`[v4.0.78](https://github.com/remotion-dev/remotion/releases/v4.0.78)[​](#maxrate "Direct link to maxrate")

The value for the `-maxrate` flag of FFmpeg. Should be used in conjunction with the encoding buffer size flag.

### `proResProfile?`[​](#proresprofile "Direct link to proresprofile")

See [`renderMedia() -> proResProfile`](/docs/renderer/render-media#proresprofile).

### `x264Preset?`[​](#x264preset "Direct link to x264preset")

Sets a x264 preset profile. Only applies to videos rendered with `h264` codec.  
Possible values: `superfast`, `veryfast`, `faster`, `fast`, `medium`, `slow`, `slower`, `veryslow`, `placebo`.  
Default: `medium`

### `gopSize?`[v4.0.466](https://github.com/remotion-dev/remotion/releases/v4.0.466)[​](#gopsize "Direct link to gopsize")

Set the maximum number of frames between two keyframes. This maps to FFmpeg's `-g` option. Default: Let the encoder decide.

### `crf?`[​](#crf "Direct link to crf")

See [`renderMedia() -> crf`](/docs/renderer/render-media#crf).

### `pixelFormat?`[​](#pixelformat "Direct link to pixelformat")

See [`renderMedia() -> pixelFormat`](/docs/renderer/render-media#pixelformat).

### `imageFormat?`[​](#imageformat "Direct link to imageformat")

See [`renderMedia() -> imageFormat`](/docs/renderer/render-media#imageformat).

### `scale?`[​](#scale "Direct link to scale")

Scales the output dimensions by a factor. For example, a 1280x720px frame will become a 1920x1080px frame with a scale factor of `1.5`. See [Scaling](https://www.remotion.dev/docs/scaling) for more details.

### `everyNthFrame?`[​](#everynthframe "Direct link to everynthframe")

Renders only every nth frame. For example only every second frame, every third frame and so on. Only works for rendering GIFs. [See here for more details.](/docs/render-as-gif)

### `numberOfGifLoops?`[​](#numberofgifloops "Direct link to numberofgifloops")

Allows you to set the number of loops as follows:

- `null` (or omitting in the CLI) plays the GIF indefinitely.- `0` disables looping- `1` loops the GIF once (plays twice in total)- `2` loops the GIF twice (plays three times in total) and so on.

### `downloadBehavior?`[v4.0.176](https://github.com/remotion-dev/remotion/releases/v4.0.176)[​](#downloadbehavior "Direct link to downloadbehavior")

How the output file should behave when accessed through the Cloud Storage output link in the browser.

- `{"type": "play-in-browser"}` - the default. The video will play in the browser.
- `{"type": "download", fileName: null}` or `{"type": "download", fileName: "download.mp4"}` - a `Content-Disposition` header will be added which makes the browser download the file. You can optionally override the filename.

### `frameRange?`[​](#framerange "Direct link to framerange")

Specify a single frame (a number) or a range of frames (a tuple [number, number]) to be rendered. Pass `[number, null]` to render from a frame to the end of the composition.[v4.0.421](https://github.com/remotion-dev/remotion/releases/v4.0.421)

### `envVariables?`[​](#envvariables "Direct link to envvariables")

See [`renderMedia() -> envVariables`](/docs/renderer/render-media#envvariables).

### `chromiumOptions?`[​](#chromiumoptions "Direct link to chromiumoptions")

Allows you to set certain Chromium / Google Chrome flags. See: [Chromium flags](/docs/chromium-flags).

#### `disableWebSecurity`[​](#disablewebsecurity "Direct link to disablewebsecurity")

*boolean - default `false`*

This will most notably disable CORS among other security features.

#### `ignoreCertificateErrors`[​](#ignorecertificateerrors "Direct link to ignorecertificateerrors")

*boolean - default `false`*

Results in invalid SSL certificates, such as self-signed ones, being ignored.

#### `gl`[​](#gl "Direct link to gl")

Changelog

- From Remotion v2.6.7 until v3.0.7, the default for Remotion Lambda was `swiftshader`, but from v3.0.8 the default is `swangle` (Swiftshader on Angle) since Chrome 101 added support for it.- From Remotion v2.4.3 until v2.6.6, the default was `angle`, however it turns out to have a small memory leak that could crash long Remotion renders.

Select the OpenGL renderer backend for Chromium.   
Accepted values:

- `"angle"`- `"egl"`- `"swiftshader"`- `"swangle"`- `"vulkan"` (*from Remotion v4.0.41*)- `"angle-egl"` (*from Remotion v4.0.51*)

The default is `null`, letting Chrome decide, except on Lambda where the default is `"swangle"`

### `muted?`[​](#muted "Direct link to muted")

Disables audio output. See also [`renderMedia() -> muted`](/docs/renderer/render-media#muted).

### `sampleRate?`[v4.0.448](https://github.com/remotion-dev/remotion/releases/v4.0.448)[​](#samplerate "Direct link to samplerate")

Controls the sample rate of the output audio. The default is `48000` Hz. Match this to your source audio to avoid resampling artifacts.

### `forceWidth?`[​](#forcewidth "Direct link to forcewidth")

Overrides default composition width.

### `forceHeight?`[​](#forceheight "Direct link to forceheight")

Overrides default composition height.

### `forceFps?`[v4.0.424](https://github.com/remotion-dev/remotion/releases/v4.0.424)[​](#forcefps "Direct link to forcefps")

Overrides the default composition FPS.

### `forceDurationInFrames?`[v4.0.424](https://github.com/remotion-dev/remotion/releases/v4.0.424)[​](#forcedurationinframes "Direct link to forcedurationinframes")

Overrides the default composition duration in frames.

### `logLevel?`[​](#loglevel "Direct link to loglevel")

One of `trace`, `verbose`, `info`, `warn`, `error`.  
 Determines how much info is being logged to the console.  
  
 Default `info`.

### `outName?`[​](#outname "Direct link to outname")

The file name of the media output.

It can either be:

- `undefined` - it will default to `out` plus the appropriate file extension, for example: `renders/${renderId}/out.mp4`.
- A `string` - it will get saved to the same Cloud Storage bucket as your site under the key `renders/{renderId}/{outName}`. Make sure to include the file extension at the end of the string.

### `delayRenderTimeoutInMilliseconds?`[​](#delayrendertimeoutinmilliseconds "Direct link to delayrendertimeoutinmilliseconds")

A number describing how long the render may take to resolve all [`delayRender()`](/docs/delay-render) calls [before it times out](/docs/timeout). Default: `30000`

### `concurrency?`[​](#concurrency "Direct link to concurrency")

A number or a string describing how many browser tabs should be opened. Default "50%".

note

Before v4.0.76, this was "100%" by default. It is now aligned to the other server-side rendering APIs.

### `enforceAudioTrack?`[​](#enforceaudiotrack "Direct link to enforceaudiotrack")

Render a silent audio track if there wouldn't be any otherwise.

### `preferLossless?`[v4.0.123](https://github.com/remotion-dev/remotion/releases/v4.0.123)[​](#preferlossless "Direct link to preferlossless")

Uses a lossless audio codec, if one is available for the codec. If you set`audioCodec`, it takes priority over `preferLossless`.

### `mediaCacheSizeInBytes?`[v4.0.352](https://github.com/remotion-dev/remotion/releases/v4.0.352)[​](#mediacachesizeinbytes "Direct link to mediacachesizeinbytes")

Specify the maximum size of the cache that `<Video>` and `<Audio>` from `@remotion/media` may use combined, in bytes.   
The default is half of the available system memory when the render starts.

### `offthreadVideoCacheSizeInBytes?`[v4.0.23](https://github.com/remotion-dev/remotion/releases/v4.0.23)[​](#offthreadvideocachesizeinbytes "Direct link to offthreadvideocachesizeinbytes")

From v4.0, Remotion has a cache for [`<OffthreadVideo>`](https://remotion.dev/docs/offthreadvideo) frames. The default is `null`, corresponding to half of the system memory available when the render starts.  
 This option allows to override the size of the cache. The higher it is, the faster the render will be, but the more memory will be used.  
The used value will be printed when running in verbose mode.  
Default: `null`

### `offthreadVideoThreads`[v4.0.261](https://github.com/remotion-dev/remotion/releases/v4.0.261)[​](#offthreadvideothreads "Direct link to offthreadvideothreads")

The number of threads that[`<OffthreadVideo>`](https://remotion.dev/docs/offthreadvideo) can start to extract frames. The default is 2. Increase carefully, as too many threads may cause instability.

### `colorSpace?`[v4.0.28](https://github.com/remotion-dev/remotion/releases/v4.0.28)[​](#colorspace "Direct link to colorspace")

Color space to use for the video. Acceptable values: `"default"`(default since 5.0), `"bt601"` (same as `"default"`, since v4.0.424), `"bt709"` (since v4.0.28), `"bt2020-ncl"` (since v4.0.88), `"bt2020-cl"` (since v4.0.88), .  
For best color accuracy, it is recommended to also use `"png"` as the image format to have accurate color transformations throughout.  
Only since v4.0.83, colorspace conversion is actually performed, previously it would only tag the metadata of the video.

## Return value[​](#return-value "Direct link to Return value")

Returns a promise resolving to an object.

### `type`[​](#type "Direct link to type")

Use this to determine the structure of the response. It can either be:

- 'success' - render has been performed successfully.
- 'crash - Cloud Run service has crashed.

## Return when type === 'success'[​](#return-when-type--success "Direct link to Return when type === 'success'")

The resulting object contains the following:

### `type`[​](#type-1 "Direct link to type-1")

'success' - render has been performed successfully.

### `publicUrl?`[​](#publicurl "Direct link to publicurl")

The publicly accessible URL of the rendered file. Only available when the request had the [`privacy`](/docs/cloudrun/rendermediaoncloudrun#privacy) property set to 'public'.

### `renderId`[​](#renderid "Direct link to renderid")

A unique alphanumeric identifier for this render. Useful for obtaining status and finding the relevant files in the Cloud Storage bucket.

### `bucketName`[​](#bucketname "Direct link to bucketname")

The Cloud Storage bucket name in which all files are being saved.

### `privacy`[​](#privacy-1 "Direct link to privacy-1")

Privacy of the output file, either:

- "public-read" - Publicly accessible under the Cloud Storage URL.
- "project-private" - Not publicly available, but is available within the GCP project to those with the correct permissions.

### `publicUrl`[​](#publicurl-1 "Direct link to publicurl-1")

If the privacy is set to public, this will be the publicly accessible URL of the rendered file. If the privacy is not public, this will be null.

### `cloudStorageUri`[​](#cloudstorageuri "Direct link to cloudstorageuri")

Google Storage path, beginning with `gs://{bucket-name}`. Can be used with the [gsutil](https://cloud.google.com/storage/docs/gsutil) CLI tool.

### `size`[​](#size "Direct link to size")

Size of the rendered media in KB.

## Return when type === 'crash'[​](#return-when-type--crash "Direct link to Return when type === 'crash'")

The resulting object contains the following:

### `type`[​](#type-2 "Direct link to type-2")

'crash' - Cloud Run service has crashed without a response.

### `cloudRunEndpoint`[​](#cloudrunendpoint "Direct link to cloudrunendpoint")

Endpoint that was called when executing the render. Used by the CLI to parse the service name to determine timeout and memory limit of the service. This can then be used when analysing the logs, to provide a hint as to the reason of the crash.

### `message`[​](#message "Direct link to message")

'Service crashed without sending a response. Check the logs in GCP console.' This is used by the CLI for displaying an error message.

### `requestStartTime`[​](#requeststarttime "Direct link to requeststarttime")

datetime of when the request was made, in UTC format - "2020-01-01T00:00:00+02:00". Can be useful for filtering the logs of the service.

### `requestCrashTime`[​](#requestcrashtime "Direct link to requestcrashtime")

datetime of when the crash was detected, in UTC format - "2020-01-01T00:00:00+02:00". Can be useful for filtering the logs of the service.

### `requestElapsedTimeInSeconds`[​](#requestelapsedtimeinseconds "Direct link to requestelapsedtimeinseconds")

Seconds elapsed between the request start and crash time. Can be checked against the timeout limit to understand if this was the likely cause of the crash.

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/cloudrun/src/api/render-media-on-cloudrun.ts)
