---
title: "renderMediaOnLambda()"
source: https://www.remotion.dev/docs/lambda/rendermediaonlambda
---

# renderMediaOnLambda()

Kicks off a render process on Remotion Lambda. The progress can be tracked using [getRenderProgress()](/docs/lambda/getrenderprogress).

Requires a [function](/docs/lambda/deployfunction) to already be deployed to execute the render.  
A [site](/docs/lambda/deploysite) or a [Serve URL](/docs/terminology/serve-url) needs to be specified to determine what will be rendered.

## Example[​](#example "Direct link to Example")

```tsx
import {renderMediaOnLambda} from '@remotion/lambda/client';

const {bucketName, renderId} = await renderMediaOnLambda({
  region: 'us-east-1',
  functionName: 'remotion-render-bds9aab',
  composition: 'MyVideo',
  serveUrl: 'https://remotionlambda-qg35eyp1s1.s3.eu-central-1.amazonaws.com/sites/bf2jrbfkw',
  codec: 'h264',
});Copy
```

note

Preferrably import this function from `@remotion/lambda/client` to avoid problems [inside serverless functions](/docs/lambda/light-client).

## Arguments[​](#arguments "Direct link to Arguments")

An object with the following properties:

### `region`[​](#region "Direct link to region")

In which region your Lambda function is deployed. It's highly recommended that your Remotion site is also in the same region.

### `privacy?`[​](#privacy "Direct link to privacy")

