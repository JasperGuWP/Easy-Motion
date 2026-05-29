---
title: "getFunctionInfo()"
source: https://www.remotion.dev/docs/lambda/getfunctioninfo
---

# getFunctionInfo()

Gets information about a function given its name and region.

To get a list of deployed functions, use [`getFunctions()`](/docs/lambda/getfunctions).

To deploy a function, use [`deployFunction()`](/docs/lambda/deployfunction).

## Example[​](#example "Direct link to Example")

```tsx
import {getFunctionInfo} from '@remotion/lambda';

const info = await getFunctionInfo({
  functionName: 'remotion-render-d7nd2a9f',
  region: 'eu-central-1',
});
console.log(info.functionName); // remotion-render-d7nd2a9f
console.log(info.memorySizeInMb); // 1500
console.log(info.diskSizeInMb); // 2048
console.log(info.version); // '2021-07-14'
console.log(info.timeoutInSeconds); // 120Copy
```

## Arguments[​](#arguments "Direct link to Arguments")

An object containing the following properties:

### `region`[​](#region "Direct link to region")

The [AWS region](/docs/lambda/region-selection) the function resides in.

### `functionName`[​](#functionname "Direct link to functionname")

The name of the function.

### `logLevel?`[v4.0.115](https://github.com/remotion-dev/remotion/releases/v4.0.115)[​](#loglevel "Direct link to loglevel")

One of `trace`, `verbose`, `info`, `warn`, `error`.  
 Determines how much info is being logged to the console.  
  
 Default `info`.

## Return value[​](#return-value "Direct link to Return value")

If the function does not exist, an error is thrown by the AWS SDK.
If the function exists, promise resolving to an object with the following properties is returned:

### `memorySizeInMb`[​](#memorysizeinmb "Direct link to memorysizeinmb")

The amount of memory allocated to the function.

### `diskSizeInMb`[​](#disksizeinmb "Direct link to disksizeinmb")

The amount of disk space allocated to the function.

### `functionName`[​](#functionname-1 "Direct link to functionname-1")

The name of the function.

### `version`[​](#version "Direct link to version")

The version of the function. Remotion is versioning the Lambda function and a render can only be triggered from a version of `@remotion/lambda` that is matching the one of the function.

### `timeoutInSeconds`[​](#timeoutinseconds "Direct link to timeoutinseconds")

The timeout that has been assigned to the Lambda function.

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/lambda/src/api/get-function-info.ts)
- [`getFunctions()`](/docs/lambda/getfunctions)
- [`deployFunction()`](/docs/lambda/deployfunction)
- [`deleteFunction()`](/docs/lambda/deletefunction)
