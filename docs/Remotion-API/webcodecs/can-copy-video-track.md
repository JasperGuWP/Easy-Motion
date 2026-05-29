---
title: "canCopyVideoTrack()"
source: https://www.remotion.dev/docs/webcodecs/can-copy-video-track
---

# canCopyVideoTrack()

warning

[We are phasing out Remotion WebCodecs and are moving to Mediabunny](/blog/mediabunny)!

*Part of the [`@remotion/webcodecs`](/docs/webcodecs) package.*

🚧 Unstable API

This package is experimental.  
We might change the API at any time, until we remove this notice.

Given a `VideoTrack`, determine if it can be copied to the output without re-encoding.

You can obtain a `VideoTrack` using [`parseMedia()`](/docs/media-parser/parse-media) or during the conversion process using the [`onVideoTrack`](/docs/webcodecs/convert-media#onvideotrack) callback of [`convertMedia()`](/docs/webcodecs/convert-media).

## Examples[​](#examples "Direct link to Examples")

```tsx
Check if a video tracks can be copied

import {parseMedia} from '@remotion/media-parser';
import {canCopyVideoTrack} from '@remotion/webcodecs';

const {tracks, container} = await parseMedia({
  src: 'https://remotion.media/BigBuckBunny.webm',
  fields: {
    tracks: true,
    container: true,
  },
});

const videoTracks = tracks.filter((t) => t.type === 'video');

for (const track of videoTracks) {
  canCopyVideoTrack({
    outputContainer: 'webm',
    inputTrack: track,
    inputContainer: container,
    rotationToApply: 0,
    resizeOperation: null,
    outputVideoCodec: null,
  }); // boolean
}Copy
```

```tsx
Copy a video track to VP8, otherwise drop it

import {convertMedia, canCopyVideoTrack} from '@remotion/webcodecs';

await convertMedia({
  src: 'https://remotion.media/BigBuckBunny.webm',
  container: 'webm',
  videoCodec: 'vp8',
  audioCodec: 'opus',
  onVideoTrack: async ({track, inputContainer, outputContainer}) => {
    const canCopy = canCopyVideoTrack({
      outputContainer,
      inputTrack: track,
      inputContainer,
      rotationToApply: 0,
      resizeOperation: null,
      outputVideoCodec: null,
    });

    if (canCopy) {
      return {type: 'copy'};
    }

    // In reality, you would re-encode the track here
    return {type: 'drop'};
  },
});Copy
```

## API[​](#api "Direct link to API")

### `inputTrack`[​](#inputtrack "Direct link to inputtrack")

*string* `VideoTrack`

The input video track.

### `rotationToApply`[​](#rotationtoapply "Direct link to rotationtoapply")

*number*

The number of degrees to rotate the video track.

### `inputContainer`[​](#inputcontainer "Direct link to inputcontainer")

*string* `MediaParserContainer`

The container format of the input media.

### `outputContainer`[​](#outputcontainer "Direct link to outputcontainer")

*string* `ConvertMediaContainer`

The container format of the output media.

### `resizeOperation`[​](#resizeoperation "Direct link to resizeoperation")

*string* `ResizeOperation`

The [resize operation](/docs/webcodecs/resize-a-video) to apply to the video track.

### `outputVideoCodec`[​](#outputvideocodec "Direct link to outputvideocodec")

*string | null* `ConvertMediaVideoCodec`

The desired video codec of the output media. If `null`, it means you don't care about the video codec as long as it can be copied.

## Rotation behavior[​](#rotation-behavior "Direct link to Rotation behavior")

Any `rotationToApply` is in addition to an auto-rotation that is applied by default to fix the orientation of the video track.

If `rotationToApply` is not the same amount of rotation as `inputRotation`, this function will always return `false`, because rotation cannot be performed without re-encoding.

See: [Rotating a video](/docs/webcodecs/rotate-a-video)

## Return value[​](#return-value "Direct link to Return value")

Returns a `boolean`.

## See also[​](#see-also "Direct link to See also")

- [Source code for this function on GitHub](https://github.com/remotion-dev/remotion/blob/main/packages/webcodecs/src/can-copy-video-track.ts)
- [`canReencodeVideoTrack()`](/docs/webcodecs/can-reencode-video-track)
- [`convertMedia()`](/docs/webcodecs/convert-media)
