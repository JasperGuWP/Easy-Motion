---
title: "getAvailableAudioCodecs()"
source: https://www.remotion.dev/docs/webcodecs/get-available-audio-codecs
---

# getAvailableAudioCodecs()

warning

[We are phasing out Remotion WebCodecs and are moving to Mediabunny](/blog/mediabunny)!

Given a container, get a list of audio codecs that the container can hold.  
This does not mean that a any audio stream of this codec can be put into the container.  
Use [`canReencodeAudioTrack()`](/docs/webcodecs/can-reencode-audio-track) and [`canCopyAudioTrack()`](/docs/webcodecs/can-copy-audio-track) to determine this.

```tsx
Get available audio codecs for a container

import {getAvailableAudioCodecs} from '@remotion/webcodecs';

getAvailableAudioCodecs({container: 'webm'}); // ['opus']Copy
```

## See also[​](#see-also "Direct link to See also")

- [Track Transformation](/docs/webcodecs/track-transformation)
- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/webcodecs/src/get-available-audio-codecs.ts)
