---
title: "Server-Side Rendering"
source: https://www.remotion.dev/docs/ssr
---

# Server-Side Rendering

Remotion's rendering engine is built with Node.JS, which makes it easy to render a video in the cloud.

See the [Comparison of SSR options](/docs/compare-ssr) to help you decide which option is best for you.

## Render a video on AWS Lambda[​](#render-a-video-on-aws-lambda "Direct link to Render a video on AWS Lambda")

The fastest way to render videos in the cloud is to use [`@remotion/lambda`](/docs/lambda).

## Render using Vercel Sandbox[​](#render-using-vercel-sandbox "Direct link to Render using Vercel Sandbox")

The easiest way, especially for Vercel customers is to use [Vercel Sandbox](/docs/vercel-sandbox).

## Render a video using Node.js APIs[​](#render-a-video-using-nodejs-apis "Direct link to Render a video using Node.js APIs")

We provide a set of APIs to render videos using Node.js and Bun.  
See an [example](/docs/ssr-node) or the [API reference](/docs/renderer) for more information.

## Render using GitHub Actions[​](#render-using-github-actions "Direct link to Render using GitHub Actions")

You can render a video on GitHub actions. The following workflow assumes a composition ID of `MyComp`

```tsx
name: Render video
on:
  workflow_dispatch:
jobs:
  render:
    name: Render video
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@main
      - uses: actions/setup-node@main
      - run: npm i
      - run: npx remotion render MyComp out/video.mp4
      - uses: actions/upload-artifact@v4
        with:
          name: out.mp4
          path: out/video.mp4Copy
```

### With input props[​](#with-input-props "Direct link to With input props")

If you have props, you can ask for them using the GitHub Actions input fields.  
Here we assume a shape of `{titleText: string; titleColor: string}`.

```tsx
name: Render video
on:
  workflow_dispatch:
    inputs:
      titleText:
        description: 'Which text should it say?'
        required: true
        default: 'Welcome to Remotion'
      titleColor:
        description: 'Which color should it be in?'
        required: true
        default: 'black'
jobs:
  render:
    name: Render video
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@main
      - uses: actions/setup-node@main
      - run: npm i
      - run: echo $WORKFLOW_INPUT > input-props.json
        env:
          WORKFLOW_INPUT: ${{ toJson(github.event.inputs) }}
      - run: npx remotion render MyComp out/video.mp4 --props="./input-props.json"
      - uses: actions/upload-artifact@v4
        with:
          name: out.mp4
          path: out/video.mp4Copy
```

[1](#1)

 Commit the template to a GitHub repository.  
[2](#2) On GitHub, click the `Actions` tab.  
[3](#3) Select the `Render video` workflow on the left.  
[4](#4) A `Run workflow` button should appear. Click it.  
[5](#5) Fill in the props of the root component and click `Run workflow`.  
[6](#6) After the rendering is finished, you can download the video under `Artifacts`.  

Note that running the workflow may incur costs. However, the workflow will only run if you actively trigger it.

See also: [Passing input props in GitHub Actions](/docs/passing-props#passing-input-props-in-github-actions)

## Render a video using Docker[​](#render-a-video-using-docker "Direct link to Render a video using Docker")

See: [Dockerizing a Remotion project](/docs/docker)

## Deploy to a cloud platform[​](#deploy-to-a-cloud-platform "Direct link to Deploy to a cloud platform")

The following guides show how to deploy a Remotion rendering service using the [Node.js/Bun APIs](/docs/renderer) on various cloud platforms:

- [Azure Container Apps](/docs/azure-container-apps)
- [Cloudflare Containers](/docs/cloudflare-containers)

## Render a video using GCP Cloud Run (Alpha)[​](#render-a-video-using-gcp-cloud-run-alpha "Direct link to Render a video using GCP Cloud Run (Alpha)")

Check out the experimental [Cloud Run](/docs/cloudrun) package.  
Note: It not actively being developed - our plan is to port the Lambda runtime to Cloud Run instead of maintaining a separate implementation.

## API reference[​](#api-reference "Direct link to API reference")

[**getCompositions()**

List available compositions](/docs/renderer/get-compositions)[**selectComposition()**

Get a composition](/docs/renderer/select-composition)[**renderMedia()**

Render a video or audio](/docs/renderer/render-media)[**renderFrames()**

Render a series of images](/docs/renderer/render-frames)[**renderStill()**

Render a single image](/docs/renderer/render-still)[**stitchFramesToVideo()**

Turn images into a video](/docs/renderer/stitch-frames-to-video)[**openBrowser()**

Open a Chrome browser to reuse across renders](/docs/renderer/open-browser)[**ensureBrowser()**

Open a Chrome browser to reuse across renders](/docs/renderer/ensure-browser)[**makeCancelSignal()**

Create token to later cancel a render](/docs/renderer/make-cancel-signal)[**getVideoMetadata()**

Get metadata from a video file in Node.js](/docs/renderer/get-video-metadata)[**getSilentParts()**

Obtain silent portions of a video or audio](/docs/renderer/get-silent-parts)[**combineChunks()**

Combine chunks of partial renders](/docs/renderer/combine-chunks)[**ensureFfmpeg()**

Check for ffmpeg binary and install if not existing](/docs/renderer/ensure-ffmpeg)[**ensureFfprobe()**

Check for ffprobe binary and install if not existing](/docs/renderer/ensure-ffprobe)[**getCanExtractFramesFast()**

Probes for fast extraction for <OffthreadVideo>](/docs/renderer/get-can-extract-frames-fast)
