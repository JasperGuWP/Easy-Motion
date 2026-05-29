---
title: "@remotion/media-parser"
source: https://www.remotion.dev/docs/media-parser/
---

# @remotion/media-parser

warning

[We are phasing out Media Parser and are moving to Mediabunny](/blog/mediabunny)!

  
  

This is a package that parses video and audio files to extract metadata and samples.

Design goals:

- [Support all major containers](/docs/media-parser/format-support): `.mp4`, `.mov`, `.webm`, `.mkv`, `.avi`, `.m3u8`, `.ts`, `.mp3`, `.wav`, `.aac`, `.m4a` and `.flac`.
- [Easily get various information](/docs/media-parser/fields) from multimedia files
- [Work in the browser, Node.js and Bun](/docs/media-parser/runtime-support)
- [Satisfy your query with minimal fetching](/docs/media-parser/fast-and-slow)
- [Functional TypeScript API](/docs/media-parser/parse-media)
- [Be useful when passing unsupported media](/docs/media-parser/foreign-file-types)
- [Allow decoding video frames and audio samples using WebCodecs](/docs/media-parser/webcodecs)
- [Pausable, resumable and cancellable](/docs/media-parser/pause-resume-abort)
- [Be able to seek to a different position in a media file](/docs/media-parser/seeking)
- No dependencies

## Introduction video[​](#introduction-video "Direct link to Introduction video")

  

## Installation[​](#installation "Direct link to Installation")

- Remotion CLI- npm- bun- pnpm- yarn

```tsx
npx remotion add @remotion/media-parser
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

## Hello World[​](#hello-world "Direct link to Hello World")

Get metadata from a video file - [over 20 different fields are supported.](/docs/media-parser/fields)

```tsx
Get the duration and codec of a video

import {parseMedia} from '@remotion/media-parser';

const {durationInSeconds, videoCodec} = await parseMedia({
  src: 'https://remotion.media/video.mp4',
  fields: {
    durationInSeconds: true,
    videoCodec: true,
  },
});

console.log(durationInSeconds); // 5.056;
console.log(videoCodec); // 'h264';Copy
```

Extract samples from a video file - [supports WebCodecs](/docs/media-parser/webcodecs).

```tsx
Extract samples from a video

import {parseMedia} from '@remotion/media-parser';

await parseMedia({
  src: 'https://remotion.media/video.mp4',
  onVideoTrack: ({track}) => {
    // Get information about the
    console.log(track.width);
    console.log(track.height);
    return (sample) => {
      // Retrieve samples as they are extracted
      console.log(sample.timestamp); // 0
      console.log(sample.data); // Uint8Array(12345)
    };
  },
});Copy
```

What are samples?

Samples contain audio or video data - but they are compressed using codecs like AAC for audio or H.264 for video.  
You can turn audio samples into a waveform and video samples into images by decoding them.

## Guide[​](#guide "Direct link to Guide")

[**Getting video metadata**

Simple examples of extracting video metadata](/docs/media-parser/metadata)[**Available fields**

Information you can get using the media parser](/docs/media-parser/fields)[**Fast and slow operations**

Efficently use `parseMedia()`](/docs/media-parser/fast-and-slow)[**Extract samples**

Extract video and audio samples from a media file](/docs/media-parser/samples)[**Readers**

Read from a variety of sources](/docs/media-parser/readers)[**Pause, resume and abort**

Steer the parsing process](/docs/media-parser/pause-resume-abort)[**Seeking**

Seek to a different position in a media file](/docs/media-parser/seeking)[**Format support**

What you can parse](/docs/media-parser/format-support)[**Runtime support**

Where you can run it](/docs/media-parser/runtime-support)[**Extract ID3 tags and EXIF data**

Get embedded tags from video files](/docs/media-parser/tags)[**Web Workers**

Parse a media file in the browser on a separate thread.](/docs/media-parser/workers)[**Download and parse**

Download a media file to disk and parse it simultaneously](/docs/media-parser/download-and-parse)[**Foreign file types**

Get information from the errors when passing unsupported file types](/docs/media-parser/foreign-file-types)[**WebCodecs**

Decode video and audio frames in the browser](/docs/media-parser/webcodecs)[**Stream selection**

Choose which streams to use in a HLS Playlist](/docs/media-parser/stream-selection)

## APIs[​](#apis "Direct link to APIs")

The following APIs are available:

[**parseMedia()**

Parse a media file.](/docs/media-parser/parse-media)[**downloadAndParseMedia()**

Download and parse a media file.](/docs/media-parser/download-and-parse-media)[**parseMediaOnWebWorker()**

Parse a media file in the browser on a separate thread.](/docs/media-parser/parse-media-on-web-worker)[**parseMediaOnServerWorker()**

Parse a media file on the server on a separate thread.](/docs/media-parser/parse-media-on-server-worker)[**mediaParserController()**

Pause, resume and abort the parsing.](/docs/media-parser/media-parser-controller)[**hasBeenAborted()**

Determine from an error if the parsing has been aborted.](/docs/media-parser/has-been-aborted)[**WEBCODECS\_TIMESCALE**

The global timescale (`1_000_000`) of WebCodecs as a constant.](/docs/media-parser/webcodecs-timescale)

## Readers[​](#readers "Direct link to Readers")

Choose the appropriate reader for your file source:

[**nodeReader**

Read a file from the local file system.](/docs/media-parser/node-reader)[**webReader**

Read a file from a `File` or from a URL.](/docs/media-parser/web-reader)[**universalReader**

Read a file from a `File`, from a URL or from the local file system](/docs/media-parser/universal-reader)

## Writers[​](#writers "Direct link to Writers")

Choose how to store files downloaded using [`downloadAndParseMedia()`](/docs/media-parser/download-and-parse-media):

[**nodeWriter**

Write a file to the local file system using Node.](/docs/media-parser/node-writer)

## Types[​](#types "Direct link to Types")

[**TypeScript types**

Reference for the types returned by Media Parser.](/docs/media-parser/types)

## How does this compare to FFmpeg?[​](#how-does-this-compare-to-ffmpeg "Direct link to How does this compare to FFmpeg?")

- Media Parser specializes for JavaScript and on the web.  
  It is designed to embrace the language and make use of the APIs that JavaScript has to offer.
- Unlike FFmpeg, Remotion Media Parser does not have functionality for decoding and encoding – it only parses media files.  
  Instead, we hope you combine it with WebCodecs, the native API built into browsers.
- Media Parser has no command line interface and cannot be integrated into native applications.

## How does this compare to MP4Box.js?[​](#how-does-this-compare-to-mp4boxjs "Direct link to How does this compare to MP4Box.js?")

MP4Box.js does a better job at parsing the ISO Base Media Format (`.mp4`, `.m4a`, `.mov`) and supports reading more information from it.  
Remotion Media Parser supports more [container formats](/docs/media-parser/format-support), with the goal that it can handle arbitrary user-provided media files.

## Thank you[​](#thank-you "Direct link to Thank you")

|  |  |
| --- | --- |
| [Tella](https://tella.com) for boosting the development of @remotion/media-parser with $10.000! | |

## License[​](#license "Direct link to License")

[Remotion License](https://remotion.dev/license)
