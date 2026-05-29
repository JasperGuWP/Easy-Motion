---
title: "<Video>"
source: https://www.remotion.dev/docs/media/video
---

# <Video>

note

This is documentation for the new `<Video>` tag.  
Not to be confused with the older [`<Html5Video>` / `<Video>`](/docs/html5-video) tag from `remotion`.

This component imports and displays a video, similar to [`<OffthreadVideo/>`](/docs/offthreadvideo) but during rendering, extracts the exact frame from the video using [Mediabunny](/docs/mediabunny) and displays it in a `<canvas>` tag.

This component has [native buffering support](/docs/player/buffer-state) enabled by default. When used in the Player, it automatically pauses playback when buffering and resumes when ready.

## Example[​](#example "Direct link to Example")

```tsx
import {AbsoluteFill, staticFile} from 'remotion';
import {Video} from '@remotion/media';

export const MyVideo = () => {
  return (
    <AbsoluteFill>
      <Video src={staticFile('video.webm')} />
    </AbsoluteFill>
  );
};Copy
```

You can load a video from an URL as well:

```tsx
export const MyComposition = () => {
  return (
    <AbsoluteFill>
      <Video src="https://remotion.media/BigBuckBunny.mp4" />
    </AbsoluteFill>
  );
};Copy
```

You can also load HLS playlists (`.m3u8`):

```tsx
export const MyComposition = () => {
  return (
    <AbsoluteFill>
      <Video src="https://stream.mux.com/nqGuji1CJuoPoU3iprRRhiy3HXiQN0201HLyliOg44HOU.m3u8" />
    </AbsoluteFill>
  );
};Copy
```

For more information on HLS support, see the [HLS documentation](/docs/hls).

## Props[​](#props "Direct link to Props")

### `src`[​](#src "Direct link to src")

The URL of the video to be rendered. Can be a remote URL or a local file referenced with [`staticFile()`](/docs/staticfile).

### `from?`[v4.0.445](https://github.com/remotion-dev/remotion/releases/v4.0.445)[​](#from "Direct link to from")

