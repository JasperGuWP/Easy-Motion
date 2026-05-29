---
title: "canReencodeVideoTrack()"
source: https://www.remotion.dev/docs/webcodecs/can-reencode-video-track
---

# canReencodeVideoTrack()

warning

[We are phasing out Remotion WebCodecs and are moving to Mediabunny](/blog/mediabunny)!

*Part of the [`@remotion/webcodecs`](/docs/webcodecs) package.*

warning

**Unstable API**: This package is experimental. We might change the API at any time, until we remove this notice.

Given a `VideoTrack`, determine if it can be re-encoded to another track.

You can obtain a `VideoTrack` using [`parseMedia()`](/docs/media-parser/parse-media) or during the conversion process using the [`onVideoTrack`](/docs/webcodecs/convert-media#onvideotrack) callback of [`convertMedia()`](/docs/webcodecs/convert-media).

## Examples[​](#examples "Direct link to Examples")

```tsx
Check if video tracks can be re-encoded to VP8

import {parseMedia} from '@remotion/media-parser';
import {canReencodeVideoTrack} from '@remotion/webcodecs';

const {tracks} = await parseMedia({
  src: 'https://remotion.media/BigBuckBunny.mp4',
  fields: {
    tracks: true,
  },
});

const videoTracks = tracks.filter((t) => t.type === 'video');

for (const track of videoTracks) {
  await canReencodeVideoTrack({
    track,
    videoCodec: 'vp8',
    resizeOperation: null,
    rotate: null,
  });
}Copy
```

```tsx
Convert a video track to VP8, otherwise drop it

import {convertMedia, canReencodeVideoTrack} from '@remotion/webcodecs';

await convertMedia({
  src: 'https://remotion.media/BigBuckBunny.mp4',
  container: 'webm',
  videoCodec: 'vp8',
  audioCodec: 'opus',
  onVideoTrack: async ({track, resizeOperation, rotate}) => {
    const canReencode = await canReencodeVideoTrack({
      track,
      videoCodec: 'vp8',
      resizeOperation,
      rotate,
    });

    if (canReencode) {
      return {type: 'reencode', videoCodec: 'vp8'};
    }

    return {type: 'drop'};
  },
});Copy
```

## API[​](#api "Direct link to API")

### `track`[​](#track "Direct link to track")

A `VideoTrack` object.

### `videoCodec`[​](#videocodec "Direct link to videocodec")

*string* `ConvertMediaVideoCodec`

One of the supported video codecs: `"vp8"`, `"vp9"`.

### `resizeOperation`[​](#resizeoperation "Direct link to resizeoperation")

The [resize operation](/docs/webcodecs/resize-a-video) you would like to apply.

### `rotate`[​](#rotate "Direct link to rotate")

The [rotate operation](/docs/webcodecs/rotate-a-video) you would like to apply.

## Return value[​](#return-value "Direct link to Return value")

Returns a `Promise<boolean>`.

## See also[​](#see-also "Direct link to See also")

- [Source code for this function on GitHub](https://github.com/remotion-dev/remotion/blob/main/packages/webcodecs/src/can-reencode-video-track.ts)
- [`convertMedia()`](/docs/webcodecs/convert-media)
- [`parseMedia()`](/docs/media-parser/parse-media)
