---
title: "getRenderProgress()"
source: https://www.remotion.dev/docs/lambda/getrenderprogress
---

# getRenderProgress()

Gets the current status of a render initiated via [`renderMediaOnLambda()`](/docs/lambda/rendermediaonlambda).  
Calling this function results in a Lambda invocation.

For renders initiated via [`renderStillOnLambda()`](/docs/lambda/renderstillonlambda), do not use this function. Instead, the result is returned immediately.

## Example[​](#example "Direct link to Example")

```tsx
import {getRenderProgress} from '@remotion/lambda/client';

const progress = await getRenderProgress({
  renderId: 'd7nlc2y',
  bucketName: 'remotionlambda-d9mafgx',
  functionName: 'remotion-render-la8ffw',
  region: 'us-east-1',
});Copy
```

note

Preferrably import this function from `@remotion/lambda/client` to avoid problems [inside serverless functions](/docs/lambda/light-client).

note

You don't need to call this function while rendering a [still](/docs/still). Once you have obtained the [`renderId`](/docs/lambda/renderstillonlambda#renderid) from [`renderStillOnLambda()`](/docs/lambda/renderstillonlambda), the render should already be done!

## API[​](#api "Direct link to API")

Call the function by passing an object with the following properties:

### `renderId`[​](#renderid "Direct link to renderid")

The unique identifier for the render that you want to get the progress for. You can get the renderId from the return value of [`renderMediaOnLambda()`](/docs/lambda/rendermediaonlambda).

### `bucketName`[​](#bucketname "Direct link to bucketname")

The bucket in which information about the render is saved. You can get the bucket name from the return value of [`renderMediaOnLambda()`](/docs/lambda/rendermediaonlambda).

### `region`[​](#region "Direct link to region")

The region in which the Lambda function is located in.

### `functionName`[​](#functionname "Direct link to functionname")

The name of the function that triggered the render.

### `customCredentials?`[v3.2.23](https://github.com/remotion-dev/remotion/releases/v3.2.23)[​](#customcredentials "Direct link to customcredentials")

