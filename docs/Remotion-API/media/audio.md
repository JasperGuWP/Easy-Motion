---
title: "<Audio>"
source: https://www.remotion.dev/docs/media/audio
---

# <Audio>

note

This is documentation for the new `<Audio>` tag.  
Not to be confused with the older [`<Html5Audio>` / `<Audio>`](/docs/html5-audio) tag from `remotion`.

This component imports and plays audio, similar to [`<Html5Audio />`](/docs/html5-audio) from `remotion` but during rendering, extracts the exact audio using [Mediabunny](/docs/mediabunny) instead of FFmpeg.

## Example[​](#example "Direct link to Example")

```tsx
import {AbsoluteFill, staticFile} from 'remotion';
import {Audio} from '@remotion/media';

export const MyVideo = () => {
  return (
    <AbsoluteFill>
      <Audio src={staticFile('audio.mp3')} />
    </AbsoluteFill>
  );
};Copy
```

You can load a video from an URL as well:

```tsx
export const MyComposition = () => {
  return (
    <AbsoluteFill>
      <Audio src="https://remotion.media/audio.wav" />
    </AbsoluteFill>
  );
};Copy
```

## Props[​](#props "Direct link to Props")

### `src`[​](#src "Direct link to src")

The URL of the audio to be rendered. Can be a remote URL or a local file referenced with [`staticFile()`](/docs/staticfile).

### `from?`[v4.0.445](https://github.com/remotion-dev/remotion/releases/v4.0.445)[​](#from "Direct link to from")

