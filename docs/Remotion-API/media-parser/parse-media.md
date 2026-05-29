---
title: "parseMedia()"
source: https://www.remotion.dev/docs/media-parser/parse-media
---

# parseMedia()

warning

[We are phasing out Media Parser and are moving to Mediabunny](/blog/mediabunny)!

*Part of the [`@remotion/media-parser`](/docs/media-parser) package.*
*available from v4.0.190*

## Examples[​](#examples "Direct link to Examples")

```tsx
Parsing a hosted video

import {parseMedia} from '@remotion/media-parser';

const result = await parseMedia({
  src: 'https://remotion.media/video.mp4',
  fields: {
    durationInSeconds: true,
    dimensions: true,
  },
});

console.log(result.durationInSeconds); // 10
console.log(result.dimensions); // {width: 1920, height: 1080}Copy
```

```tsx
Parsing a local file

import {parseMedia} from '@remotion/media-parser';
import {nodeReader} from '@remotion/media-parser/node';

const result = await parseMedia({
  src: '/Users/jonnyburger/Downloads/video.mp4',
  fields: {
    durationInSeconds: true,
    dimensions: true,
  },
  reader: nodeReader,
});Copy
```

## API[​](#api "Direct link to API")

warning

**Unstable API**: This package is experimental. The API may change in the future.  
The API for getting video metadata is stable and may be used in production.

### `src`[​](#src "Direct link to src")

Either a local file path, or a URL, or a `File` or `Blob` object.

If you pass a local file path, you must also pass [`nodeReader`](/docs/media-parser/node-reader) as the `reader` argument.

### `fields?`[​](#fields "Direct link to fields")

An object specifying which fields you'd like to receive.  
If you like to receive the field, pass `true` as the value.

See [Available Fields](/docs/media-parser/fields) for a list of available fields.

### `reader?`[​](#reader "Direct link to reader")

A [reader](/docs/media-parser/readers) interface.

If you pass [`nodeReader`](/docs/media-parser/node-reader), you must pass a local file path as the `src` argument.

### `controller?`[​](#controller "Direct link to controller")

A [controller](/docs/media-parser/media-parser-controller) object that allows you to pause, resume and abort the parsing process.

### `onVideoTrack?`[​](#onvideotrack "Direct link to onvideotrack")

[A callback that is called when a video track is detected.](/docs/media-parser/samples)  
It receives an object with:

- `track` (of type [`MediaParserVideoTrack`](/docs/media-parser/types#mediaparservideotrack))
- `container` (of type [`MediaParserContainer`](/docs/media-parser/types#mediaparsercontainer))

You must return either `null` or a callback that is called for each sample that corresponds to the video track.

The `sample` has the type [`MediaParserVideoSample`](/docs/media-parser/types#mediaparservideosample), which is compatible with the mandatory fields for the WebCodecs [`EncodedVideoChunk`](https://developer.mozilla.org/en-US/docs/Web/API/EncodedVideoChunk) constructor.

```tsx
Reading video frames

import {parseMedia, MediaParserOnVideoTrack} from '@remotion/media-parser';

const onVideoTrack: MediaParserOnVideoTrack = ({track}) => {
  console.log(track);

  return (sample) => {
    console.log(new EncodedVideoChunk(sample));
  };
};Copy
```

### `onAudioTrack?`[​](#onaudiotrack "Direct link to onaudiotrack")

[A callback that is called when an audio track is detected.](/docs/media-parser/samples)  
It receives an object with:

- `track` (of type [`MediaParserAudioTrack`](/docs/media-parser/types#mediaparseraudiotrack))
- `container` (of type [`MediaParserContainer`](/docs/media-parser/types#mediaparsercontainer))

You must return either `null` or a callback that is called for each sample that corresponds to the audio track.

The `sample` has the type [`MediaParserAudioSample`](/docs/media-parser/types#mediaparseraudiosample), which is compatible with the mandatory fields for the WebCodecs [`EncodedAudioChunk`](https://developer.mozilla.org/en-US/docs/Web/API/EncodedAudioChunk) constructor.

```tsx
Reading audio frames

import {parseMedia, MediaParserOnAudioTrack} from '@remotion/media-parser';

const onAudioTrack: MediaParserOnAudioTrack = ({track}) => {
  console.log(track);

  return (sample) => {
    console.log(new EncodedAudioChunk(sample));
  };
};Copy
```

### `selectM3uStream?`[​](#selectm3ustream "Direct link to selectm3ustream")

A callback that is called when a `.m3u8` file is detected which has multiple streams.  
See [Stream selection](/docs/media-parser/stream-selection) for an example.

### `selectM3uAssociatedPlaylists?`[​](#selectm3uassociatedplaylists "Direct link to selectm3uassociatedplaylists")

A callback that is called after a M3U stream has been selected, allowing you to pick which auxiliary playlists should be parsed. Usually this is used for selecting an audio track.  
See [Stream selection](/docs/media-parser/stream-selection) for an example.

### `onParseProgress?`[​](#onparseprogress "Direct link to onparseprogress")

A callback that is called from time to time when bytes have been read from the media.  
It includes the following data:

```tsx
import {ParseMediaProgress} from '@remotion/media-parser';

(alias) type ParseMediaProgress = {
    bytes: number;
    percentage: number | null;
    totalBytes: number | null;
}
import ParseMediaProgress
```

note

You may make this an async function, and while it is not resolved, **the parsing process will be paused**.  
This is useful if you want to add a small delay inbetween progress steps to keep the UI interactive.

### `progressIntervalInMs?`[​](#progressintervalinms "Direct link to progressintervalinms")

*number*

The interval in milliseconds at which the [`onParseProgress`](#onparseprogress) callback is called.  
Default `100`. Set to `0` for unthrottled and synchronous updates.  
Note that updates are fired very often and updating the DOM often may slow down the conversion process.

### `makeSamplesStartAtZero`[​](#makesamplesstartatzero "Direct link to makesamplesstartatzero")

*boolean*

If this is set to true, the timestamps of the samples returned will be recalculated so they start at 0 instead of the timestamps that are contained in the file. Default `true`.

### `seekingHints?`[​](#seekinghints "Direct link to seekinghints")

An object that contains hints about the structure of the media file.

See [Seeking Hints](/docs/media-parser/seeking-hints) for more information.

### `logLevel?`[​](#loglevel "Direct link to loglevel")

One of `"error"`, `"warn"`, `"info"`, `"debug"`, `"trace"`.  
Default value: `"info"`, which logs only important information.

### `acknowledgeRemotionLicense?`[​](#acknowledgeremotionlicense "Direct link to acknowledgeremotionlicense")

Acknowledge the [Remotion License](https://remotion.dev/license) to make the console message disappear.

## Callbacks[​](#callbacks "Direct link to Callbacks")

Each field also has a callback that allows you to retrieve the value as soon as it is obtained without waiting for the function to resolve.

You do not have to add the field to the [`fields`](#fields) object if you use the callback.  
However, just like with [`fields`](#fields), adding a callback for a [slow field](/docs/media-parser/fast-and-slow) may require reading more of the file.

```tsx
Using a callback

import {parseMedia} from '@remotion/media-parser';

const result = await parseMedia({
  src: 'https://remotion.media/video.mp4',
  onDurationInSeconds: (durationInSeconds) => {
    console.log(durationInSeconds);
  },
  onDimensions: (dimensions) => {
    console.log(dimensions);
  },
});Copy
```

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/media-parser/src/parse-media.ts)
- [`@remotion/media-parser`](/docs/media-parser)
