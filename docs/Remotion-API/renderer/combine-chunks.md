---
title: "combineChunks()v4.0.279"
source: https://www.remotion.dev/docs/renderer/combine-chunks
---

# combineChunks()[v4.0.279](https://github.com/remotion-dev/remotion/releases/v4.0.279)

Combine multiple video or audio chunks into a single output file. This function is useful for decentralized rendering workflows where different parts of a video are rendered separately and need to be combined.

[Remotion Lambda](/docs/lambda) uses this API under the hood to combine chunks that were rendered on individual Lambda functions.

note

**Advanced API:** This is a hard-to-use API that most people should not use directly. Misusage of this API might lead to unpredictable behavior and potential audio and video artifacts. If you want a distributed rendering solution, use [`renderMediaOnLambda()`](/docs/lambda/rendermediaonlambda). If you just want to render a video with multithreading enabled, use [`renderMedia()`](/docs/renderer/render-media).

## Example[​](#example "Direct link to Example")

```tsx
combine.mjs

import {combineChunks} from '@remotion/renderer';

// Video files rendered as separate chunks
const videoFiles = ['/path/to/chunk1.mp4', '/path/to/chunk2.mp4', '/path/to/chunk3.mp4'];

// Optional audio files corresponding to each video chunk
const audioFiles = ['/path/to/chunk1.aac', '/path/to/chunk2.aac', '/path/to/chunk3.aac'];

await combineChunks({
  outputLocation: '/path/to/final-video.mp4',
  videoFiles,
  audioFiles,
  codec: 'h264',
  fps: 30,
  framesPerChunk: 100,
  audioCodec: 'aac',
  preferLossless: false,
  compositionDurationInFrames: 300,
});Copy
```

## Arguments[​](#arguments "Direct link to Arguments")

An object with the following properties:

### `outputLocation`[​](#outputlocation "Direct link to outputlocation")

*string*

Where to save the output media file. Must be an absolute path.

### `videoFiles`[​](#videofiles "Direct link to videofiles")

*string[]*

An array of absolute file paths pointing to the video chunks to be combined. These should be in the correct order for combining.

### `audioFiles`[​](#audiofiles "Direct link to audiofiles")

*string[]*

An array of absolute file paths pointing to the audio chunks to be combined. These should be in the correct order for combining.

### `codec`[​](#codec "Direct link to codec")

*"h264" | "h265" | "av1" | "vp8" | "vp9" | "mp3" | "aac" | "wav" | "prores" | "h264-mkv" | "gif"*

The codec to use for the output file. See the distributed rendering guide to see which parameter to set.

### `fps`[​](#fps "Direct link to fps")

*number*

The frames per second of the video. Must be set to the `fps` value returned by [`selectComposition()`](/docs/renderer/select-composition).

### `framesPerChunk`[​](#framesperchunk "Direct link to framesperchunk")

*number*

The number of frames in each chunk. All chunks must have the same number of frames, except the last one.

### `audioCodec?`[​](#audiocodec "Direct link to audiocodec")

*"pcm-16" | "aac" | "mp3" | "opus" | null*

Audio codec to use for the output file. If not specified, it will be determined based on the video codec.

### `preferLossless`[​](#preferlossless "Direct link to preferlossless")

*boolean*

Must be the same value that you passed to each [`renderMedia()`](/docs/renderer/render-media) call.

### `compositionDurationInFrames`[​](#compositiondurationinframes "Direct link to compositiondurationinframes")

*number*

The total duration of the composition. Must be set to the `durationInFrames` value returned by [`selectComposition()`](/docs/renderer/select-composition).  
Do not change the value, even if you use the `frameRange` or `everyNthFrame` options.

### `frameRange?`[​](#framerange "Direct link to framerange")

*number | [number, number] | [number, null] | null*

Like [`frameRange`](/docs/renderer/render-media#framerange) that you would pass to [`renderMedia()`](/docs/renderer/render-media) or [`renderMediaOnLambda()`](/docs/lambda/rendermediaonlambda). The range of frames of which the video exists once all chunks are combined. Pass `[number, null]` to render from a frame to the end of the composition.[v4.0.421](https://github.com/remotion-dev/remotion/releases/v4.0.421)

### `everyNthFrame?`[​](#everynthframe "Direct link to everynthframe")

*number*

Like [`everyNthFrame`](/docs/renderer/render-media#everynthframe) that you would pass to [`renderMedia()`](/docs/renderer/render-media) or [`renderMediaOnLambda()`](/docs/lambda/rendermediaonlambda).

Must be the same value that you passed to each [`renderMedia()`](/docs/renderer/render-media) call.

### `onProgress?`[​](#onprogress "Direct link to onprogress")

*function*

Callback function to track the progress of the combining operation.

```tsx
import {CombineChunksOnProgress} from '@remotion/renderer';

const onProgress: CombineChunksOnProgress = ({totalProgress, frames}) => {
  console.log(`Combining is ${totalProgress * 100}% complete`);
  console.log(`Processed ${frames} frames`);
};Copy
```

### `audioBitrate?`[​](#audiobitrate "Direct link to audiobitrate")

*string | null*

Must be the same value that you passed to each [`renderMedia()`](/docs/renderer/render-media) call.

### `numberOfGifLoops?`[​](#numberofgifloops "Direct link to numberofgifloops")

*number | null*

Must be the same value that you passed to each [`renderMedia()`](/docs/renderer/render-media) call.

### `logLevel?`[​](#loglevel "Direct link to loglevel")

*"verbose" | "info" | "warn" | "error"*

Controls the verbosity of logging. Default is `"info"`.

### `binariesDirectory?`[​](#binariesdirectory "Direct link to binariesdirectory")

*string | null*

A directory containing FFmpeg binaries to use instead of the bundled or system-installed ones.

### `cancelSignal?`[​](#cancelsignal "Direct link to cancelsignal")

*CancelSignal*

A token that allows the combining process to be cancelled. See: [`makeCancelSignal()`](/docs/renderer/make-cancel-signal)

### `metadata?`[​](#metadata "Direct link to metadata")

Metadata to add to the output file, in the format of key-value pairs.

## Return Value[​](#return-value "Direct link to Return Value")

The function returns a Promise that resolves when the combining process is complete.

## Compatibility[​](#compatibility "Direct link to Compatibility")

|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Browsers Servers Environments|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | Chrome  Firefox  Safari  Node.js  Bun  Serverless Functions  [Client-side rendering](/docs/client-side-rendering)  [Server-side rendering](/docs/ssr)  [Player](/docs/player)  [Studio](/docs/studio) |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/renderer/src/combine-chunks.ts)
- [`renderMedia()`](/docs/renderer/render-media)