Optional since [v3.2.27](https://github.com/remotion-dev/remotion/releases/v3.2.27).

One of:

- `"public"` (*default*): The rendered media is publicly accessible under the S3 URL.
- `"private"`: The rendered media is not publicly available, but signed links can be created using [presignUrl()](/docs/lambda/presignurl).
- `"no-acl"` (*available from v.3.1.7*): The ACL option is not being set at all, this option is useful if you are writing to another bucket that does not support ACL using [`outName`](#outname).

### `functionName`[​](#functionname "Direct link to functionname")

The name of the deployed Lambda function.
Use [`deployFunction()`](/docs/lambda/deployfunction) to create a new function and [`getFunctions()`](/docs/lambda/getfunctions) to obtain currently deployed Lambdas.

### `framesPerLambda?`[​](#framesperlambda "Direct link to framesperlambda")

The video rendering process gets distributed across multiple Lambda functions. This setting controls how many frames are rendered per Lambda invocation. The lower the number you pass, the more Lambdas get spawned.

Default value: [Dependant on video length](/docs/lambda/concurrency)  
Minimum value: `4`

note

The `framesPerLambda` parameter cannot result in more than 200 functions being spawned. See: [Concurrency](/docs/lambda/concurrency)

### `concurrency?`[v4.0.322](https://github.com/remotion-dev/remotion/releases/v4.0.322)[​](#concurrency "Direct link to concurrency")

Specify the number of Lambda functions to use for rendering. This is an alternative to `framesPerLambda` that allows you to set the concurrency directly without needing to know the video duration.

The concurrency is defined as `frameCount / framesPerLambda`. Remotion will automatically calculate the appropriate `framesPerLambda` value based on your concurrency setting.

Maximum value: 200  
Minimum value: Depends on video length (must result in `framesPerLambda >= 4`)

note

Cannot be used together with `framesPerLambda`. Use only one of them.

### `frameRange?`[​](#framerange "Direct link to framerange")

Specify a single frame (passing a `number`) or a range of frames (passing a tuple `[number, number]`) to render a subset of a video. Example: `[0, 9]` to select the first 10 frames. By passing `null` (default) all frames of a composition get rendered. Pass `[number, null]` to render from a frame to the end of the composition.[v4.0.421](https://github.com/remotion-dev/remotion/releases/v4.0.421) To render a still, use [`renderStillOnLambda()`](/docs/lambda/renderstillonlambda).

### `serveUrl`[​](#serveurl "Direct link to serveurl")

A URL pointing to a Remotion project. Use [`deploySite()`](/docs/lambda/deploysite) to deploy a Remotion project.

### `composition`[​](#composition "Direct link to composition")

The `id` of the [composition](/docs/composition) you want to render.

### `metadata?`[v4.0.216](https://github.com/remotion-dev/remotion/releases/v4.0.216)[​](#metadata "Direct link to metadata")

An object containing metadata to be embedded in the video. See [here](/docs/metadata) for which metadata is accepted.

### `inputProps?`[​](#inputprops "Direct link to inputprops")

Optional since [v3.2.27](https://github.com/remotion-dev/remotion/releases/v3.2.27).

[Input Props to pass to the selected composition of your video.](/docs/passing-props#passing-input-props-in-the-cli).  
Must be a JSON object.  
From the root component the props can be read using [`getInputProps()`](/docs/get-input-props).  
You may transform input props using [`calculateMetadata()`](/docs/calculate-metadata).

### `codec`[​](#codec "Direct link to codec")

Which codec should be used to encode the video.

Video codecs `h264`, `h265`, `vp8`, `vp9`, `gif` and `prores` are supported.

Audio codecs `mp3`, `aac` and `wav` are also supported.

`av1` is not available on Lambda due to function size constraints.

The option `h264-mkv` has been renamed to just `h264` since `v3.3.34`. Use `h264` to get the same behavior.

See also [`renderMedia() -> codec`](/docs/renderer/render-media#codec).

### `audioCodec?`[v3.3.41](https://github.com/remotion-dev/remotion/releases/v3.3.41)[​](#audiocodec "Direct link to audiocodec")

Choose the encoding of your audio.

- Each Lambda chunk might actually choose an uncompressed codec and convert it in the final encoding stage to prevent audio artifacts.
- The default is dependent on the chosen `codec`.
- Choose `pcm-16` if you need uncompressed audio.
- Not all video containers support all audio codecs.
- This option takes precedence if the `codec` option also specifies an audio codec.

Refer to the [Encoding guide](/docs/encoding/#audio-codec) to see defaults and supported combinations.

### `forceHeight?`[v3.2.40](https://github.com/remotion-dev/remotion/releases/v3.2.40)[​](#forceheight "Direct link to forceheight")

Overrides default composition height.

### `forceWidth?`[v3.2.40](https://github.com/remotion-dev/remotion/releases/v3.2.40)[​](#forcewidth "Direct link to forcewidth")

Overrides default composition width.

### `forceFps?`[v4.0.424](https://github.com/remotion-dev/remotion/releases/v4.0.424)[​](#forcefps "Direct link to forcefps")

Overrides the default composition FPS.

### `forceDurationInFrames?`[v4.0.424](https://github.com/remotion-dev/remotion/releases/v4.0.424)[​](#forcedurationinframes "Direct link to forcedurationinframes")

Overrides the default composition duration in frames.

### `muted?`[​](#muted "Direct link to muted")

Disables audio output. See also [`renderMedia() -> muted`](/docs/renderer/render-media#muted).

### `sampleRate?`[v4.0.448](https://github.com/remotion-dev/remotion/releases/v4.0.448)[​](#samplerate "Direct link to samplerate")

Controls the sample rate of the output audio. The default is `48000` Hz. Match this to your source audio to avoid resampling artifacts.

### `imageFormat?`[​](#imageformat "Direct link to imageformat")

Optional since [v3.2.27](https://github.com/remotion-dev/remotion/releases/v3.2.27).

See [`renderMedia() -> imageFormat`](/docs/renderer/render-media#imageformat).

### `crf?`[​](#crf "Direct link to crf")

See [`renderMedia() -> crf`](/docs/renderer/render-media#crf).

### `envVariables?`[​](#envvariables "Direct link to envvariables")

See [`renderMedia() -> envVariables`](/docs/renderer/render-media#envvariables).

### `pixelFormat?`[​](#pixelformat "Direct link to pixelformat")

See [`renderMedia() -> pixelFormat`](/docs/renderer/render-media#pixelformat).

### `proResProfile?`[​](#proresprofile "Direct link to proresprofile")

See [`renderMedia() -> proResProfile`](/docs/renderer/render-media#proresprofile).

### `x264Preset?`[​](#x264preset "Direct link to x264preset")

Sets a x264 preset profile. Only applies to videos rendered with `h264` codec.  
Possible values: `superfast`, `veryfast`, `faster`, `fast`, `medium`, `slow`, `slower`, `veryslow`, `placebo`.  
Default: `medium`

### `gopSize?`[v4.0.466](https://github.com/remotion-dev/remotion/releases/v4.0.466)[​](#gopsize "Direct link to gopsize")

Set the maximum number of frames between two keyframes. This maps to FFmpeg's `-g` option. Default: Let the encoder decide.

On Lambda, this sets the maximum GOP size per chunk. Additional keyframes will appear at chunk boundaries, every `framesPerLambda` frames.

### `jpegQuality?`[​](#jpegquality "Direct link to jpegquality")

See [`renderMedia() -> jpegQuality`](/docs/renderer/render-media#jpegquality).

### ~~`quality`~~[​](#quality "Direct link to quality")

Renamed to `jpegQuality` in v4.0.0.

### `audioBitrate?`[​](#audiobitrate "Direct link to audiobitrate")

Specify the target bitrate for the generated video. The syntax for FFmpeg's `-b:a` parameter should be used. FFmpeg may encode the video in a way that will not result in the exact audio bitrate specified. Example values: `512K` for 512 kbps, `1M` for 1 Mbps. Default: `320k`

### `videoBitrate?`[​](#videobitrate "Direct link to videobitrate")

Specify the target bitrate for the generated video. The syntax for FFmpeg's`-b:v` parameter should be used. FFmpeg may encode the video in a way that will not result in the exact video bitrate specified. Example values: `512K` for 512 kbps, `1M` for 1 Mbps.

### `bufferSize?`[v4.0.78](https://github.com/remotion-dev/remotion/releases/v4.0.78)[​](#buffersize "Direct link to buffersize")

The value for the `-bufsize` flag of FFmpeg. Should be used in conjunction with the encoding max rate flag.

### `maxRate?`[v4.0.78](https://github.com/remotion-dev/remotion/releases/v4.0.78)[​](#maxrate "Direct link to maxrate")

The value for the `-maxrate` flag of FFmpeg. Should be used in conjunction with the encoding buffer size flag.

### `maxRetries?`[​](#maxretries "Direct link to maxretries")

Optional since [v3.2.27](https://github.com/remotion-dev/remotion/releases/v3.2.27). Default: `1`.

How often a chunk may be retried to render in case the render fails.
If a rendering of a chunk is failed, the error will be reported in the [`getRenderProgress()`](/docs/lambda/getrenderprogress) object and retried up to as many times as you specify using this option.

note

A retry only gets executed if a the error is in the [list of flaky errors](https://github.com/remotion-dev/remotion/blob/main/packages/lambda-client/src/is-flaky-error.ts).

### `scale?`[​](#scale "Direct link to scale")

Scales the output dimensions by a factor. For example, a 1280x720px frame will become a 1920x1080px frame with a scale factor of `1.5`. See [Scaling](https://www.remotion.dev/docs/scaling) for more details.

### `outName?`[​](#outname "Direct link to outname")

The file name of the media output.

It can either be:

- `undefined` - it will default to `out` plus the appropriate file extension, for example: `renders/${renderId}/out.mp4`.
- A `string` - it will get saved to the same S3 bucket as your site under the key `renders/{renderId}/{outName}`. Make sure to include the file extension at the end of the string.
- An object if you want to render to a different bucket or cloud provider - [see here for detailed instructions](/docs/lambda/custom-destination).

### `timeoutInMilliseconds?`[​](#timeoutinmilliseconds "Direct link to timeoutinmilliseconds")

A number describing how long the render may take to resolve all [`delayRender()`](/docs/delay-render) calls [before it times out](/docs/timeout). Default: `30000`

### `concurrencyPerLambda?`[v3.0.30](https://github.com/remotion-dev/remotion/releases/v3.0.30)[​](#concurrencyperlambda "Direct link to concurrencyperlambda")

By default, each Lambda function renders with concurrency 1 (one open browser tab). You may use the option to customize this value.

### `everyNthFrame?`[v3.1](https://github.com/remotion-dev/remotion/releases/v3.1)[​](#everynthframe "Direct link to everynthframe")

Renders only every nth frame. For example only every second frame, every third frame and so on. Only works for rendering GIFs. [See here for more details.](/docs/render-as-gif)

### `numberOfGifLoops?`[v3.1](https://github.com/remotion-dev/remotion/releases/v3.1)[​](#numberofgifloops "Direct link to numberofgifloops")

Allows you to set the number of loops as follows:

- `null` (or omitting in the CLI) plays the GIF indefinitely.- `0` disables looping- `1` loops the GIF once (plays twice in total)- `2` loops the GIF twice (plays three times in total) and so on.

### `downloadBehavior?`[v3.1.5](https://github.com/remotion-dev/remotion/releases/v3.1.5)[​](#downloadbehavior "Direct link to downloadbehavior")

How the output file should behave when accessed through the S3 output link in the browser.  
Either:

- `{"type": "play-in-browser"}` - the default. The video will play in the browser.
- `{"type": "download", fileName: null}` or `{"type": "download", fileName: "download.mp4"}` - a `Content-Disposition` header will be added which makes the browser download the file. You can optionally override the filename.

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

### `overwrite?`[v3.2.25](https://github.com/remotion-dev/remotion/releases/v3.2.25)[​](#overwrite "Direct link to overwrite")

If a custom out name is specified and a file already exists at this key in the S3 bucket, decide whether the file should be overwritten. Default `false`.  
If the file exists and `overwrite` is `false`, an error will be thrown.

### `rendererFunctionName?`[v3.3.38](https://github.com/remotion-dev/remotion/releases/v3.3.38)[​](#rendererfunctionname "Direct link to rendererfunctionname")

If specified, this function will be used for rendering the individual chunks. This is useful if you want to use a function with higher or lower power for rendering the chunks than the main orchestration function.

If you want to use this option, the function must be in the same region, the same account and have the same version as the main function.

### `webhook?`[v3.2.30](https://github.com/remotion-dev/remotion/releases/v3.2.30)[​](#webhook "Direct link to webhook")

If specified, Remotion will send a POST request to the provided endpoint to notify your application when the Lambda rendering process finishes, errors out or times out.

```tsx
import {RenderMediaOnLambdaInput} from '@remotion/lambda';

const webhook: RenderMediaOnLambdaInput['webhook'] = {
  url: 'https://mapsnap.app/api/webhook',
  secret: process.env.WEBHOOK_SECRET as string,
  // Optionally pass up to 1024 bytes of custom data
  customData: {
    id: 42,
  },
};Copy
```

If you don't want to set up validation, you can set `secret` to null:

```tsx
import {RenderMediaOnLambdaInput} from '@remotion/lambda';

const webhook: RenderMediaOnLambdaInput['webhook'] = {
  url: 'https://mapsnap.app/api/webhook',
  secret: null,
};Copy
```

[See here for detailed instructions on how to set up your webhook](/docs/lambda/webhooks).

### `forceBucketName?`[v3.3.42](https://github.com/remotion-dev/remotion/releases/v3.3.42)[​](#forcebucketname "Direct link to forcebucketname")

Specify a specific bucket name to be used. [This is not recommended](/docs/lambda/multiple-buckets), instead let Remotion discover the right bucket automatically.

### `logLevel?`[​](#loglevel "Direct link to loglevel")

One of `trace`, `verbose`, `info`, `warn`, `error`.  
 Determines how much info is being logged to the console.  
  
 Default `info`.

If the `logLevel` is set to `verbose`, the Lambda function will not clean up artifacts, to aid debugging. Do not use it unless you are debugging a problem.

### `mediaCacheSizeInBytes?`[v4.0.352](https://github.com/remotion-dev/remotion/releases/v4.0.352)[​](#mediacachesizeinbytes "Direct link to mediacachesizeinbytes")

Specify the maximum size of the cache that `<Video>` and `<Audio>` from `@remotion/media` may use combined, in bytes.   
The default is half of the available system memory when the render starts.

### `offthreadVideoCacheSizeInBytes?`[v4.0.23](https://github.com/remotion-dev/remotion/releases/v4.0.23)[​](#offthreadvideocachesizeinbytes "Direct link to offthreadvideocachesizeinbytes")

From v4.0, Remotion has a cache for [`<OffthreadVideo>`](https://remotion.dev/docs/offthreadvideo) frames. The default is `null`, corresponding to half of the system memory available when the render starts.  
 This option allows to override the size of the cache. The higher it is, the faster the render will be, but the more memory will be used.  
The used value will be printed when running in verbose mode.  
Default: `null`

### `offthreadVideoThreads?`[v4.0.261](https://github.com/remotion-dev/remotion/releases/v4.0.261)[​](#offthreadvideothreads "Direct link to offthreadvideothreads")

The number of threads that[`<OffthreadVideo>`](https://remotion.dev/docs/offthreadvideo) can start to extract frames. The default is 2. Increase carefully, as too many threads may cause instability.

### `colorSpace?`[v4.0.28](https://github.com/remotion-dev/remotion/releases/v4.0.28)[​](#colorspace "Direct link to colorspace")

Color space to use for the video. Acceptable values: `"default"`(default since 5.0), `"bt601"` (same as `"default"`, since v4.0.424), `"bt709"` (since v4.0.28), `"bt2020-ncl"` (since v4.0.88), `"bt2020-cl"` (since v4.0.88), .  
For best color accuracy, it is recommended to also use `"png"` as the image format to have accurate color transformations throughout.  
Only since v4.0.83, colorspace conversion is actually performed, previously it would only tag the metadata of the video.

### `deleteAfter?`[v4.0.32](https://github.com/remotion-dev/remotion/releases/v4.0.32)[​](#deleteafter "Direct link to deleteafter")

Automatically delete the render after a certain period. Accepted values are `1-day`, `3-days`, `7-days` and `30-days`.  
 For this to work, your bucket needs to have [lifecycles enabled](/docs/lambda/autodelete).

### `preferLossless?`[v4.0.123](https://github.com/remotion-dev/remotion/releases/v4.0.123)[​](#preferlossless "Direct link to preferlossless")

Uses a lossless audio codec, if one is available for the codec. If you set`audioCodec`, it takes priority over `preferLossless`.

### `forcePathStyle?`[v4.0.202](https://github.com/remotion-dev/remotion/releases/v4.0.202)[​](#forcepathstyle "Direct link to forcepathstyle")

Passes `forcePathStyle` to the AWS S3 client. If you don't know what this is, you probably don't need it.

### `storageClass?`[v4.0.305](https://github.com/remotion-dev/remotion/releases/v4.0.305)[​](#storageclass "Direct link to storageclass")

An [identifier](https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html#sc-compare) for the S3 storage class of the rendered media. Default: `undefined` (which is `STANDARD`).

### `licenseKey?`[v4.0.409](https://github.com/remotion-dev/remotion/releases/v4.0.409)[​](#licensekey "Direct link to licensekey")

License key for sending a usage event using `@remotion/licensing`.

### `isProduction?`[v4.0.409](https://github.com/remotion-dev/remotion/releases/v4.0.409)[​](#isproduction "Direct link to isproduction")

*default `true`*

Pass `false` if this a development render to not count it as a billable render on remotion.pro. Only can be used in conjuction with `licenseKey`.

### ~~`apiKey?`[v4.0.253](https://github.com/remotion-dev/remotion/releases/v4.0.253)~~[​](#apikey "Direct link to apikey")

*deprecated in v4.0.409*

API key for sending a usage event using `@remotion/licensing`.

### ~~`dumpBrowserLogs?`~~[​](#dumpbrowserlogs "Direct link to dumpbrowserlogs")

Deprecated in v4.0 in favor of [`logLevel`](#loglevel).

## Return value[​](#return-value "Direct link to Return value")

Returns a promise resolving to an object containing four properties. Of these, `renderId`, `bucketName` are useful for passing to `getRenderProgress()`.

### `renderId`[​](#renderid "Direct link to renderid")

A unique alphanumeric identifier for this render. Useful for obtaining status and finding the relevant files in the S3 bucket.

### `bucketName`[​](#bucketname "Direct link to bucketname")

The S3 bucket name in which all files are being saved.

### `cloudWatchLogs`[v3.2.10](https://github.com/remotion-dev/remotion/releases/v3.2.10)[​](#cloudwatchlogs "Direct link to cloudwatchlogs")

A link to CloudWatch (if you haven't disabled it) that you can visit to see the logs for the render.

### `lambdaInsightsUrl`[v4.0.61](https://github.com/remotion-dev/remotion/releases/v4.0.61)[​](#lambdainsightsurl "Direct link to lambdainsightsurl")

A link to the [Lambda Insights](/docs/lambda/insights), if you enabled it.

### `folderInS3Console`[v3.2.43](https://github.com/remotion-dev/remotion/releases/v3.2.43)[​](#folderins3console "Direct link to folderins3console")

A link to the folder in the AWS console where each chunk and render is located.

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/lambda-client/src/render-media-on-lambda.ts)
- [getRenderProgress()](/docs/lambda/getrenderprogress)
