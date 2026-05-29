---
title: "getPartialAudioData()v4.0.328"
source: https://www.remotion.dev/docs/webcodecs/get-partial-audio-data
---

warning

[We are phasing out Remotion WebCodecs and are moving to Mediabunny](/blog/mediabunny)!

warning

This package is experimental.  
We might change the API at any time, until we remove this notice.

# getPartialAudioData()[v4.0.328](https://github.com/remotion-dev/remotion/releases/v4.0.328)

*Part of the [`@remotion/webcodecs`](/docs/webcodecs) package.*

Extracts audio data from a specific time window of a media file and returns it as a Float32Array.

```tsx
Extract audio data from 10-20 seconds

import {getPartialAudioData} from '@remotion/webcodecs';

const audioData = await getPartialAudioData({
  src: 'https://remotion.media/audio.wav',
  fromSeconds: 10,
  toSeconds: 20,
  channelIndex: 0, // Left channel for stereo audio
  signal: new AbortController().signal,
});

console.log('Audio samples:', audioData.length);
console.log('First sample value:', audioData[0]);Copy
```

## API[​](#api "Direct link to API")

### `src`[​](#src "Direct link to src")

**string**

A URL pointing to a media file, or a `File`/`Blob` object.

If it is a remote URL, it must support CORS and the server must support byte-range requests for efficient seeking.

### `fromSeconds`[​](#fromseconds "Direct link to fromseconds")

**number**

The start time in seconds from which to extract audio data.

### `toSeconds`[​](#toseconds "Direct link to toseconds")

**number**

The end time in seconds until which to extract audio data.

### `channelIndex`[​](#channelindex "Direct link to channelindex")

**number**

The audio channel index to extract. For stereo audio:

- `0` = Left channel
- `1` = Right channel

For mono audio, use `0`.

### `signal`[​](#signal "Direct link to signal")

**AbortSignal**

An [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) to cancel the operation.

```tsx
Using AbortController

import {getPartialAudioData} from '@remotion/webcodecs';
import {hasBeenAborted} from '@remotion/media-parser';

const controller = new AbortController();

// Cancel after 5 seconds
setTimeout(() => controller.abort(), 5000);

try {
  const audioData = await getPartialAudioData({
    src: 'https://remotion.media/audio.wav',
    fromSeconds: 0,
    toSeconds: 30,
    channelIndex: 0,
    signal: controller.signal,
  });
} catch (err) {
  if (hasBeenAborted(err)) {
    console.log('Operation was cancelled');
  }
}Copy
```

## Return value[​](#return-value "Direct link to Return value")

Returns a `Promise<Float32Array>` containing the audio samples for the requested time window and channel.

The sample values are normalized floating-point numbers typically in the range of -1.0 to 1.0.

## Notes[​](#notes "Direct link to Notes")

- The function uses a small buffer (0.1 seconds) around the requested time window to ensure accurate extraction of chunks that span across boundaries
- For multi-channel audio, samples are de-interleaved to extract the specific channel
- The function leverages [`@remotion/media-parser`](/docs/media-parser) for parsing and WebCodecs for efficient audio decoding
- Sample rate and other audio characteristics depend on the source media file

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/webcodecs/src/get-partial-audio-data.ts)
- [`createAudioDecoder()`](/docs/webcodecs/create-audio-decoder)
- [`@remotion/media-parser`](/docs/media-parser)
- [`@remotion/webcodecs`](/docs/webcodecs)
