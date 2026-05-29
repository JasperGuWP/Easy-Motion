---
title: "getDefaultVideoCodec()"
source: https://www.remotion.dev/docs/webcodecs/get-default-video-codec
---

# getDefaultVideoCodec()

warning

[We are phasing out Remotion WebCodecs and are moving to Mediabunny](/blog/mediabunny)!

*Part of the [`@remotion/webcodecs`](/docs/webcodecs) package.*

warning

**Unstable API**: This package is experimental. We might change the API at any time, until we remove this notice.

Gets the default video codec for a container that `@remotion/webcodecs` uses if no other audio codec was specified.

```tsx
Get the default video codec for a container

import {getDefaultVideoCodec} from '@remotion/webcodecs';

getDefaultVideoCodec({container: 'webm'}); // 'vp8'Copy
```

## Default video codecs[​](#default-video-codecs "Direct link to Default video codecs")

|  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Container Default video codec|  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | | webm `"vp8"`| mp4 `"h264"`| wav `null` | | | | | | | |

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/webcodecs/src/get-default-video-codec.ts)
- [`getDefaultAudioCodec()`](/docs/webcodecs/get-default-audio-codec)
