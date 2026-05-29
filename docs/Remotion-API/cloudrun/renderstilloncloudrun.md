---
title: "renderStillOnCloudrun()"
source: https://www.remotion.dev/docs/cloudrun/renderstilloncloudrun
---

# renderStillOnCloudrun()

EXPERIMENTAL

Cloud Run is in [Alpha status and not actively being developed.](/docs/cloudrun/status)

Kicks off a still rendering process on Remotion Cloud Run.

Requires a [service](/docs/cloudrun/deployservice) to already be deployed to execute the render.  
A [site](/docs/cloudrun/deploysite) or a [Serve URL](/docs/terminology/serve-url) needs to be specified to determine what will be rendered.

## Example[​](#example "Direct link to Example")

```tsx
import {renderStillOnCloudrun} from '@remotion/cloudrun/client';

const result = await renderStillOnCloudrun({
  region: 'us-east1',
  serviceName: 'remotion-render-bds9aab',
  composition: 'MyStill',
  imageFormat: 'png',
  serveUrl: 'https://storage.googleapis.com/remotioncloudrun-123asd321/sites/abcdefgh',
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

### `metadata?`[v4.0.216](https://github.com/remotion-dev/remotion/releases/v4.0.216)[​](#metadata "Direct link to metadata")

An object containing metadata to be embedded in the video. See [here](/docs/metadata) for which metadata is accepted.

### `region`[​](#region "Direct link to region")

In which [GCP region](/docs/cloudrun/region-selection) your Cloud Run service is deployed. It's highly recommended that your Remotion site is also in the same region.

### `serveUrl`[​](#serveurl "Direct link to serveurl")

A URL pointing to a Remotion project. Use [`deploySite()`](/docs/cloudrun/deploysite) to deploy a Remotion project.

### `composition`[​](#composition "Direct link to composition")

The `id` of the [composition](/docs/composition) you want to render.

### `inputProps?`[​](#inputprops "Direct link to inputprops")

[Input Props to pass to the selected composition of your video.](/docs/passing-props#passing-input-props-in-the-cli).  
Must be a JSON object.  
From the root component the props can be read using [`getInputProps()`](/docs/get-input-props).  
You may transform input props using [`calculateMetadata()`](/docs/calculate-metadata).

### `privacy?`[​](#privacy "Direct link to privacy")

One of:

- `"public"` (*default*): The rendered still is publicly accessible under the Cloud Storage URL.
- `"private"`: The rendered still is not publicly available, but is available within the GCP project to those with the correct permissions.

### `downloadBehavior?`[v4.0.176](https://github.com/remotion-dev/remotion/releases/v4.0.176)[​](#downloadbehavior "Direct link to downloadbehavior")

How the output file should behave when accessed through the Cloud Storage output link in the browser.

- `{"type": "play-in-browser"}` - the default. The video will play in the browser.
- `{"type": "download", fileName: null}` or `{"type": "download", fileName: "download.mp4"}` - a `Content-Disposition` header will be added which makes the browser download the file. You can optionally override the filename.

### `forceBucketName?`[​](#forcebucketname "Direct link to forcebucketname")

Specify a specific bucket name to be used for the output. The resulting Google Cloud Storage URL will be in the format `gs://{bucket-name}/renders/{render-id}/{file-name}`. If not set, Remotion will choose the right bucket to use based on the region.

### `jpegQuality?`[​](#jpegquality "Direct link to jpegquality")

See [`renderStill() -> jpegQuality`](/docs/renderer/render-still#jpegquality).

### `imageFormat?`[​](#imageformat "Direct link to imageformat")

See [`renderStill() -> imageFormat`](/docs/renderer/render-still#imageformat).

### `scale?`[​](#scale "Direct link to scale")

Scales the output dimensions by a factor. For example, a 1280x720px frame will become a 1920x1080px frame with a scale factor of `1.5`. See [Scaling](https://www.remotion.dev/docs/scaling) for more details.

### `envVariables?`[​](#envvariables "Direct link to envvariables")

See [`renderStill() -> envVariables`](/docs/renderer/render-still#envvariables).

### `frame?`[​](#frame "Direct link to frame")

Which frame of the composition should be rendered. Frames are zero-indexed, and negative values are allowed, with -1 being the last frame.

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

The file name of the still output.

It can either be:

- `undefined` - it will default to `out` plus the appropriate file extension, for example: `renders/${renderId}/out.mp4`.
- A `string` - it will get saved to the same Cloud Storage bucket as your site under the key `renders/{renderId}/{outName}`. Make sure to include the file extension at the end of the string.

### `delayRenderTimeoutInMilliseconds?`[​](#delayrendertimeoutinmilliseconds "Direct link to delayrendertimeoutinmilliseconds")

A number describing how long the render may take to resolve all [`delayRender()`](/docs/delay-render) calls [before it times out](/docs/timeout). Default: `30000`

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

## Return value[​](#return-value "Direct link to Return value")

Returns a promise resolving to an object containing the following:

### `renderId`[​](#renderid "Direct link to renderid")

A unique alphanumeric identifier for this render. Useful for obtaining status and finding the relevant files in the Cloud Storage bucket.

### `bucketName`[​](#bucketname "Direct link to bucketname")

The Cloud Storage bucket name in which all files are being saved.

### `privacy`[​](#privacy-1 "Direct link to privacy-1")

Privacy of the output file, either:

- "public-read" - Publicly accessible under the Cloud Storage URL.
- "project-private" - Not publicly available, but is available within the GCP project to those with the correct permissions.

### `publicUrl`[​](#publicurl "Direct link to publicurl")

If the privacy is set to public, this will be the publicly accessible URL of the rendered file. If the privacy is not public, this will be null.

### `cloudStorageUri`[​](#cloudstorageuri "Direct link to cloudstorageuri")

Google Storage path, beginning with `gs://{bucket-name}`. Can be used with the [gsutil](https://cloud.google.com/storage/docs/gsutil) CLI tool.

### `size`[​](#size "Direct link to size")

Size of the rendered still in KB.

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/cloudrun/src/api/render-still-on-cloudrun.ts)
