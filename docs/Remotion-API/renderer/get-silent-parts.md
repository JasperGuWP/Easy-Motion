---
title: "getSilentParts()v4.0.18"
source: https://www.remotion.dev/docs/renderer/get-silent-parts
---

[Also available as a 2min video

**Remove silence from videos programmatically**](https://www.youtube.com/watch?v=OHrvTMgiXWc)

# getSilentParts()[v4.0.18](https://github.com/remotion-dev/remotion/releases/v4.0.18)

Gets the silent parts of a video or audio in Node.js. Useful for cutting out silence from a video.

## Example[​](#example "Direct link to Example")

```tsx
silent-parts.mjs

import {getSilentParts} from '@remotion/renderer';

const {silentParts, durationInSeconds} = await getSilentParts({
  src: '/Users/john/Documents/bunny.mp4',
  noiseThresholdInDecibels: -20,
  minDurationInSeconds: 1,
});

console.log(silentParts); // [{startInSeconds: 0, endInSeconds: 1.5}]Copy
```

info

Pass an absolute path to `getSilentParts()`. URLs are not supported.

## Arguments[​](#arguments "Direct link to Arguments")

An object which takes the following properties:

### `source`[​](#source "Direct link to source")

*string*

A local video or audio file path.

### `noiseThresholdInDecibels?`[​](#noisethresholdindecibels "Direct link to noisethresholdindecibels")

*number*

The threshold in decibels. If the audio is below this threshold, it is considered silent. The default is `-20`. Must be less than `30`.

### `minDurationInSeconds?`[​](#mindurationinseconds "Direct link to mindurationinseconds")

*number*

The minimum duration of a silent part in seconds. The default is `1`.

### `logLevel?`[​](#loglevel "Direct link to loglevel")

One of `trace`, `verbose`, `info`, `warn`, `error`.  
 Determines how much info is being logged to the console.  
  
 Default `info`.

### `binariesDirectory?`[v4.0.120](https://github.com/remotion-dev/remotion/releases/v4.0.120)[​](#binariesdirectory "Direct link to binariesdirectory")

The directory where the platform-specific binaries and libraries that Remotion needs are located. Those include an `ffmpeg` and `ffprobe` binary, a Rust binary for various tasks, and various shared libraries. If the value is set to `null`, which is the default, then the path of a platform-specific package located at `node_modules/@remotion/compositor-*` is selected.  
This option is useful in environments where Remotion is not officially supported to run like bundled serverless functions or Electron.

## Return Value[​](#return-value "Direct link to Return Value")

The return value is an object with the following properties:

### `silentParts`[​](#silentparts "Direct link to silentparts")

An array of objects with the following properties:

- `startInSeconds`: The start time of the silent part in seconds.
- `endInSeconds`: The end time of the silent part in seconds.

### `audibleParts`[​](#audibleparts "Direct link to audibleparts")

The inverse of the `silentParts` array.  
An array of objects with the following properties:

- `startInSeconds`: The start time of the audible part in seconds.
- `endInSeconds`: The end time of the audible part in seconds.

### `durationInSeconds`[​](#durationinseconds "Direct link to durationinseconds")

The time length of the media in seconds.

## Compatibility[​](#compatibility "Direct link to Compatibility")

|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Browsers Servers Environments|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | Chrome  Firefox  Safari  Node.js  Bun  Serverless Functions  [Client-side rendering](/docs/client-side-rendering)  [Server-side rendering](/docs/ssr)  [Player](/docs/player)  [Studio](/docs/studio) |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/renderer/src/get-silent-parts.ts)
- [`getVideoMetadata()`](/docs/renderer/get-video-metadata)
