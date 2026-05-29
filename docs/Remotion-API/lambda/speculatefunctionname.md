---
title: "speculateFunctionName()"
source: https://www.remotion.dev/docs/lambda/speculatefunctionname
---

# speculateFunctionName()

*available from v3.3.75*

Speculate the name of the Lambda function that will be created by [`deployFunction()`](/docs/lambda/deployfunction) or its CLI equivalent, [`npx remotion lambda functions deploy`](/docs/lambda/cli/functions/deploy). This could be useful in cases when the configuration of the Lambda function is known in advance, and the name of the function is needed.

If you are not sure whether a function exists, use [`getFunctionInfo()`](/docs/lambda/getfunctioninfo) and catch the error that gets thrown if it does not exist.

If you want to get a list of deployed functions, use [`getFunctions()`](/docs/lambda/getfunctions) instead.

## Function name pattern[​](#function-name-pattern "Direct link to Function name pattern")

A Remotion Lambda function is always names like this:

```tsx
remotion-render-3-3-63-mem2048mb-disk2048mb-240sec
                ^^^^^^    ^^^^       ^^^    ^^^
                  |         |         |      |-- Timeout in seconds
                  |         |         |--------- Disk size in MB
                  |         |------------------- Memory size in MB
                  |----------------------------- Remotion version with dots replaced by dashesCopy
```

[Learn more](/docs/lambda/naming-convention) about this convention.

## Example[​](#example "Direct link to Example")

```tsx
import {speculateFunctionName} from '@remotion/lambda/client';

const speculatedFunctionName = speculateFunctionName({
  memorySizeInMb: 2048,
  diskSizeInMb: 2048,
  timeoutInSeconds: 120,
});

console.log(speculatedFunctionName); // remotion-render-3-3-63-mem2048mb-disk2048mb-120secCopy
```

## Arguments[​](#arguments "Direct link to Arguments")

An object with the following properties:

### `memorySizeInMb`[​](#memorysizeinmb "Direct link to memorysizeinmb")

The amount of memory allocated to the function.

### `diskSizeInMb`[​](#disksizeinmb "Direct link to disksizeinmb")

The amount of disk space allocated to the function.

### `timeoutInSeconds`[​](#timeoutinseconds "Direct link to timeoutinseconds")

The timeout that has been assigned to the Lambda function.

## Return value[​](#return-value "Direct link to Return value")

A string with the name of the function that will be created.

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/lambda/src/api/speculate-function-name.ts)
- [Function name convention](/docs/lambda/naming-convention)
- [`deployFunction()`](/docs/lambda/deployfunction)
- CLI version of `deployFunction()`: [`npx remotion lambda functions deploy`](/docs/lambda/cli/functions/deploy)
