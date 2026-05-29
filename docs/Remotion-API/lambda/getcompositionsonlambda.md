---
title: "getCompositionsOnLambda()"
source: https://www.remotion.dev/docs/lambda/getcompositionsonlambda
---

# getCompositionsOnLambda()

[v3.3.2](https://github.com/remotion-dev/remotion/releases/v3.3.2)

Gets the compositions inside a Lambda function.

Note that you can also get the compositions of a site that is hosted on Lambda using [`getCompositions()`](/docs/renderer/get-compositions). Vice versa, you can also get the compositions from a serve URL that is not hosted on AWS Lambda using `getCompositionsOnLambda()`.

You should use `getCompositionsOnLambda()` if you cannot use [`getCompositions()`](/docs/renderer/get-compositions) because the machine cannot run Chrome.

## Example[​](#example "Direct link to Example")

```tsx
import {getCompositionsOnLambda} from '@remotion/lambda/client';

const compositions = await getCompositionsOnLambda({
  region: 'us-east-1',
  functionName: 'remotion-render-bds9aab',
  serveUrl: 'https://remotionlambda-qg35eyp1s1.s3.eu-central-1.amazonaws.com/sites/bf2jrbfkw',
  inputProps: {},
});

console.log(compositions); // See below for an example valueCopy
```

note

Preferrably import this function from `@remotion/lambda/client` to avoid problems [inside serverless functions](/docs/lambda/light-client).

## Arguments[​](#arguments "Direct link to Arguments")

An object with the following properties:

### `functionName`[​](#functionname "Direct link to functionname")

The name of the deployed Lambda function that should be used to ge the list of compositions.
Use [`deployFunction()`](/docs/lambda/deployfunction) to create a new function and [`getFunctions()`](/docs/lambda/getfunctions) to obtain currently deployed Lambdas.

### `region`[​](#region "Direct link to region")

In which region your Lambda function is deployed.

### `serveUrl`[​](#serveurl "Direct link to serveurl")

A URL pointing to a Remotion project. Use [`deploySite()`](/docs/lambda/deploysite) to deploy a Remotion project.

### `inputProps`[​](#inputprops "Direct link to inputprops")

[Input Props to pass to the selected composition of your video.](/docs/passing-props#passing-input-props-in-the-cli).  
Must be a JSON object.  
From the root component the props can be read using [`getInputProps()`](/docs/get-input-props).  
You may transform input props using [`calculateMetadata()`](/docs/calculate-metadata).

### `envVariables?`[​](#envvariables "Direct link to envvariables")

See [`renderMedia() -> envVariables`](/docs/renderer/render-media#envvariables). Default: `{}`.

### `timeoutInMilliseconds?`[​](#timeoutinmilliseconds "Direct link to timeoutinmilliseconds")

A number describing how long the function may take in milliseconds to evaluate the list of compositions [before it times out](/docs/timeout). Default: `30000`

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

### `forceBucketName?`[v3.3.42](https://github.com/remotion-dev/remotion/releases/v3.3.42)[​](#forcebucketname "Direct link to forcebucketname")

Specify a specific bucket name to be used. [This is not recommended](/docs/lambda/multiple-buckets), instead let Remotion discover the right bucket automatically.

### `logLevel?`[​](#loglevel "Direct link to loglevel")

One of `trace`, `verbose`, `info`, `warn`, `error`.  
 Determines how much info is being logged to the console.  
  
 Default `info`.

Logs can be read through the CloudWatch URL that this function returns.

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

### ~~`dumpBrowserLogs?`~~[​](#dumpbrowserlogs "Direct link to dumpbrowserlogs")

Deprecated in v4.0 in favor of [`logLevel`](#loglevel).

## Return value[​](#return-value "Direct link to Return value")

Returns a promise that resolves to an array of available compositions. Example value:

```tsx
[
  {
    id: 'HelloWorld',
    width: 1920,
    height: 1080,
    fps: 30,
    durationInFrames: 120,
    defaultProps: {
      title: 'Hello World',
    },
  },
  {
    id: 'Title',
    width: 1080,
    height: 1080,
    fps: 30,
    durationInFrames: 90,
    defaultProps: undefined,
  },
];Copy
```

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/lambda/src/api/get-compositions-on-lambda.ts)
- [getCompositions()](/docs/renderer/get-compositions)
