---
title: "convertMedia()v4.0.229"
source: https://www.remotion.dev/docs/webcodecs/convert-media
---

warning

[We are phasing out Remotion WebCodecs and are moving to Mediabunny](/blog/mediabunny)!

# convertMedia()[v4.0.229](https://github.com/remotion-dev/remotion/releases/v4.0.229)

*Part of the [`@remotion/webcodecs`](/docs/webcodecs) package.*

💼 Important License Disclaimer

This package is licensed under the [Remotion License](/docs/license).  
We consider a team of 4 or more people a "company".

  

**For "companies"**: A Remotion Company license needs to be obtained to use this package.  
 In a future version of `@remotion/webcodecs`, this package will also require the purchase of a newly created "WebCodecs Conversion Seat". [Get in touch](/contact) with us if you are planning to use this package.

  

**For individuals and teams up to 3:** You can use this package for free.

  

This is a short, non-binding explanation of our license. See the [License](/docs/license) itself for more details.

🚧 Unstable API

This package is experimental.  
We might change the API at any time, until we remove this notice.

Re-encodes a video using [WebCodecs](https://developer.mozilla.org/en-US/docs/Web/API/WebCodecs_API) and [`@remotion/media-parser`](/docs/media-parser).

```tsx
Converting a video

import {convertMedia} from '@remotion/webcodecs';

const result = await convertMedia({
  src: 'https://remotion.media/BigBuckBunny.mp4',
  container: 'webm',
});

// Save the converted video as a Blob
const blob = await result.save();Copy
```

## Return value[​](#return-value "Direct link to Return value")

`convertMedia()` returns a Promise that resolves to a `ConvertMediaResult` object with the following properties:

### `save()`[​](#save "Direct link to save")

*Function that returns `Promise<Blob>`*

Call this function to get the converted video as a `Blob`. You can then use this blob to:

- Create a download link
- Upload to a server
- Display in a video element
- Store in IndexedDB

```tsx
Saving and downloading a converted video

import {convertMedia} from '@remotion/webcodecs';

const result = await convertMedia({
  src: 'https://remotion.media/BigBuckBunny.mp4',
  container: 'webm',
});

const blob = await result.save();

// Create a download link
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'converted-video.webm';
document.body.appendChild(a);
a.click();
document.body.removeChild(a);
URL.revokeObjectURL(url);Copy
```

### `remove()`[​](#remove "Direct link to remove")

*Function that returns `Promise<void>`*

Call this function to clean up any temporary resources created during the conversion process.

### `finalState`[​](#finalstate "Direct link to finalstate")

*object of type `ConvertMediaProgress`*

Contains the final state of the conversion process, including statistics about the conversion.

## API[​](#api "Direct link to API")

### `src`[​](#src "Direct link to src")

A URL or `File`/`Blob`, or a local file path.

If passing a local file, tracks can only be copied, and the [`reader`](#reader) field must be set to [`nodeReader`](/docs/media-parser/node-reader).

### `container`[​](#container "Direct link to container")

*string* `ConvertMediaContainer`

The container format to convert to. Currently, `"mp4"`, `"webm"` and `"wav"` is supported.

### `expectedDurationInSeconds?`[​](#expecteddurationinseconds "Direct link to expecteddurationinseconds")

*number*

Pass the expected duration of the output video in seconds, so that the size of the MP4 metadata section can be estimated well. If the value is not passed, 2MB will be allocated for the MP4 metadata section.

If the size is exceeded (for videos which are around 1 hour or longer), the render may fail in the end.

### `expectedFrameRate?`[​](#expectedframerate "Direct link to expectedframerate")

*number*

Pass the expected frame rate of the output video, so that the size of the MP4 metadata section can be estimated well. If the value is not passed, 60 will be used as a conservative fallback.

### `videoCodec?`[​](#videocodec "Direct link to videocodec")

*string* `ConvertMediaVideoCodec`

The video codec to convert to. Currently, `"h264"`, `"h265"`, `"vp8"` and `"vp9"` are supported.  
The default is defined by [`getDefaultVideoCodec()`](/docs/webcodecs/get-default-video-codec).  
If a [`onVideoTrack`](#onvideotrack) handler is provided, it will override this setting.

### `audioCodec?`[​](#audiocodec "Direct link to audiocodec")

*string* `ConvertMediaAudioCodec`

The audio codec to convert to. Currently, only `"opus"` is supported.  
The default is defined by [`getDefaultAudioCodec()`](/docs/webcodecs/get-default-audio-codec).  
If an [`onAudioTrack`](#onaudiotrack) handler is provided, it will override this setting.

### `controller?`[​](#controller "Direct link to controller")

A [controller](/docs/webcodecs/webcodecs-controller) object that allows you to pause, resume and abort the conversion process.

### `reader?`[​](#reader "Direct link to reader")

A [reader](/docs/media-parser/readers) interface.

Default value: `webReader`, which allows URLs and `File` objects.

### `rotate?`[​](#rotate "Direct link to rotate")

*number*

The number of degrees to rotate the video. See [Rotate a video](/docs/webcodecs/rotate-a-video) for more information.

### `resize?`[​](#resize "Direct link to resize")

*object* `ResizeOperation`

Resize the video. See [Resize a video](/docs/webcodecs/resize-a-video) for more information.

### `logLevel?`[​](#loglevel "Direct link to loglevel")

*string* `LogLevel`

One of `"error"`, `"warn"`, `"info"`, `"debug"`, `"trace"`.  
Default value: `"info"`, which logs only important information.

### `onProgress?`[​](#onprogress "Direct link to onprogress")

*Function* `ConvertMediaOnProgress`

Allows receiving progress updates. The following fields are available:

```tsx
import type {ConvertMediaOnProgress, ConvertMediaProgress} from '@remotion/webcodecs';

export const onProgress: ConvertMediaOnProgress = ({decodedVideoFrames, decodedAudioFrames, encodedVideoFrames, encodedAudioFrames, bytesWritten, millisecondsWritten, expectedOutputDurationInMs, overallProgress}: ConvertMediaProgress) => {
  console.log(decodedVideoFrames);

(parameter) decodedVideoFrames: number

  console.log(decodedAudioFrames);

(parameter) decodedAudioFrames: number

  console.log(encodedVideoFrames);

(parameter) encodedVideoFrames: number

  console.log(encodedAudioFrames);

(parameter) encodedAudioFrames: number

  console.log(bytesWritten);

(parameter) bytesWritten: number

  console.log(millisecondsWritten);

(parameter) millisecondsWritten: number

  console.log(expectedOutputDurationInMs);

(parameter) expectedOutputDurationInMs: number | null

  console.log(overallProgress);

(parameter) overallProgress: number | null

};Copy
```

### `onVideoFrame?`[​](#onvideoframe "Direct link to onvideoframe")

*Function* `ConvertMediaOnVideoFrame`

Allows you to hook into the video frames. The frames are [`VideoFrame`](https://developer.mozilla.org/en-US/docs/Web/API/VideoFrame) objects.

```tsx
import type {ConvertMediaOnVideoFrame} from '@remotion/webcodecs';

export const onVideoFrame: ConvertMediaOnVideoFrame = ({frame}) => {
  console.log(frame);

(parameter) frame: VideoFrame

  // Do something with the frame, for example:
  // - Draw to a canvas
  // - Modify the frame

  // Then return the frame to be used for encoding.
  return frame;
};Copy
```

The callback function may be async.

When the function returns, the returned frame is used for video encoding.  
You may return the same frame or replace it with a new `VideoFrame` object.

After the function returns, `convertMedia()` will call [`.close()`](https://developer.mozilla.org/en-US/docs/Web/API/VideoFrame/close) on the input and output frames.  
This will destroy the frame and free up memory.
If you need a reference to the frame that lasts longer than the lifetime of this function, you must call [`.clone()`](https://developer.mozilla.org/en-US/docs/Web/API/VideoFrame/clone) on it.

If you return a different frame than the one you received, it must have the same values for `codedWidth`, `codedHeight`, `displayWidth` and `displayHeight`, `timestamp` and `duration` as the input frame.

### `onAudioData?`[​](#onaudiodata "Direct link to onaudiodata")

*Function* `ConvertMediaOnAudioData`

Allows you to hook into the audio data. The items are native [`AudioData`](https://developer.mozilla.org/en-US/docs/Web/API/AudioData) objects.

```tsx
import type {ConvertMediaOnAudioData} from '@remotion/webcodecs';

export const onAudioData: ConvertMediaOnAudioData = ({audioData}) => {
  console.log(audioData);

(parameter) audioData: AudioData

  // Do something with the audiodata, for example:
  // - Change the pitch
  // - Lower the volume

  // Then return the frame to be used for encoding.
  return audioData;
};Copy
```

The callback function may be async.

When the function returns, the returned audio data is used for audio encoding.  
You may return the same audio data or replace it with a new [`AudioData`](https://developer.mozilla.org/en-US/docs/Web/API/AudioData) object.

After the function returns, `convertMedia()` will call [`.close()`](https://developer.mozilla.org/en-US/docs/Web/API/AudioData/close) on the input and output audio data.  
This will destroy the audio data and free up memory.
If you need a reference to the audio data that lasts longer than the lifetime of this function, you must call [`.clone()`](https://developer.mozilla.org/en-US/docs/Web/API/AudioData/clone) on it.

If you return a different audio data than the one you received, it should have the same [`duration`](https://developer.mozilla.org/en-US/docs/Web/API/AudioData/duration), [`numberOfChannels`](https://developer.mozilla.org/en-US/docs/Web/API/AudioData/numberOfChannels), [`sampleRate`](https://developer.mozilla.org/en-US/docs/Web/API/AudioData/sampleRate), [`timestamp`](https://developer.mozilla.org/en-US/docs/Web/API/AudioData/format), [`numberOfChannels`](https://developer.mozilla.org/en-US/docs/Web/API/AudioData/timestamp), [`format`](https://developer.mozilla.org/en-US/docs/Web/API/AudioData/format) and [`numberOfChannels`](https://developer.mozilla.org/en-US/docs/Web/API/AudioData/numberOfChannels) as the input audio data.

### `writer?`[​](#writer "Direct link to writer")

*object* `WriterInterface`

A writer interface. The following interfaces are available:

```tsx
Buffer writer

import {bufferWriter} from '@remotion/webcodecs/buffer';

(alias) const bufferWriter: WriterInterface
import bufferWriter
```

Write to a resizable Array Buffer.

```tsx
Web File System writer

import {canUseWebFsWriter, webFsWriter} from '@remotion/webcodecs/web-fs';

(alias) const webFsWriter: WriterInterface
import webFsWriter

await canUseWebFsWriter(); // booleanCopy
```

Use the Web File System API to write to a file.

By default the writer is `webFsWriter`.

### `onAudioTrack?`[​](#onaudiotrack "Direct link to onaudiotrack")

*Function* `ConvertMediaOnAudioTrackHandler`

Take control of what to do for each audio track in the file: Re-encoding, copying, or dropping.  
See [Track Transformation](/docs/webcodecs/track-transformation) for a guide on how to use this callback.

### `onVideoTrack?`[​](#onvideotrack "Direct link to onvideotrack")

*Function* `ConvertMediaOnVideoTrackHandler`

Take control of what to do for each video track in the file: Re-encoding, copying, or dropping.  
See [Track Transformation](/docs/webcodecs/track-transformation) for a guide on how to use this callback.

### `selectM3uStream?`[​](#selectm3ustream "Direct link to selectm3ustream")

*Function* `SelectM3uStreamFn`

A callback that is called when a `.m3u8` file is detected which has multiple streams.  
See [Stream selection](/docs/media-parser/stream-selection) for an example.

### `progressIntervalInMs?`[​](#progressintervalinms "Direct link to progressintervalinms")

*number*

The interval in milliseconds at which the `onProgress` callback is called.  
Default `100`. Set to `0` for unthrottled updates.  
Note that updates are fired very often and updating the DOM often may slow down the conversion process.

### `seekingHints?`[​](#seekinghints "Direct link to seekinghints")

An object that contains hints about the structure of the media file.

See [Seeking Hints](/docs/media-parser/seeking-hints) for more information.

### `fields?` and Callbacks[​](#fields-and-callbacks "Direct link to fields-and-callbacks")

You can obtain information about the video file while you are converting it.  
This feature is inherited from [`parseMedia()`](/docs/media-parser/parse-media), but only the callback-style API is available.

```tsx
Converting a video

import {convertMedia} from '@remotion/webcodecs';

const result = await convertMedia({
  src: 'https://remotion.media/BigBuckBunny.mp4',
  container: 'webm',
  videoCodec: 'vp8',
  audioCodec: 'opus',
  fields: {
    size: true,
  },
  onSize: (size) => {
    console.log(size);

(parameter) size: number | null

  },
});

const blob = await result.save();Copy
```

## License[​](#license "Direct link to License")

[See notes about `@remotion/webcodecs`](/docs/webcodecs#-license-disclaimer).

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/webcodecs/src/convert-media.ts)
- [`@remotion/webcodecs`](/docs/webcodecs)
- [`parseMedia()`](/docs/media-parser/parse-media)