If the render is going to be saved to a [different cloud](/docs/lambda/custom-destination#saving-to-another-cloud), pass an object with the same `endpoint`, `accessKeyId` and `secretAccessKey` as you passed to [`renderMediaOnLambda()`](/docs/lambda/rendermediaonlambda#outname) or [`renderStillOnLambda()`](/docs/lambda/renderstillonlambda#outname).

### `forcePathStyle?`[v4.0.202](https://github.com/remotion-dev/remotion/releases/v4.0.202)[​](#forcepathstyle "Direct link to forcepathstyle")

Passes `forcePathStyle` to the AWS S3 client. If you don't know what this is, you probably don't need it.

### `skipLambdaInvocation?`[v4.0.218](https://github.com/remotion-dev/remotion/releases/v4.0.218)[​](#skiplambdainvocation "Direct link to skiplambdainvocation")

Instead of calling a Lambda function which will get the progress from S3, make the S3 call directly.  
This is cheaper and faster, but the function name must follow [the function name convention](/docs/lambda/naming-convention#see-also).

## Response[​](#response "Direct link to Response")

Returns a promise resolving to an object with the following properties:

### `overallProgress`[​](#overallprogress "Direct link to overallprogress")

A number between 0 and 1 indicating the approximate progress of the render.

### `chunks`[​](#chunks "Direct link to chunks")

How many chunks have been fully rendered so far.

### `done`[​](#done "Direct link to done")

`true` if video has been successfully rendered and all processes are done. `false` otherwise.

### `encodingStatus`[​](#encodingstatus "Direct link to encodingstatus")

Either `null` if not all chunks have been rendered yet or an object with the signature `{framesEncoded: number}` that tells how many frames have been encoded so far in the encoding process.

### `renderId`[​](#renderid-1 "Direct link to renderid-1")

Mirrors the `renderId` that has been passed as an input

### `renderMetadata`[​](#rendermetadata "Direct link to rendermetadata")

Contains the following information about the render:

- `frameRange`: The first and last frame that is being rendered (Use `frameRange[1] - frameRange[0] + 1` to get number of total frames rendered).
- `startedDate`: Timestamp of when the rendering process started.
- `totalChunks`: Into how many pieces the rendering is divided.
- `estimatedTotalLambdaInvokations`: The estimated amount of total Lambda function calls in total, excluding calls to `getRenderProgress()`.
- `estimatedRenderLambdaInvokations`: The estimated amount of Lambdas that will render chunks of the video.
- `compositionId`: The ID of the composition that is being rendered.
- `codec`: The selected codec into which the video gets encoded.
- `dimensions`: The dimensions, with any `scale` applied, of the output video. (Available from v4.0.222)

### `bucket`[​](#bucket "Direct link to bucket")

In which bucket the render and other artifacts get saved.

### `outputFile`[​](#outputfile "Direct link to outputfile")

`null` if the video is not yet rendered, a `string` containing a URL pointing to the final artifact if the video finished rendering.

### `outKey`[​](#outkey "Direct link to outkey")

`null` if the video is not yet rendered, a `string` containing the S3 key where the final artifact is stored.

### `timeToFinish`[​](#timetofinish "Direct link to timetofinish")

`null` is the video is not yet rendered, a `number` describing how long the render took to finish in milliseconds.

### `errors`[​](#errors "Direct link to errors")

An array which contains errors that occurred.

### `fatalErrorEncountered`[​](#fatalerrorencountered "Direct link to fatalerrorencountered")

`true` if an error occurred and the video cannot be rendered. You should stop polling for progress and check the `errors` array.

### `currentTime`[​](#currenttime "Direct link to currenttime")

The current time at which the Lambda function responded to the progress request.

### `renderSize`[​](#rendersize "Direct link to rendersize")

How many bytes have been saved to the S3 bucket as a result of this render.  
From v4.0.165, this might be slightly underreported as the `progress.json` file is not factored in.

### `outputSizeInBytes`[​](#outputsizeinbytes "Direct link to outputsizeinbytes")

*available from v.3.3.9*

The size of the output artifact in bytes.

### `lambdasInvoked`[​](#lambdasinvoked "Direct link to lambdasinvoked")

How many lambdas that render a chunk have been invoked yet and have started rendering.

### `framesRendered`[​](#framesrendered "Direct link to framesrendered")

*available from v3.3.8*

How many frames have been rendered so far, approximated to a number divisible by `5`.

### `costs`[​](#costs "Direct link to costs")

An object describing the costs of the render so far. The cost may increase if the render has not finished yet. Only costs for AWS Lambda are estimated, not for S3 storage. It is a best-effort estimation, but without any guarantees. The object has the following properties:

- `accruedSoFar`: The cost as a floating number.
- `currency`: The currency of the cost.
- `displayCost`: The cost formatted as a string.
- `disclaimer`: Textual disclaimer removing any doubt that there is no guarantee.

### `estimatedBillingDurationInMilliseconds`[v4.0.74](https://github.com/remotion-dev/remotion/releases/v4.0.74)[​](#estimatedbillingdurationinmilliseconds "Direct link to estimatedbillingdurationinmilliseconds")

The estimated total runtime of all invoked Lambda functions combined, in milliseconds. As the render goes on, this number increases.

### `mostExpensiveFrameRanges`[​](#mostexpensiveframeranges "Direct link to mostexpensiveframeranges")

If the render is in progress, this is `null`. If the render is done, it is an array of the 5 most expensive chunks in the following shape:

- `chunk`: The index of the chunk (starting from 0)
- `timeInMilliseconds`: The time it took the render that chunk
- `frameRange`: A tuple containing the first and last frame that was rendered in that chunk.

### `artifacts`[v4.0.176](https://github.com/remotion-dev/remotion/releases/v4.0.176)[​](#artifacts "Direct link to artifacts")

Artifacts that were created so far during the render. [See here for an example of dealing with field.](/docs/artifacts#using-rendermedia-renderstill-or-renderframes)

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/lambda/src/api/get-render-progress.ts)
- [renderMediaOnLambda()](/docs/lambda/rendermediaonlambda)
