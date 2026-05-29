---
title: "renderStillOnLambda()"
source: https://www.remotion.dev/docs/lambda/renderstillonlambda
---

# renderStillOnLambda()

Renders a still image inside a lambda function and writes it to the specified output location.

If you want to render a video or audio instead, use [`renderMediaOnLambda()`](/docs/lambda/rendermediaonlambda) instead.

If you want to render a still locally instead, use [`renderStill()`](/docs/renderer/render-still) instead.

## Example[​](#example "Direct link to Example")

```tsx
import {renderStillOnLambda} from '@remotion/lambda/client';

const {estimatedPrice, url, sizeInBytes} = await renderStillOnLambda({
  region: 'us-east-1',
  functionName: 'remotion-render-bds9aab',
  serveUrl: 'https://remotionlambda-qg35eyp1s1.s3.eu-central-1.amazonaws.com/sites/bf2jrbfkw',
  composition: 'MyVideo',
  inputProps: {},
  imageFormat: 'png',
  maxRetries: 1,
  privacy: 'public',
  envVariables: {},
  frame: 10,
});Copy
```

note

Preferrably import this function from `@remotion/lambda/client` to avoid problems [inside serverless functions](/docs/lambda/light-client).

## Arguments[​](#arguments "Direct link to Arguments")

An object with the following properties:

### `region`[​](#region "Direct link to region")

In which region your Lambda function is deployed. It's highly recommended that your Remotion site is also in the same region.

### `functionName`[​](#functionname "Direct link to functionname")

The name of the deployed Lambda function.
Use [`deployFunction()`](/docs/lambda/deployfunction) to create a new function and [`getFunctions()`](/docs/lambda/getfunctions) to obtain currently deployed Lambdas.

### `serveUrl`[​](#serveurl "Direct link to serveurl")

A URL pointing to a Remotion project. Use [`deploySite()`](/docs/lambda/deploysite) to deploy a Remotion project.

### `composition`[​](#composition "Direct link to composition")

The `id` of the [composition](/docs/composition) you want to render..

### `inputProps`[​](#inputprops "Direct link to inputprops")

