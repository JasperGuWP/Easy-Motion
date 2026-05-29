---
title: "@remotion/webcodecs"
source: https://www.remotion.dev/docs/webcodecs/
---

# @remotion/webcodecs

warning

[We are phasing out Remotion WebCodecs and are moving to Mediabunny](/blog/mediabunny)!

*available from v4.0.229*

This package provides APIs for converting videos in the browser.  
It leverages [`@remotion/media-parser`](/docs/media-parser) to parse the video and audio data, and then uses the [WebCodecs API](https://developer.mozilla.org/en-US/docs/Web/API/WebCodecs_API) to encode the video.

## What can you do with this package?[​](#what-can-you-do-with-this-package "Direct link to What can you do with this package?")

In browsers that implement WebCodecs, you can use this package to:

- [Convert videos from one format to another](/docs/webcodecs/convert-a-video) (From .mp4, .webm, .mov, .mkv, .m3u8, .ts, .avi, .mp3, .flac, .wav, .m4a, .aac to .mp4, .webm, .wav)
- [Rotate videos](/docs/webcodecs/rotate-a-video)
- [Efficiently extract frames from a video](/docs/webcodecs/extract-frames)
- Extract audio from a video
- Manipulate the pixels of a video
- [Fix videos that were recorded with `MediaRecorder`](/docs/webcodecs/fix-mediarecorder-video)
- Soon: Compress, trim, crop videos

## Is it fast?[​](#is-it-fast "Direct link to Is it fast?")

Unlike solutions which leverage WebAssembly, WebCodecs have full access to GPU acceleration.  
You can expect vastly faster processing than with online converters or WebAssembly-based processing.

See a [comparison](https://github.com/remotion-dev/webcodecs-benchmark) here.

## 💼 License Disclaimer[​](#-license-disclaimer "Direct link to 💼 License Disclaimer")

This package is licensed under the [Remotion License](/docs/license).  
We consider a team of 4 or more people a "company".

  

**For "companies"**: A Remotion Company license needs to be obtained to use this package.  
 In a future version of `@remotion/webcodecs`, this package will also require the purchase of a newly created "WebCodecs Conversion Seat". [Get in touch](/contact) with us if you are planning to use this package.

  

**For individuals and teams up to 3:** You can use this package for free.

  

This is a short, non-binding explanation of our license. See the [License](/docs/license) itself for more details.

## 🚧 Unstable API Warning[​](#-unstable-api-warning "Direct link to 🚧 Unstable API Warning")

This package is experimental.  
We might change the API at any time, until we remove this notice.

## Installation[​](#installation "Direct link to Installation")

- Remotion CLI- npm- bun- pnpm- yarn

```tsx
npx remotion add @remotion/webcodecs
```

```tsx
npm i --save-exact @remotion/[email protected]
```

This assumes you are currently using v4.0.469 of Remotion.  
Also update `remotion` and all `` `@remotion/*` `` packages to the same version.  
Remove all `^` character in front of the version numbers of it as it can lead to a version conflict.

```tsx
pnpm i @remotion/[email protected]
```

This assumes you are currently using v4.0.469 of Remotion.  
Also update `remotion` and all `` `@remotion/*` `` packages to the same version.  
Remove all `^` character in front of the version numbers of it as it can lead to a version conflict.

```tsx
bun i @remotion/[email protected]
```

This assumes you are currently using v4.0.469 of Remotion.  
Also update `remotion` and all `` `@remotion/*` `` packages to the same version.  
Remove all `^` character in front of the version numbers of it as it can lead to a version conflict.

```tsx
yarn --exact add @remotion/[email protected]
```

This assumes you are currently using v4.0.469 of Remotion.  
Also update `remotion` and all `` `@remotion/*` `` packages to the same version.  
Remove all `^` character in front of the version numbers of it as it can lead to a version conflict.

## Guide[​](#guide "Direct link to Guide")

[**Convert a video**

from one format to another](/docs/webcodecs/convert-a-video)[**Rotate a video**

Fix bad orientation](/docs/webcodecs/rotate-a-video)[**Track Transformation**

Copy, re-encode or drop tracks](/docs/webcodecs/track-transformation)[**Pause, resume and abort conversion**

Steer the conversion process](/docs/webcodecs/pause-resume-abort)[**Fix a MediaRecorder video**

Fix missing video duration and poor seeking performance](/docs/webcodecs/fix-mediarecorder-video)[**Resample audio to 16kHz**

Resample an audio track to 16kHz for use with Whisper](/docs/webcodecs/resample-audio-16khz)

## APIs[​](#apis "Direct link to APIs")

The following APIs are available:

[**convertMedia()**

Converts a video using WebCodecs and Media Parser](/docs/webcodecs/convert-media)[**getAvailableContainers()**

Get a list of containers `@remotion/webcodecs` supports.](/docs/webcodecs/get-available-containers)[**webcodecsController()**

Pause, resume and abort the conversion.](/docs/webcodecs/webcodecs-controller)[**canReencodeVideoTrack()**

Determine if a video track can be re-encoded](/docs/webcodecs/can-reencode-video-track)[**canReencodeAudioTrack()**

Determine if a audio track can be re-encoded](/docs/webcodecs/can-reencode-audio-track)[**canCopyVideoTrack()**

Determine if a video track can be copied without re-encoding](/docs/webcodecs/can-copy-video-track)[**canCopyAudioTrack()**

Determine if a audio track can be copied without re-encoding](/docs/webcodecs/can-copy-audio-track)[**getDefaultAudioCodec()**

Gets the default audio codec for a container if no other audio codec is specified.](/docs/webcodecs/get-default-audio-codec)[**getDefaultVideoCodec()**

Gets the default video codec for a container if no other audio codec is specified.](/docs/webcodecs/get-default-video-codec)[**defaultOnAudioTrackHandler()**

The default track transformation function for audio tracks.](/docs/webcodecs/default-on-audio-track-handler)[**defaultOnVideoTrackHandler()**

The default track transformation function for video tracks.](/docs/webcodecs/default-on-video-track-handler)[**getAvailableAudioCodecs()**

Get the audio codecs that can fit in a container.](/docs/webcodecs/get-available-audio-codecs)[**getAvailableVideoCodecs()**

Get the video codecs that can fit in a container.](/docs/webcodecs/get-available-video-codecs)[**convertAudioData()**

Change the format or sample rate of an `AudioData` object.](/docs/webcodecs/convert-audiodata)[**createAudioDecoder()**

Create an `AudioDecoder` object.](/docs/webcodecs/create-audio-decoder)[**createVideoDecoder()**

Create a `VideoDecoder` object.](/docs/webcodecs/create-video-decoder)[**extractFrames()**

Extract frames from a video at specific timestamps.](/docs/webcodecs/extract-frames)[**getPartialAudioData()**

Extract audio data from a specific time window of a media file.](/docs/webcodecs/get-partial-audio-data)[**rotateAndResizeVideoFrame()**

Rotate and resize a video frame.](/docs/webcodecs/rotate-and-resize-video-frame)[**webFsWriter**

Writer that saves to browser file system using File System Access API.](/docs/webcodecs/web-fs-writer)[**bufferWriter**

Writer that saves to an in-memory resizable ArrayBuffer.](/docs/webcodecs/buffer-writer)
