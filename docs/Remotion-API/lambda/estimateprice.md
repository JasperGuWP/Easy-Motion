---
title: "estimatePrice()"
source: https://www.remotion.dev/docs/lambda/estimateprice
---

# estimatePrice()

Calculates the AWS costs incurred for AWS Lambda given the region, execution duration and memory size based on the AWS Lambda pricing matrix.

During rendering, many Lambda functions are spawned:

- The main function spawns many worker functions, waits for chunks to be rendered, and stitches them together for the full video. This is the longest-running Lambda function.
- Render functions render a short portion of a video and then shut down.
- Other short-lived, negligible functions get launched for initializing lambdas and fetching progress.

The total duration is the sum of execution duration of all of the above Lambda functions.
This duration can be passed to `estimatePrice()` to estimate the cost of AWS Lambda.

The calculated duration does not include costs for S3 and Remotion licensing fees.

## Example[​](#example "Direct link to Example")

```tsx
import { estimatePrice } from "@remotion/lambda";

console.log(
  estimatePrice({
    region: "us-east-1",
    durationInMilliseconds: 20000,
    memorySizeInMb: 2048,
    diskSizeInMb: 2048,
    lambdasInvoked: 1,
  })
); // 0.00067Copy
```

## Arguments[​](#arguments "Direct link to Arguments")

An object containing the following parameters:

### `region`[​](#region "Direct link to region")

The region in which the Lambda function is executed in. [Pricing varies across regions](/docs/lambda/region-selection#other-considerations).

### `memorySizeInMb`[​](#memorysizeinmb "Direct link to memorysizeinmb")

The amount of memory that has been given to the Lambda function. May be received with [`getFunctionInfo()`](/docs/lambda/getfunctioninfo).

### `durationInMilliseconds`[​](#durationinmilliseconds "Direct link to durationinmilliseconds")

The estimated total execution duration in Milliseconds of all Lambdas combined. See the top of this page for a guide on how to approximate the duration.

### `lambdasInvoked`[​](#lambdasinvoked "Direct link to lambdasinvoked")

The number of lambdas that were invoked in the rendering process.

### `diskSizeInMb`[​](#disksizeinmb "Direct link to disksizeinmb")

The amount of disk space allocated in megabytes.

## Return value[​](#return-value "Direct link to Return value")

The estimated cost in USD as a `number`.

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/lambda/src/api/estimate-price.ts)
