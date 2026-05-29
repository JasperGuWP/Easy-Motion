---
title: "getDefaultAudioCodec()"
source: https://www.remotion.dev/docs/webcodecs/get-default-audio-codec
---

# getDefaultAudioCodec()

warning

[We are phasing out Remotion WebCodecs and are moving to Mediabunny](/blog/mediabunny)!

*Part of the [`@remotion/webcodecs`](/docs/webcodecs) package.*

warning

**Unstable API**: This package is experimental. We might change the API at any time, until we remove this notice.

Gets the default audio codec for a container that `@remotion/webcodecs` uses if no other audio codec was specified.

```tsx
Get the default audio codec for a container

import {getDefaultAudioCodec} from '@remotion/webcodecs';

getDefaultAudioCodec({container: 'webm'}); // 'opus'Copy
```

Currently, the only supported container is `webm`, for which the default audio codec is `opus`.

## Default audio codecs[​](#default-audio-codecs "Direct link to Default audio codecs")

|  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Container Default audio codec|  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | | webm `"opus"`| mp4 `"aac"`| wav `"wav"` | | | | | | | |

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/webcodecs/src/get-default-audio-codec.ts)
- [`getDefaultVideoCodec()`](/docs/webcodecs/get-default-video-codec)
