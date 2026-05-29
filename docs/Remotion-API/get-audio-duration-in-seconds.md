---
title: "getAudioDurationInSeconds()"
source: https://www.remotion.dev/docs/get-audio-duration-in-seconds
---

# getAudioDurationInSeconds()

Deprecated

This function has been deprecated. Use [`getMediaMetadata()`](/docs/mediabunny/metadata) instead, which is faster and supports more formats.

*Part of the `@remotion/media-utils` package of helper functions.*

*Previously called `getAudioDuration()`.*

Gets the duration in seconds of an audio source. Remotion will create an invisible `<audio>` tag, load the audio and return the duration.

## Arguments[​](#arguments "Direct link to Arguments")

### `src`[​](#src "Direct link to src")

A string pointing to an audio asset

## Return value[​](#return-value "Direct link to Return value")

`Promise<number>` - the duration of the audio file.

## Example[​](#example "Direct link to Example")

```tsx
import {getAudioDurationInSeconds} from '@remotion/media-utils';
import music from './music.mp3';

const MyComp: React.FC = () => {
  const getDuration = useCallback(async () => {
    const publicFile = await getAudioDurationInSeconds(staticFile('voiceover.wav')); // 33.221
    const imported = await getAudioDurationInSeconds(music); // 127.452
    const remote = await getAudioDurationInSeconds('https://example.com/remote-audio.aac'); // 50.24
  }, []);

  useEffect(() => {
    getDuration();
  }, []);

  return null;
};Copy
```

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/media-utils/src/get-audio-duration-in-seconds.ts)