At which frame this clip should start relative to the parent timeline. Default is `0`. Same meaning as [`from`](/docs/sequence#from) on [`<Sequence>`](/docs/sequence).

### `durationInFrames?`[v4.0.445](https://github.com/remotion-dev/remotion/releases/v4.0.445)[​](#durationinframes "Direct link to durationinframes")

For how many frames the clip stays mounted. Default is `Infinity`. Same meaning as [`durationInFrames`](/docs/sequence#durationinframes) on [`<Sequence>`](/docs/sequence).

note

You can still wrap `<Video>` in an outer [`<Sequence>`](/docs/sequence). Timing [cascades](/docs/sequence#cascading) like nested sequences.

```tsx
Clip starting at frame 30, lasting 90 frames

import {AbsoluteFill, staticFile} from 'remotion';
import {Video} from '@remotion/media';

export const MyComposition = () => {
  return (
    <AbsoluteFill>
      <Video from={30} durationInFrames={90} src={staticFile('video.webm')} />
    </AbsoluteFill>
  );
};Copy
```

### `trimBefore?`[​](#trimbefore "Direct link to trimbefore")

Will remove a portion of the video at the beginning (left side).

In the following example, we assume that the [`fps`](/docs/composition#fps) of the composition is `30`.

By passing `trimBefore={60}`, the playback starts immediately, but with the first 2 seconds of the video trimmed away.  
By passing `trimAfter={120}`, any video after the 4 second mark in the file will be trimmed away.

The video will play the range from `00:02:00` to `00:04:00`, meaning the video will play for 2 seconds.

For exact behavior, see: [Order of operations](/docs/audio/order-of-operations).

```tsx
export const MyComposition = () => {
  return (
    <AbsoluteFill>
      <Video src={staticFile('video.webm')} trimBefore={60} trimAfter={120} />
    </AbsoluteFill>
  );
};Copy
```

### `trimAfter?`[​](#trimafter "Direct link to trimafter")

Removes a portion of the video at the end (right side). See [`trimBefore`](#trimbefore) for an explanation.

### `volume?`[​](#volume "Direct link to volume")

Allows you to control the volume of the audio in it's entirety or frame by frame.  
Read the page on [using audio](/docs/using-audio) to learn more.

```tsx
Setting a static volume

import {AbsoluteFill, staticFile} from 'remotion';
import {Video} from '@remotion/media';

export const MyVideo = () => {
  return (
    <AbsoluteFill>
      <Video volume={0.5} src={staticFile('video.webm')} />
    </AbsoluteFill>
  );
};Copy
```

```tsx
Changing the volume over time

import {AbsoluteFill, interpolate, staticFile} from 'remotion';
import {Video} from '@remotion/media';

export const MyVideo = () => {
  return (
    <AbsoluteFill>
      <Video volume={(f) => interpolate(f, [0, 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})} src={'https://remotion.media/video.mp4'} />
    </AbsoluteFill>
  );
};Copy
```

### `name?`[​](#name "Direct link to name")

A name and that will be shown as the label of the sequence in the timeline of the Remotion Studio. This property is purely for helping you keep track of items in the timeline.

### `onError?`[v4.0.404](https://github.com/remotion-dev/remotion/releases/v4.0.404)[​](#onerror "Direct link to onerror")

Handle errors that occur during video processing. The callback receives an `Error` property and should return either `'fallback'` or `'fail'`.

- Return `'fallback'` to fall back to [`<OffthreadVideo>`](/docs/offthreadvideo) (default behavior)
- Return `'fail'` to fail the render immediately

```tsx
import {staticFile} from 'remotion';
import {Video} from '@remotion/media';

export const MyVideo = () => {
  return (
    <Video
      src={'https://remotion.media/video.mp4'}
      onError={(error) => {
        console.log('Video error:', error.message);

        // Return 'fail' to fail the render, or 'fallback' to use <OffthreadVideo>
        return 'fallback';
      }}
    />
  );
};Copy
```

note

- In client-side rendering, the render will always fail regardless of the return value.
- If you return `'fallback'`, the component will fall back to [`<OffthreadVideo>`](/docs/offthreadvideo) which may have its own error handling via [`fallbackOffthreadVideoProps.onError`](#onerror-1).

### `playbackRate?`[v4.0.354](https://github.com/remotion-dev/remotion/releases/v4.0.354)[​](#playbackrate "Direct link to playbackrate")

Controls the speed of the video. `1` is the default and means regular speed, `0.5` slows down the video so it's twice as long and `2` speeds up the video so it's twice as fast.

```tsx
Example of a video playing twice as fast

export const MyComposition = () => {
  return (
    <AbsoluteFill>
      <Video playbackRate={2} src={'https://remotion.media/video.mp4'} />
    </AbsoluteFill>
  );
};Copy
```

note

Playing a video in reverse is not supported.

### `muted?`[​](#muted "Direct link to muted")

You can drop the audio of the video by adding a `muted` prop:

```tsx
Example of a muted video

export const MyComposition = () => {
  return (
    <AbsoluteFill>
      <Video muted src="https://remotion.media/BigBuckBunny.mp4" />
    </AbsoluteFill>
  );
};Copy
```

### `style?`[​](#style "Direct link to style")

You can pass any style you can pass to a native HTML `<canvas>` element.

```tsx
export const MyComposition = () => {
  return (
    <AbsoluteFill>
      <Video src={staticFile('video.webm')} style={{height: 720, width: 1280}} />
    </AbsoluteFill>
  );
};Copy
```

### `objectFit?`[v4.0.442](https://github.com/remotion-dev/remotion/releases/v4.0.442)[​](#objectfit "Direct link to objectfit")

Controls how the video content is resized to fit the canvas element, similar to the CSS `object-fit` property on `<img>` elements.

Accepts `'contain'` (default), `'cover'`, `'fill'`, `'none'`, or `'scale-down'`.

- `'contain'`: The video is scaled to maintain its aspect ratio while fitting within the element's content box. Letterboxing is applied if the aspect ratios don't match.
- `'cover'`: The video is sized to maintain its aspect ratio while filling the element's entire content box. The video will be clipped to fit.
- `'fill'`: The video is stretched to fill the element's content box. The video's aspect ratio is not preserved.
- `'none'`: The video is not resized. It is centered within the element.
- `'scale-down'`: The video is sized as if `none` or `contain` were specified, whichever would result in a smaller size.

```tsx
export const MyComposition = () => {
  return (
    <AbsoluteFill>
      <Video
        src={staticFile('video.webm')}
        style={{width: '100%', height: '100%'}}
        objectFit="cover"
      />
    </AbsoluteFill>
  );
};Copy
```

note

The CSS property `object-fit` is not supported.

### `loop?`[​](#loop "Direct link to loop")

Makes the video loop indefinitely.

```tsx
Example of a looped video

export const MyComposition = () => {
  return (
    <AbsoluteFill>
      <Video loop src="https://remotion.media/BigBuckBunny.mp4" />
    </AbsoluteFill>
  );
};Copy
```

note

When a video ends (and `loop` is not set), the last frame of the video remains visible by default.  
This matches the behavior of [`<Html5Video>`](/docs/html5-video#loop).

### `loopVolumeCurveBehavior?`[v4.0.354](https://github.com/remotion-dev/remotion/releases/v4.0.354)[​](#loopvolumecurvebehavior "Direct link to loopvolumecurvebehavior")

Controls the `frame` which is returned when using the [`volume`](#volume) callback function and adding the [`loop`](#loop) attribute.

Can be either `"repeat"` (default, start from 0 on each iteration) or `"extend"` (keep increasing frames).

### `showInTimeline?`[​](#showintimeline "Direct link to showintimeline")

If set to `false`, no layer will be shown in the timeline of the Remotion Studio. The default is `true`.

### `delayRenderTimeoutInMilliseconds?`[​](#delayrendertimeoutinmilliseconds "Direct link to delayrendertimeoutinmilliseconds")

Customize the [timeout](/docs/delay-render#modifying-the-timeout) of the [`delayRender()`](/docs/delay-render) call that this component makes.

### `delayRenderRetries?`[​](#delayrenderretries "Direct link to delayrenderretries")

Customize the [number of retries](/docs/delay-render#retrying) of the [`delayRender()`](/docs/delay-render) call that this component makes.

### `onVideoFrame?`[​](#onvideoframe "Direct link to onvideoframe")

A callback function that gets called when a frame is extracted from the video.  
Useful for [video manipulation](/docs/video-manipulation).  
The callback is called with a [`CanvasImageSource`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasImageSource) object, more specifically, either an `ImageBitmap` or a `VideoFrame`.

### `audioStreamIndex?`[​](#audiostreamindex "Direct link to audiostreamindex")

Select the audio stream to use. The default is `0`.

```tsx
export const MyComposition = () => {
  return (
    <AbsoluteFill>
      <Video audioStreamIndex={1} src={'https://remotion.media/multiple-audio-streams.mov'} />
    </AbsoluteFill>
  );
};Copy
```

### ~~`credentials?`[v4.0.437](https://github.com/remotion-dev/remotion/releases/v4.0.437)~~[​](#credentials "Direct link to credentials")

Deprecated

Use [`requestInit`](#requestinit) instead.

Controls the [`credentials`](https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials) option of the `fetch()` requests made to retrieve the video data.

Accepts `"omit"`, `"same-origin"` (default behavior of `fetch()`) or `"include"`.
Set to `"include"` if you need to send cookies or authentication headers to a cross-origin video URL.

```tsx
export const MyComposition = () => {
  return (
    <AbsoluteFill>
      <Video requestInit={{credentials: 'include'}} src="https://example.com/protected-video.mp4" />
    </AbsoluteFill>
  );
};Copy
```

### `requestInit?`[v4.0.465](https://github.com/remotion-dev/remotion/releases/v4.0.465)[​](#requestinit "Direct link to requestinit")

Passes [`RequestInit`](https://developer.mozilla.org/en-US/docs/Web/API/RequestInit) options to the `fetch()` requests made to retrieve the video data.

Set `cache` to `"no-store"` if a CDN or browser cache returns invalid range request responses.
The value is captured when the component mounts; later updates to the prop are ignored, so passing an inline object is safe.

```tsx
export const MyComposition = () => {
  return (
    <AbsoluteFill>
      <Video requestInit={{cache: 'no-store'}} src="https://remotion.media/video.mp4" />
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

### `headless?`[v4.0.387](https://github.com/remotion-dev/remotion/releases/v4.0.387)[​](#headless "Direct link to headless")

Does not mount a `<canvas>`, but still allows you to use the [`onVideoFrame`](#onvideoframe) prop.  
This is useful for [embedding a video as a texture in Three.js](/docs/videos/as-threejs-texture).

### `fallbackOffthreadVideoProps?`[​](#fallbackoffthreadvideoprops "Direct link to fallbackoffthreadvideoprops")

When a [fallback to `<OffthreadVideo>`](/docs/media/fallback) happens, this prop allows you to pass props to the fallback `<OffthreadVideo>` component.  
Only props that are not supported by `<Video>` from `@remotion/media` need to be specified here - props that apply for both tags will automatically be forwarded and do not need to be specified here.

note

This prop has no effect when using [`@remotion/web-renderer`](/docs/web-renderer) for client-side rendering, as fallback is not possible. See [Fallback is not possible in client-side rendering](/docs/media/fallback#fallback-is-not-possible-in-client-side-rendering).

#### `acceptableTimeShiftInSeconds?`[​](#acceptabletimeshiftinseconds "Direct link to acceptabletimeshiftinseconds")

Maps to [`<OffthreadVideo />` -> `acceptableTimeShiftInSeconds`](/docs/offthreadvideo#acceptabletimeshiftinseconds)

#### `transparent?`[​](#transparent "Direct link to transparent")

Maps to [`<OffthreadVideo />` -> `transparent`](/docs/offthreadvideo#transparent)

#### `toneMapped?`[​](#tonemapped "Direct link to tonemapped")

Maps to [`<OffthreadVideo />` -> `toneMapped`](/docs/offthreadvideo#tonemapped)

#### `onError?`[​](#onerror-1 "Direct link to onerror-1")

Maps to [`<OffthreadVideo />` -> `onError`](/docs/offthreadvideo#onerror)

#### `crossOrigin?`[​](#crossorigin "Direct link to crossorigin")

Maps to [`<OffthreadVideo />` -> `crossOrigin`](/docs/offthreadvideo#crossorigin)

#### `useWebAudioApi?`[​](#usewebaudioapi "Direct link to usewebaudioapi")

Maps to [`<OffthreadVideo />` -> `useWebAudioApi`](/docs/offthreadvideo#usewebaudioapi)

#### `pauseWhenBuffering?`[​](#pausewhenbuffering "Direct link to pausewhenbuffering")

Maps to [`<OffthreadVideo />` -> `pauseWhenBuffering`](/docs/offthreadvideo#pausewhenbuffering)

#### `onAutoPlayError?`[​](#onautoplayerror "Direct link to onautoplayerror")

Maps to [`<OffthreadVideo />` -> `onAutoPlayError`](/docs/offthreadvideo#onautoplayerror)

#### `preservePitch?`[v4.0.463](https://github.com/remotion-dev/remotion/releases/v4.0.463)[​](#preservepitch "Direct link to preservepitch")

Maps to [`<OffthreadVideo />` -> `preservePitch`](/docs/offthreadvideo#preservepitch).  
Only affects preview playback when falling back to [`<Html5Video>`](/docs/html5-video) or [`<OffthreadVideo>`](/docs/offthreadvideo).

### `disallowFallbackToOffthreadVideo?`[​](#disallowfallbacktooffthreadvideo "Direct link to disallowfallbacktooffthreadvideo")

By default, if the video cannot be embedded using this tag, [a fallback to `<OffthreadVideo>`](/docs/media/fallback) will be attempted.

Pass this prop to disable the fallback and fail the render instead.

note

When using [`@remotion/web-renderer`](/docs/web-renderer) for client-side rendering, fallback is not possible and the render will always fail if the video cannot be embedded. See [Fallback is not possible in client-side rendering](/docs/media/fallback#fallback-is-not-possible-in-client-side-rendering).

### `debugOverlay?`[​](#debugoverlay "Direct link to debugoverlay")

Shows a debug overlay on the video. This is useful for debugging the video playback.

## See also[​](#see-also "Direct link to See also")

- [Source code for this component](https://github.com/remotion-dev/remotion/blob/main/packages/media/src/video/video.tsx)
- [HLS support (HTTP Live Streaming)](/docs/hls)
- [Comparison of video tags](/docs/video-tags)
- [`<Audio>` (from `@remotion/media`)](/docs/media/audio)
- [`<Html5Video>` (from `remotion`)](/docs/html5-video)
- [`<OffthreadVideo>`](/docs/offthreadvideo)
