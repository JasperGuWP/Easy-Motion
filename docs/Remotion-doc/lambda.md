---
title: "@remotion/lambda"
source: https://www.remotion.dev/docs/lambda
---

# @remotion/lambda

[Also available as a 11min video

**Integrate Remotion Lambda into your app**](https://youtu.be/dQyPUasZY7I)

Render Remotion videos on [AWS Lambda](https://aws.amazon.com/lambda/). This is the fastest and most scalable way to render Remotion videos.  
You only pay while you are rendering, making it very cost-effective.

## When should I use it?[​](#when-should-i-use-it "Direct link to When should I use it?")

- Your videos are less than 80 minutes long at Full HD. approximately until the 15min AWS Timeout limit is hit
- You stay within the ([AWS Lambda Concurrency Limit](/docs/lambda/troubleshooting/rate-limit)) or you are requesting an [increase from AWS](/docs/lambda/troubleshooting/rate-limit).
- You are fine with using Amazon Web Services in one of the [supported regions](/docs/lambda/region-selection).

If one of those constraints is a dealbreaker for you, resort to normal [server-side rendering](/docs/ssr) or consider using [Cloud Run](/docs/cloudrun).  
See also: [Comparison of server-side rendering options](/docs/compare-ssr)

## How it works[​](#how-it-works "Direct link to How it works")

- A Lambda function and a S3 bucket is created on AWS.
- A Remotion project gets deployed to a S3 bucket as a website.
- The Lambda function gets invoked and opens the Remotion project.
- A lot of Lambda functions are created in parallel which each render a small part of the video
- The initial Lambda function downloads the videos and stitches them together.
- The final video gets uploaded to S3 and is available for download.

See in more detail: [How Remotion Lambda works](/docs/lambda/how-lambda-works)

## Architecture[​](#architecture "Direct link to Architecture")

- **Lambda function**: Requires a layer with Chromium, currently hosted by Remotion. Only one Lambda function is required, but it can execute different actions.
- **S3 bucket**: Stores the projects, the renders, and render metadata.
- **CLI**: Allows to control the overall architecture from the command line. Is installed by adding `@remotion/lambda` to a project.
- **Node.JS API**: Has the same features as the CLI but is easier to use programmatically

## Setup / Installation[​](#setup--installation "Direct link to Setup / Installation")

[**See here**](/docs/lambda/setup)

## Region selection[​](#region-selection "Direct link to Region selection")

The following regions are available for Remotion Lambda:

- `eu-central-1`- `eu-central-2`- `eu-west-1`- `eu-west-2`- `eu-west-3`- `eu-south-1`- `eu-north-1`- `us-east-1`- `us-east-2`- `us-west-1`- `us-west-2`- `af-south-1`- `ap-south-1`- `ap-east-1`- `ap-southeast-1`- `ap-southeast-2`- `ap-northeast-1`- `ap-northeast-2`- `ap-northeast-3`- `ap-southeast-4`- `ap-southeast-5`- `ca-central-1`- `sa-east-1`

[**See here for configurations and considerations.**](/docs/lambda/region-selection)

## Limitations[​](#limitations "Direct link to Limitations")

- You only have up to 10GB of storage available in a Lambda function. This must be sufficient for both the separated chunks and the concatenated output, therefore the output file can only be about 5GB maximum, limiting the maximum video length to around 2 hours of Full HD video.
- [Lambda has a global limit of 1000 concurrent lambdas per region by default, although it can be increased](/docs/lambda/troubleshooting/rate-limit).
- AV1 encoding is not available on Lambda.

## Cost[​](#cost "Direct link to Cost")

Most of our users render multiple minutes of video for just a few pennies. The exact cost is dependent on the region, assigned memory, type of video, parallelization and other parameters. For each render, we estimate a cost and display it to you. You might also need a Remotion license (see below).

## AWS permissions[​](#aws-permissions "Direct link to AWS permissions")

Remotion Lambda requires you to create an AWS account and create a user with some permissions attached to it. We require only the minimal amount of permissions required for operating Remotion Lambda.

[**Read more about permissions**](/docs/lambda/permissions)

## CLI[​](#cli "Direct link to CLI")

You can control Remotion Lambda using the `npx remotion lambda` command.

[**Read more about the CLI**](/docs/lambda/cli)

## Node.JS API[​](#nodejs-api "Direct link to Node.JS API")

Everything you can do using the CLI, you can also control using Node.JS APIs. See the reference [here](/docs/lambda/api).

## License[​](#license "Direct link to License")

The standard Remotion license applies: <https://github.com/remotion-dev/remotion/blob/main/LICENSE.md>

Companies needing a license and using cloud rendering must set it up with Cloud Rendering Units. Please visit: <https://remotion.pro/license>

## Uninstalling[​](#uninstalling "Direct link to Uninstalling")

We make it easy to remove all Remotion resources from your AWS account without leaving any traces or causing further costs.

[**How to uninstall Remotion Lambda**](/docs/lambda/uninstall)