[Input Props to pass to the selected composition of your video.](/docs/passing-props#passing-input-props-in-the-cli).  
Must be a JSON object.  
From the root component the props can be read using [`getInputProps()`](/docs/get-input-props).  
You may transform input props using [`calculateMetadata()`](/docs/calculate-metadata).

### `privacy`[​](#privacy "Direct link to privacy")

One of:

- `"public"` (*default*): The rendered still is publicly accessible under the S3 URL.
- `"private"`: The rendered still is not publicly available, but signed links can be created using [presignUrl()](/docs/lambda/presignurl).
- `"no-acl"` (*available from v.3.1.7*): The ACL option is not being set at all, this option is useful if you are writing to another bucket that does not support ACL using [`outName`](#outname).

### `frame?`[​](#frame "Direct link to frame")

Which frame of the composition should be rendered. Default: `0`. Frames are zero-indexed.

From v3.2.27, negative values are allowed, with `-1` being the last frame.

### `imageFormat?`[​](#imageformat "Direct link to imageformat")

See [`renderStill() -> imageFormat`](/docs/renderer/render-still#imageformat). Default: `"png"`.

`pdf` is not supported on Remotion Lambda due to function size constraints.

### `onInit?`[v4.0.6](https://github.com/remotion-dev/remotion/releases/v4.0.6)[​](#oninit "Direct link to oninit")

A callback function that gets called when the render starts, useful to obtain the link to the logs even if the render fails.

It receives an object with the following properties:

- `renderId`: The ID of the render.
- `cloudWatchLogs`: A link to the CloudWatch logs of the Lambda function, if you did not disable it.
- `lambdaInsightsUrl`[v4.0.61](https://github.com/remotion-dev/remotion/releases/v4.0.61): A link to the [Lambda insights](/docs/lambda/insights), if you enabled it.

Example usage:

```tsx
import {renderStillOnLambda, RenderStillOnLambdaInput} from '@remotion/lambda/client';

const otherParameters: RenderStillOnLambdaInput = {
  region: 'us-east-1',
  functionName: 'remotion-render-bds9aab',
  serveUrl: 'https://remotionlambda-qg35eyp1s1.s3.eu-central-1.amazonaws.com/sites/bf2jrbfkw',
  composition: 'MyVideo',
  inputProps: {},
  imageFormat: 'png',
  maxRetries: 1,
  privacy: 'public',
  envVariables: {},
  frame: 10,
};
await renderStillOnLambda({
  ...otherParameters,
  onInit: ({cloudWatchLogs, renderId, lambdaInsightsUrl}) => {
    console.log(console.log(`Render invoked with ID = ${renderId}`));
    console.log(`CloudWatch logs (if enabled): ${cloudWatchLogs}`);
    console.log(`Lambda Insights (if enabled): ${lambdaInsightsUrl}`);
  },
});Copy
```

### `jpegQuality?`[​](#jpegquality "Direct link to jpegquality")

Sets the quality of the generated JPEG images. Must be an integer between 0 and 100. Default is to leave it up to the browser, [current default is 80](https://github.com/chromium/chromium/blob/99314be8152e688bafbbf9a615536bdbb289ea87/headless/lib/browser/protocol/headless_handler.cc#L32).

Only applies if `imageFormat` is `"jpeg"`, otherwise this option is invalid.

### ~~`quality?`~~[​](#quality "Direct link to quality")

Renamed to `jpegQuality` in `v4.0.0`.

### `maxRetries?`[​](#maxretries "Direct link to maxretries")

How often a frame render may be retried until it fails. Default: `1`.

note

A retry only gets executed if a the error is in the [list of flaky errors](https://github.com/remotion-dev/remotion/blob/main/packages/lambda-client/src/is-flaky-error.ts).

### `envVariables?`[​](#envvariables "Direct link to envvariables")

See [`renderStill() -> envVariables`](/docs/renderer/render-still#envvariables). Default: `{}`.

### `forceHeight?`[v3.2.40](https://github.com/remotion-dev/remotion/releases/v3.2.40)[​](#forceheight "Direct link to forceheight")

Overrides the default composition height.

### `forceWidth?`[v3.2.40](https://github.com/remotion-dev/remotion/releases/v3.2.40)[​](#forcewidth "Direct link to forcewidth")

Overrides the default composition width.

### `forceFps?`[v4.0.424](https://github.com/remotion-dev/remotion/releases/v4.0.424)[​](#forcefps "Direct link to forcefps")

Overrides the default composition FPS.

### `forceDurationInFrames?`[v4.0.424](https://github.com/remotion-dev/remotion/releases/v4.0.424)[​](#forcedurationinframes "Direct link to forcedurationinframes")

Overrides the default composition duration in frames.

### `scale?`[​](#scale "Direct link to scale")

Scales the output dimensions by a factor. For example, a 1280x720px frame will become a 1920x1080px frame with a scale factor of `1.5`. See [Scaling](https://www.remotion.dev/docs/scaling) for more details.

### `outName?`[​](#outname "Direct link to outname")

It can either be:

- `undefined` - it will default to `out` plus the appropriate file extension, for example: `renders/${renderId}/out.mp4`.
- A `string` - it will get saved to the same S3 bucket as your site under the key `renders/{renderId}/{outName}`. Make sure to include the file extension at the end of the string.
- An object if you want to render to a different bucket or cloud provider - [see here for detailed instructions](/docs/lambda/custom-destination).

### `timeoutInMilliseconds?`[​](#timeoutinmilliseconds "Direct link to timeoutinmilliseconds")

A number describing how long the render may take to resolve all [`delayRender()`](/docs/delay-render) calls [before it times out](/docs/timeout). Default: `30000`

### `downloadBehavior?`[v3.1.5](https://github.com/remotion-dev/remotion/releases/v3.1.5)[​](#downloadbehavior "Direct link to downloadbehavior")

How the output file should behave when accessed through the S3 output link in the browser.  
Either:

- `{"type": "play-in-browser"}` - the default. The video will play in the browser.
- `{"type": "download", fileName: null}` or `{"type": "download", fileName: "download.mp4"}` - a `Content-Disposition` header will be added which makes the browser download the file. You can optionally override the filename.

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

### `deleteAfter?`[v4.0.32](https://github.com/remotion-dev/remotion/releases/v4.0.32)[​](#deleteafter "Direct link to deleteafter")

Automatically delete the render after a certain period. Accepted values are `1-day`, `3-days`, `7-days` and `30-days`.  
 For this to work, your bucket needs to have [lifecycles enabled](/docs/lambda/autodelete).

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

#### `userAgent`[v3.3.83](https://github.com/remotion-dev/remotion/releases/v3.3.83)[​](#useragent "Direct link to useragent")

Lets you set a custom user agent that the headless Chrome browser assumes.

#### `darkMode?`[v4.0.381](https://github.com/remotion-dev/remotion/releases/v4.0.381)[​](#darkmode "Direct link to darkmode")

Whether Chromium should pretend to be in dark mode by emulating the media feature 'prefers-color-scheme: dark'. Default is `false`.

### `forceBucketName?`[​](#forcebucketname "Direct link to forcebucketname")

Specify a specific bucket name to be used. [This is not recommended](/docs/lambda/multiple-buckets), instead let Remotion discover the right bucket automatically.

### `logLevel?`[​](#loglevel "Direct link to loglevel")

One of `trace`, `verbose`, `info`, `warn`, `error`.  
 Determines how much info is being logged to the console.  
  
 Default `info`.

Logs can be read through the CloudWatch URL that this function returns.

### `forcePathStyle?`[v4.0.202](https://github.com/remotion-dev/remotion/releases/v4.0.202)[​](#forcepathstyle "Direct link to forcepathstyle")

Passes `forcePathStyle` to the AWS S3 client. If you don't know what this is, you probably don't need it.

### `storageClass?`[v4.0.305](https://github.com/remotion-dev/remotion/releases/v4.0.305)[​](#storageclass "Direct link to storageclass")

An [identifier](https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html#sc-compare) for the S3 storage class of the rendered media. Default: `undefined` (which is `STANDARD`).

### `licenseKey?`[v4.0.409](https://github.com/remotion-dev/remotion/releases/v4.0.409)[​](#licensekey "Direct link to licensekey")

License key for sending a usage event using `@remotion/licensing`.

### `isProduction?`[v4.0.409](https://github.com/remotion-dev/remotion/releases/v4.0.409)[​](#isproduction "Direct link to isproduction")

*default `true`*

Pass `false` if this a development render to not count it as a billable render on remotion.pro. Only can be used in conjuction with `licenseKey`.

### ~~`dumpBrowserLogs?`~~[​](#dumpbrowserlogs "Direct link to dumpbrowserlogs")

Deprecated in v4.0 in favor of [`logLevel`](#loglevel).

## Return value[​](#return-value "Direct link to Return value")

Returns a promise resolving to an object with the following properties:

### `bucketName`[​](#bucketname "Direct link to bucketname")

The S3 bucket in which the video was saved.

### `url`[​](#url "Direct link to url")

An AWS S3 URL where the output is available.

### `outKey`[v4.0.141](https://github.com/remotion-dev/remotion/releases/v4.0.141)[​](#outkey "Direct link to outkey")

The S3 key where the output is saved.

### `estimatedPrice`[​](#estimatedprice "Direct link to estimatedprice")

Object containing roughly estimated information about how expensive this operation was.

### `sizeInBytes`[​](#sizeinbytes "Direct link to sizeinbytes")

The size of the output image in bytes.

### `renderId`[​](#renderid "Direct link to renderid")

A unique alphanumeric identifier for this render. Useful for obtaining status and finding the relevant files in the S3 bucket.

### `cloudWatchLogs`[v3.2.10](https://github.com/remotion-dev/remotion/releases/v3.2.10)[​](#cloudwatchlogs "Direct link to cloudwatchlogs")

A link to CloudWatch (if you haven't disabled it) that you can visit to see the logs for the render.

### `artifacts`[v4.0.176](https://github.com/remotion-dev/remotion/releases/v4.0.176)[​](#artifacts "Direct link to artifacts")

Artifacts that were created so far during the render. [See here for an example of dealing with field.](/docs/artifacts#using-renderstillonlambda)

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/lambda/src/api/render-still-on-lambda.ts)
- [renderMediaOnLambda()](/docs/lambda/rendermediaonlambda)
- [renderStill()](/docs/renderer/render-still)
