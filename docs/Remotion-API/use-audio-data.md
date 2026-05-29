---
title: "useAudioData()"
source: https://www.remotion.dev/docs/use-audio-data
---

# useAudioData()

*Part of the `@remotion/media-utils` package of helper functions.*

This convenience function wraps the [`getAudioData()`](/docs/get-audio-data) function into a hook and does 3 things:

- Keeps the audio data in a state
- Wraps the function in a [`delayRender()` / `continueRender()`](/docs/data-fetching) pattern.
- Handles the case where the component gets unmounted while the fetching is in progress and a React error is thrown.

Using this function, you can elegantly render a component based on audio properties, for example together with the [`visualizeAudio()`](/docs/visualize-audio) function.

info

Remote audio files need to support [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).More info

- Remotion's origin is usually `http://localhost:3000`, but it may be different if rendering on Lambda or the port is busy.- You can use

    [`getAudioDurationInSeconds()`](/docs/get-audio-duration-in-seconds)

    without the audio needing CORS.- You can [disable CORS](/docs/chromium-flags#--disable-web-security) during renders.

## Arguments[​](#arguments "Direct link to Arguments")

### `src`[​](#src "Direct link to src")

A string pointing to an audio asset.

### `options?`[v4.0.458](https://github.com/remotion-dev/remotion/releases/v4.0.458)[​](#options "Direct link to options")

#### `sampleRate?`[v4.0.458](https://github.com/remotion-dev/remotion/releases/v4.0.458)[​](#samplerate "Direct link to samplerate")

The `sampleRate` that should be passed into the [`AudioContext`](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/AudioContext) constructor. If not provided, the default value is `48000`.

#### `requestInit?`[v4.0.458](https://github.com/remotion-dev/remotion/releases/v4.0.458)[​](#requestinit "Direct link to requestinit")

*`RequestInit`*

Options that are passed to the [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/fetch) call when loading the audio source.

This can be used to load authenticated remote audio files:

```tsx
import {useAudioData} from '@remotion/media-utils';

export const MyComponent: React.FC = () => {
  const audioData = useAudioData('https://example.com/authenticated-audio.mp3', {
    requestInit: {
      credentials: 'include',
    },
  });

  if (!audioData) {
    return null;
  }

  return <div>This file has a {audioData.sampleRate} sampleRate.</div>;
};Copy
```

Only the `requestInit` from the **first** render is used; updates on later renders are ignored. That keeps hook dependencies stable when you pass an inline object every render (for example `{credentials: 'include'}`).

## Return value[​](#return-value "Direct link to Return value")

`AudioData | null` - An object containing audio data (see documentation of [`getAudioData()`](/docs/get-audio-data)) or `null` if the data has not been loaded.

## Example[​](#example "Direct link to Example")

```tsx
import {useAudioData} from '@remotion/media-utils';
import {staticFile} from 'remotion';

export const MyComponent: React.FC = () => {
  const audioData = useAudioData(staticFile('music.mp3'));

  if (!audioData) {
    return null;
  }

  return <div>This file has a {audioData.sampleRate} sampleRate.</div>;
};Copy
```

## Errors[​](#errors "Direct link to Errors")

If you pass in a file that has no audio track, this hook will throw an error (*from v4.0.75*) or lead to an unhandled rejection (*until v4.0.74*).

To determine if a file has an audio track, you may use the [`getVideoMetadata()`](/docs/renderer/get-video-metadata#audiocodec) function on the server to reject a file if it has no audio track. To do so, check if the `audioCodec` field is `null`.

If you want to catch the error in the component, you need to make your own inline hook by taking the source code from the bottom of this page.

## Types[​](#types "Direct link to Types")

### `UseAudioDataOptions`[v4.0.458](https://github.com/remotion-dev/remotion/releases/v4.0.458)[​](#useaudiodataoptions "Direct link to useaudiodataoptions")

```tsx
import type {
  UseAudioDataOptions,

(alias) type UseAudioDataOptions = {
    sampleRate?: number;
    requestInit?: RequestInit;
}
import UseAudioDataOptions

} from '@remotion/media-utils';Copy
```

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/media-utils/src/use-audio-data.ts)
- [`getAudioData()`](/docs/get-audio-data)
- [`visualizeAudio()`](/docs/visualize-audio)
- [Audio visualization](/docs/audio/visualization)
