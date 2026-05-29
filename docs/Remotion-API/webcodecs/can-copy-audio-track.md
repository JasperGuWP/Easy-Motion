---
title: "canCopyAudioTrack()"
source: https://www.remotion.dev/docs/webcodecs/can-copy-audio-track
---

# canCopyAudioTrack()

warning

[We are phasing out Remotion WebCodecs and are moving to Mediabunny](/blog/mediabunny)!

*Part of the [`@remotion/webcodecs`](/docs/webcodecs) package.*

warning

**Unstable API**: This package is experimental. We might change the API at any time, until we remove this notice.

Given an `AudioTrack`, determine if it can be copied to the output without re-encoding.

You can obtain an `AudioTrack` using [`parseMedia()`](/docs/media-parser/parse-media) or during the conversion process using the [`onAudioTrack`](/docs/webcodecs/convert-media#onaudiotrack) callback of [`convertMedia()`](/docs/webcodecs/convert-media).

## Examples[​](#examples "Direct link to Examples")

```tsx
Check if an audio track can be copied

import {parseMedia} from '@remotion/media-parser';
import {canCopyAudioTrack} from '@remotion/webcodecs';

const {tracks, container} = await parseMedia({
  src: 'https://remotion.media/BigBuckBunny.mp4',
  fields: {
    tracks: true,
    container: true,
  },
});

const audioTracks = tracks.filter((t) => t.type === 'audio');

for (const track of audioTracks) {
  canCopyAudioTrack({
    inputCodec: track.codecEnum,
    outputContainer: 'webm',
    inputContainer: container,
    outputAudioCodec: null,
  }); // bool
}Copy
```

```tsx
Copy an audio track to Opus, otherwise drop it

import {convertMedia, canCopyAudioTrack} from '@remotion/webcodecs';

await convertMedia({
  src: 'https://remotion.media/BigBuckBunny.mp4',
  container: 'webm',
  videoCodec: 'vp8',
  audioCodec: 'opus',
  onAudioTrack: async ({track, outputContainer, inputContainer}) => {
    const canCopy = canCopyAudioTrack({
      inputCodec: track.codecEnum,
      outputContainer,
      inputContainer,
      outputAudioCodec: null,
    });

    if (canCopy) {
      return {type: 'copy'};
    }

    // Just to keep the example brief, in reality, you would re-encode the track here
    return {type: 'drop'};
  },
});Copy
```

## API[​](#api "Direct link to API")

### `inputCodec`[​](#inputcodec "Direct link to inputcodec")

*string* `MediaParserAudioCodec`

The codec of the input audio track.

### `inputContainer`[​](#inputcontainer "Direct link to inputcontainer")

*string* `MediaParserContainer`

The container format of the input media.

### `outputContainer`[​](#outputcontainer "Direct link to outputcontainer")

*string* `ConvertMediaContainer`

The container format of the output media.

### `outputAudioCodec`[​](#outputaudiocodec "Direct link to outputaudiocodec")

*string | null* `ConvertMediaAudioCodec`

The desired audio codec of the output media. If `null`, it means you don't care about the audio codec as long as it can be copied.

## Return value[​](#return-value "Direct link to Return value")

Returns a `boolean`.

## See also[​](#see-also "Direct link to See also")

- [Source code for this function on GitHub](https://github.com/remotion-dev/remotion/blob/main/packages/webcodecs/src/can-copy-audio-track.ts)
- [`canCopyVideoTrack()`](/docs/webcodecs/can-copy-video-track)
- [`canReencodeAudioTrack()`](/docs/webcodecs/can-reencode-audio-track)
- [`convertMedia()`](/docs/webcodecs/convert-media)
