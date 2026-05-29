---
title: "getFunctions()"
source: https://www.remotion.dev/docs/lambda/getfunctions
---

# getFunctions()

Retrieves a list of functions that Remotion deployed to AWS Lambda in a certain region.

The parameter `compatibleOnly` determines whether only functions that are compatible with the installed version of Remotion Lambda should be returned.

note

The Lambda function is versioned and the version of the function must match the version of the `@remotion/lambda` package. So if you upgrade Remotion, you should deploy a new function or otherwise you might get an empty array from this function.

To get information about only a single function, use [`getFunctionInfo()`](/docs/lambda/getfunctioninfo).

If you are sure that a function exists, you can also guess the name of it using [`speculateFunctionName()`](/docs/lambda/speculatefunctionname) and save an API call to Lambda.

## Example[​](#example "Direct link to Example")

```tsx
import {getFunctions} from '@remotion/lambda/client';

const info = await getFunctions({
  region: 'eu-central-1',
  compatibleOnly: true,
});

for (const fn of info) {
  console.log(fn.functionName); // "remotion-render-d8a03x"
  console.log(fn.memorySizeInMb); // 1536
  console.log(fn.timeoutInSeconds); // 120
  console.log(fn.diskSizeInMb); // 2048
  console.log(fn.version); // "2021-07-25"
}Copy
```

note

Preferrably import this function from `@remotion/lambda/client` to avoid problems [inside serverless functions](/docs/lambda/light-client).

## Argument[​](#argument "Direct link to Argument")

An object containing the following properties:

### `region`[​](#region "Direct link to region")

The [AWS region](/docs/lambda/region-selection) that you would like to query.

### `logLevel?`[v4.0.115](https://github.com/remotion-dev/remotion/releases/v4.0.115)[​](#loglevel "Direct link to loglevel")

One of `trace`, `verbose`, `info`, `warn`, `error`.  
 Determines how much info is being logged to the console.  
  
 Default `info`.

### `compatibleOnly`[​](#compatibleonly "Direct link to compatibleonly")

If `true`, only functions that match the version of the current Remotion Lambda package are returned. If `false`, all functions are returned.

## Return value[​](#return-value "Direct link to Return value")

A promise resolving to an **array of objects** with the following properties:

### `functionName`[​](#functionname "Direct link to functionname")

The name of the function.

### `memorySizeInMb`[​](#memorysizeinmb "Direct link to memorysizeinmb")

The amount of memory allocated to the function.

### `diskSizeInMb`[​](#disksizeinmb "Direct link to disksizeinmb")

The amount of ephemereal disk storage allocated to the function.

### `version`[​](#version "Direct link to version")

The version of the function. Remotion is versioning the Lambda function and a render can only be triggered from a version of `@remotion/lambda` that is matching the one of the function.

### `timeoutInSeconds`[​](#timeoutinseconds "Direct link to timeoutinseconds")

The timeout that has been assigned to the Lambda function.

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/lambda/src/api/get-functions.ts)
- [`getFunctionInfo()`](/docs/lambda/getfunctioninfo)
- [`deployFunction()`](/docs/lambda/deployfunction)
- [`deleteFunction()`](/docs/lambda/deletefunction)