At which frame this clip should start relative to the parent timeline. Default is `0`. Same meaning as [`from`](/docs/sequence#from) on [`<Sequence>`](/docs/sequence).

### `durationInFrames?`[v4.0.445](https://github.com/remotion-dev/remotion/releases/v4.0.445)[​](#durationinframes "Direct link to durationinframes")

For how many frames the clip stays mounted. Default is `Infinity`. Same meaning as [`durationInFrames`](/docs/sequence#durationinframes) on [`<Sequence>`](/docs/sequence).

note

You can still wrap `<Audio>` in an outer [`<Sequence>`](/docs/sequence). Timing [cascades](/docs/sequence#cascading) like nested sequences.

```tsx
Clip starting at frame 30, lasting 90 frames

import {AbsoluteFill, staticFile} from 'remotion';
import {Audio} from '@remotion/media';

export const MyComposition = () => {
  return (
    <AbsoluteFill>
      <Audio from={30} durationInFrames={90} src={staticFile('audio.mp3')} />
    </AbsoluteFill>
  );
};Copy
```

### `trimBefore?`[​](#trimbefore "Direct link to trimbefore")

Will remove a portion of the audio at the beginning (left side).

In the following example, we assume that the [`fps`](/docs/composition#fps) of the composition is `30`.

By passing `trimBefore={60}`, the playback starts immediately, but with the first 2 seconds of the audio trimmed away.  
By passing `trimAfter={120}`, any audio after the 4 second mark in the file will be trimmed away.

The audio will play the range from `00:02:00` to `00:04:00`, meaning the audio will play for 2 seconds.

For exact behavior, see: [Order of operations](/docs/audio/order-of-operations).

```tsx
export const MyComposition = () => {
  return (
    <AbsoluteFill>
      <Audio src={staticFile('audio.mp3')} trimBefore={60} trimAfter={120} />
    </AbsoluteFill>
  );
};Copy
```

### `trimAfter?`[​](#trimafter "Direct link to trimafter")

Removes a portion of the audio at the end (right side). See [`trimBefore`](#trimbefore) for an explanation.

### `volume?`[​](#volume "Direct link to volume")

Allows you to control the volume of the audio in it's entirety or frame by frame.  
Read the page on [using audio](/docs/using-audio) to learn more.

```tsx
Setting a static volume

import {AbsoluteFill, staticFile} from 'remotion';
import {Audio} from '@remotion/media';

export const MyVideo = () => {
  return (
    <AbsoluteFill>
      <Audio volume={0.5} src={staticFile('background.mp3')} />
    </AbsoluteFill>
  );
};Copy
```

```tsx
Changing the volume over time

import {AbsoluteFill, interpolate, staticFile} from 'remotion';
import {Audio} from '@remotion/media';

export const MyVideo = () => {
  return (
    <AbsoluteFill>
      <Audio volume={(f) => interpolate(f, [0, 30], [0, 1], {extrapolateLeft: 'clamp'})} src={staticFile('voice.mp3')} />
    </AbsoluteFill>
  );
};Copy
```

### `name?`[​](#name "Direct link to name")

A name and that will be shown as the label of the sequence in the timeline of the Remotion Studio. This property is purely for helping you keep track of items in the timeline.

### `onError?`[v4.0.404](https://github.com/remotion-dev/remotion/releases/v4.0.404)[​](#onerror "Direct link to onerror")

Handle errors that occur during audio processing. The callback receives an `Error` and should return either `'fallback'` or `'fail'`.

- Return `'fallback'` to fall back to [`<Html5Audio>`](/docs/html5-audio) (default behavior)
- Return `'fail'` to fail the render immediately

```tsx
import {Audio} from '@remotion/media';

export const MyVideo = () => {
  return (
    <Audio
      src={'https://remotion.media/audio.mp3'}
      onError={(error) => {
        console.log('Audio error:', error.message);

        // Return 'fail' to fail the render, or 'fallback' to use <Html5Audio>
        return 'fallback';
      }}
    />
  );
};Copy
```

note

- In client-side rendering, the render will always fail regardless of the return value.
- If you return `'fallback'`, the component will fall back to [`<Html5Audio>`](/docs/html5-audio) which may have its own error handling via [`fallbackHtml5AudioProps.onError`](#onerror-1).

### `playbackRate?`[​](#playbackrate "Direct link to playbackrate")

Controls the speed of the audio. `1` is the default and means regular speed, `0.5` slows down the audio so it's twice as long and `2` speeds up the audio so it's twice as fast.

```tsx
Example of a audio playing twice as fast

export const MyComposition = () => {
  return (
    <AbsoluteFill>
      <Audio playbackRate={2} src={'https://remotion.media/audio.mp3'} />
    </AbsoluteFill>
  );
};Copy
```

note

Playing a audio in reverse is not supported.

### `loop?`[v3.2.29](https://github.com/remotion-dev/remotion/releases/v3.2.29)[​](#loop "Direct link to loop")

Makes the audio loop indefinitely.

```tsx
Example of a looped audio

export const MyComposition = () => {
  return <Audio loop src="https://remotion.media/audio.wav" />;
};Copy
```

### `loopVolumeCurveBehavior?`[​](#loopvolumecurvebehavior "Direct link to loopvolumecurvebehavior")

Controls the `frame` which is returned when using the [`volume`](#volume) callback function and adding the [`loop`](#loop) attribute.

Can be either `"repeat"` (default, start from 0 on each iteration) or `"extend"` (keep increasing frames).

### `muted?`[​](#muted "Direct link to muted")

The `muted` prop will be respected. It will lead to no audio being played while still keeping the audio tag mounted. It's value may change over time, for example to only mute a certain section of the audio.

```tsx
Example of a muted video

export const MyComposition = () => {
  return <Audio muted src="https://remotion.media/audio.wav" />;
};Copy
```

### `showInTimeline?`[​](#showintimeline "Direct link to showintimeline")

If set to `false`, no layer will be shown in the timeline of the Remotion Studio. The default is `true`.

### `delayRenderTimeoutInMilliseconds?`[​](#delayrendertimeoutinmilliseconds "Direct link to delayrendertimeoutinmilliseconds")

Customize the [timeout](/docs/delay-render#modifying-the-timeout) of the [`delayRender()`](/docs/delay-render) call that this component makes.

### `delayRenderRetries?`[​](#delayrenderretries "Direct link to delayrenderretries")

Customize the [number of retries](/docs/delay-render#retrying) of the [`delayRender()`](/docs/delay-render) call that this component makes.

### `audioStreamIndex?`[​](#audiostreamindex "Direct link to audiostreamindex")

Select the audio stream to use. The default is `0`.

```tsx
export const MyComposition = () => {
  return (
    <AbsoluteFill>
      <Audio audioStreamIndex={1} src={'https://remotion.media/multiple-audio-streams.mov'} />
    </AbsoluteFill>
  );
};Copy
```

### ~~`credentials?`[v4.0.437](https://github.com/remotion-dev/remotion/releases/v4.0.437)~~[​](#credentials "Direct link to credentials")

Deprecated

Use [`requestInit`](#requestinit) instead.

Controls the [`credentials`](https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials) option of the `fetch()` requests made to retrieve the audio data.

Accepts `"omit"`, `"same-origin"` (default behavior of `fetch()`) or `"include"`.
Set to `"include"` if you need to send cookies or authentication headers to a cross-origin audio URL.

```tsx
export const MyComposition = () => {
  return (
    <AbsoluteFill>
      <Audio requestInit={{credentials: 'include'}} src="https://example.com/protected-audio.mp3" />
    </AbsoluteFill>
  );
};Copy
```

### `requestInit?`[v4.0.465](https://github.com/remotion-dev/remotion/releases/v4.0.465)[​](#requestinit "Direct link to requestinit")

Passes [`RequestInit`](https://developer.mozilla.org/en-US/docs/Web/API/RequestInit) options to the `fetch()` requests made to retrieve the audio data.

Set `cache` to `"no-store"` if a CDN or browser cache returns invalid range request responses.
The value is captured when the component mounts; later updates to the prop are ignored, so passing an inline object is safe.

```tsx
export const MyComposition = () => {
  return (
    <AbsoluteFill>
      <Audio requestInit={{cache: 'no-store'}} src="https://remotion.media/audio.mp3" />
    </AbsoluteFill>
  );
};Copy
```

### `toneFrequency?`[​](#tonefrequency "Direct link to tonefrequency")

Accepts a number between `0.01` and `2`, where `1` represents the original pitch. Values less than `1` will decrease the pitch, while values greater than `1` will increase it.

A `toneFrequency` of 0.5 would lower the pitch by half, and a `toneFrequency` of `1.5` would increase the pitch by 50%.

The value must stay the same across the entire time the video tag is mounted.

warning

Only works in server-side rendering.  
Does not currently work in preview or in [client-side rendering](/docs/client-side-rendering/).

### `fallbackHtml5AudioProps?`[​](#fallbackhtml5audioprops "Direct link to fallbackhtml5audioprops")

When a [fallback to `<Html5Audio>` from `remotion`](/docs/media/fallback) happens, this prop allows you to pass props to the fallback `<Html5Audio>` component.  
Only props that are not supported by `<Audio>` from `@remotion/media` need to be specified here - props that apply for both tags will automatically be forwarded and do not need to be specified here.

note

This prop has no effect when using [`@remotion/web-renderer`](/docs/web-renderer) for client-side rendering, as fallback is not possible. See [Fallback is not possible in client-side rendering](/docs/media/fallback#fallback-is-not-possible-in-client-side-rendering).

#### `onError?`[​](#onerror-1 "Direct link to onerror-1")

Maps to [`<Html5Audio />` -> `onError`](/docs/html5-audio#onerror)

#### `useWebAudioApi?`[​](#usewebaudioapi "Direct link to usewebaudioapi")

Maps to [`<Html5Audio />` -> `useWebAudioApi`](/docs/html5-audio#usewebaudioapi)

#### `acceptableTimeShiftInSeconds?`[​](#acceptabletimeshiftinseconds "Direct link to acceptabletimeshiftinseconds")

Maps to [`<Html5Audio />` -> `acceptableTimeShiftInSeconds`](/docs/html5-audio#acceptabletimeshiftinseconds)

#### `pauseWhenBuffering?`[​](#pausewhenbuffering "Direct link to pausewhenbuffering")

Maps to [`<Html5Audio />` -> `pauseWhenBuffering`](/docs/html5-audio#pausewhenbuffering)

#### `crossOrigin?`[​](#crossorigin "Direct link to crossorigin")

Maps to [`<Html5Audio />` -> `crossOrigin`](/docs/html5-audio#crossorigin)

#### `preservePitch?`[v4.0.463](https://github.com/remotion-dev/remotion/releases/v4.0.463)[​](#preservepitch "Direct link to preservepitch")

Maps to [`<Html5Audio />` -> `preservePitch`](/docs/html5-audio#preservepitch).  
Only affects preview playback when falling back to [`<Html5Audio>`](/docs/html5-audio).

### `disallowFallbackToHtml5Audio?`[​](#disallowfallbacktohtml5audio "Direct link to disallowfallbacktohtml5audio")

By default, if the audio cannot be embedded using this tag, [a fallback to `<Html5Audio>` from `remotion`](/docs/media/fallback) will be attempted.

Pass this prop to disable the fallback and fail the render instead.

note

When using [`@remotion/web-renderer`](/docs/web-renderer) for client-side rendering, fallback is not possible and the render will always fail if the audio cannot be embedded. See [Fallback is not possible in client-side rendering](/docs/media/fallback#fallback-is-not-possible-in-client-side-rendering).

## See also[​](#see-also "Direct link to See also")

- [Source code for this component](https://github.com/remotion-dev/remotion/blob/main/packages/media/src/audio/audio.tsx)
- [`<Html5Audio />` (from `remotion`)](/docs/html5-audio)
- [`<Video />` (from `@remotion/media`)](/docs/media/video)
- [`<OffthreadVideo>`](/docs/offthreadvideo)
