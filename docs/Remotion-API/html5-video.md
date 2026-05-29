---
title: "<Html5Video>"
source: https://www.remotion.dev/docs/html5-video
---

# <Html5Video>

[*previously called `<Video>`*](/docs/mediabunny/new-video)

Wraps the native [`<video>`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement) element to include video in your component that is synchronized with Remotion's time.

note

Prefer [one of the other video tags](/docs/video-tags) which perform better.

Not supported in client-side rendering

`<Html5Video>` is not supported in [`@remotion/web-renderer`](/docs/client-side-rendering). Use [`<Video>`](/docs/media/video) from `@remotion/media` instead.

## API[​](#api "Direct link to API")

[Put a video file into the `public/` folder](/docs/assets) and use [`staticFile()`](/docs/staticfile) to reference it.

All the props that the native `<video>` element accepts (except `autoplay` and `controls`) will be forwarded (but of course not all are useful for Remotion). This means you can use all CSS to style the video.

```tsx
import {AbsoluteFill, staticFile, Html5Video} from 'remotion';

export const MyComposition = () => {
  return (
    <AbsoluteFill>
      <Html5Video src={staticFile('video.webm')} />
    </AbsoluteFill>
  );
};Copy
```

You can load a video from an URL as well:

```tsx
export const MyComposition = () => {
  return (
    <AbsoluteFill>
      <Html5Video src="https://remotion.media/BigBuckBunny.mp4" />
    </AbsoluteFill>
  );
};Copy
```

## Props[​](#props "Direct link to Props")

### `src`[​](#src "Direct link to src")

The URL of the video to be rendered. Can be a remote URL or a local file referenced with [`staticFile()`](/docs/staticfile).

### `trimBefore?`[v4.0.319](https://github.com/remotion-dev/remotion/releases/v4.0.319)[​](#trimbefore "Direct link to trimbefore")

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
      <Html5Video src={staticFile('video.webm')} trimBefore={60} trimAfter={120} />
    </AbsoluteFill>
  );
};Copy
```

### `trimAfter?`[v4.0.319](https://github.com/remotion-dev/remotion/releases/v4.0.319)[​](#trimafter "Direct link to trimafter")

Removes a portion of the video at the end (right side). See [`trimBefore`](#trimbefore) for an explanation.

### ~~`startFrom?`~~[​](#startfrom "Direct link to startfrom")

Deprecated

This prop has been renamed to [`trimBefore`](#trimbefore) in 4.0.319. It will continue to work but you cannot use it together with the new prop.

### ~~`endAt?`~~[​](#endat "Direct link to endat")

Deprecated

This prop has been renamed to [`trimAfter`](#trimafter) in 4.0.319. It will continue to work but you cannot use it together with the new prop.

### `style?`[​](#style "Direct link to style")

You can pass any style you can pass to a native `<video>` element. For example, set its size:

```tsx
export const MyComposition = () => {
  return (
    <AbsoluteFill>
      <Html5Video src={staticFile('video.webm')} style={{height: 720, width: 1280}} />
    </AbsoluteFill>
  );
};Copy
```

### `volume?`[​](#volume "Direct link to volume")

Allows you to control the volume for the whole track or change it on a per-frame basis. Refer to the [using audio](/docs/audio/volume) guide to learn how to use it.

```tsx
Example using static volume

export const MyComposition = () => {
  return (
    <AbsoluteFill>
      <Html5Video volume={0.5} src={staticFile('video.webm')} />
    </AbsoluteFill>
  );
};Copy
```

```tsx
Example of a ramp up over 100 frames

export const MyComposition = () => {
  return (
    <AbsoluteFill>
      <Html5Video volume={(f) => interpolate(f, [0, 100], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})} src={staticFile('video.webm')} />
    </AbsoluteFill>
  );
};Copy
```

By default, volumes between 0 and 1 are supported, where in iOS Safari, the volume is always 1.  
See [Volume Limitations](/docs/audio/volume#limitations) for more information.

### `loopVolumeCurveBehavior?`[v4.0.142](https://github.com/remotion-dev/remotion/releases/v4.0.142)[​](#loopvolumecurvebehavior "Direct link to loopvolumecurvebehavior")

Controls the `frame` which is returned when using the [`volume`](#volume) callback function and adding the [`loop`](#loop) attribute.

Can be either `"repeat"` (default, start from 0 on each iteration) or `"extend"` (keep increasing frames).

### `name?`[v4.0.71](https://github.com/remotion-dev/remotion/releases/v4.0.71)[​](#name "Direct link to name")

A name and that will be shown as the label of the sequence in the timeline of the Remotion Studio. This property is purely for helping you keep track of items in the timeline.

### `playbackRate?`[v2.2.0](https://github.com/remotion-dev/remotion/releases/v2.2.0)[​](#playbackrate "Direct link to playbackrate")

Controls the speed of the video. `1` is the default and means regular speed, `0.5` slows down the video so it's twice as long and `2` speeds up the video so it's twice as fast.

While Remotion doesn't limit the range of possible playback speeds, in development mode the [`HTMLMediaElement.playbackRate`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/playbackRate) API is used which throws errors on extreme values. At the time of writing, Google Chrome throws an exception if the playback rate is below `0.0625` or above `16`.

```tsx
Example of a video playing twice as fast

export const MyComposition = () => {
  return (
    <AbsoluteFill>
      <Html5Video playbackRate={2} src={staticFile('video.webm')} />
    </AbsoluteFill>
  );
};Copy
```

note

Playing a video in reverse is not supported.

### `preservePitch?`[v4.0.463](https://github.com/remotion-dev/remotion/releases/v4.0.463)[​](#preservepitch "Direct link to preservepitch")

Controls whether the audio pitch is preserved when [`playbackRate`](#playbackrate) is not `1`.

Accepts `true`, `false`, or `undefined`. Default: `true`, matching the browser default for [`HTMLMediaElement.preservesPitch`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/preservesPitch).

Note: `preservePitch` only affects preview playback. During render, audio is processed via [`toneFrequency`](/docs/audio/pitch) for render-time pitch control.

### `muted?`[​](#muted "Direct link to muted")

You can drop the audio of the video by adding a `muted` prop:

```tsx
Example of a muted video

export const MyComposition = () => {
  return (
    <AbsoluteFill>
      <Html5Video muted src="https://remotion.media/BigBuckBunny.mp4" />
    </AbsoluteFill>
  );
};Copy
```

This has the benefit that Remotion will not have to download the video file during rendering in order to extract the audio from it.

### `loop?`[v3.2.29](https://github.com/remotion-dev/remotion/releases/v3.2.29)[​](#loop "Direct link to loop")

Makes the video loop indefinitely.

```tsx
Example of a looped video

export const MyComposition = () => {
  return (
    <AbsoluteFill>
      <Html5Video loop src="https://remotion.media/BigBuckBunny.mp4" />
    </AbsoluteFill>
  );
};Copy
```

note

When a video ends (and `loop` is not set), the last frame of the video remains visible by default.  
This is because Remotion mounts a `<video>` tag and sets `ref.currentTime = frame / fps` to synchronize with the timeline. When `currentTime` is set to a value larger than the video's duration, the HTML5 `<video>` element displays the last frame.

### `acceptableTimeShiftInSeconds?`[v3.2.42](https://github.com/remotion-dev/remotion/releases/v3.2.42)[​](#acceptabletimeshiftinseconds "Direct link to acceptabletimeshiftinseconds")

In the [Studio](/docs/terminology/studio) or in the [Remotion Player](/docs/player), Remotion will seek the video if it gets too much out of sync with Remotion's internal time - be it due to the video loading or the page being too slow to keep up in real-time. By default, a seek is triggered if `0.45` seconds of time shift is encountered. Using this prop, you can customize the threshold.

### `toneFrequency?`[v4.0.47](https://github.com/remotion-dev/remotion/releases/v4.0.47)[​](#tonefrequency "Direct link to tonefrequency")

Adjust the pitch of the audio - will only be applied during rendering.

Accepts a number between `0.01` and `2`, where `1` represents the original pitch. Values less than `1` will decrease the pitch, while values greater than `1` will increase it.

A `toneFrequency` of 0.5 would lower the pitch by half, and a `toneFrequency` of `1.5` would increase the pitch by 50%.

### `audioStreamIndex?`[v4.0.340](https://github.com/remotion-dev/remotion/releases/v4.0.340)[​](#audiostreamindex "Direct link to audiostreamindex")

Select the audio stream to use. The default is `0`.

```tsx
export const MyComposition = () => {
  return (
    <AbsoluteFill>
      <Html5Video audioStreamIndex={1} src={'https://remotion.media/multiple-audio-streams.mov'} />
    </AbsoluteFill>
  );
};Copy
```

note

This prop only works during rendering.  
Browsers do not support selecting the audio track without enabling experimental flags.

Not to be confused with audio channels. A video can have multiple audio streams, each stream can have multiple channels.  
Multiple audio streams can be used for example for adding multiple languages to a video.

Audio streams are zero-indexed.

### `onError?`[​](#onerror "Direct link to onerror")

Handle an error playing the video. From v3.3.89, if you pass an `onError` callback, then no exception will be thrown. Previously, the error could not be caught.

### `pauseWhenBuffering?`[v4.0.100](https://github.com/remotion-dev/remotion/releases/v4.0.100)[​](#pausewhenbuffering "Direct link to pausewhenbuffering")

If set to `true` and the video is loading, the Player will enter into the [native buffering state](/docs/player/buffer-state). The default is `false`, but will become `true` in Remotion 5.0.

### `showInTimeline?`[v4.0.122](https://github.com/remotion-dev/remotion/releases/v4.0.122)[​](#showintimeline "Direct link to showintimeline")

If set to `false`, no layer will be shown in the timeline of the Remotion Studio. The default is `true`.

### `delayRenderTimeoutInMilliseconds?`[v4.0.140](https://github.com/remotion-dev/remotion/releases/v4.0.140)[​](#delayrendertimeoutinmilliseconds "Direct link to delayrendertimeoutinmilliseconds")

Customize the [timeout](/docs/delay-render#modifying-the-timeout) of the [`delayRender()`](/docs/delay-render) call that this component makes.

### `delayRenderRetries?`[v4.0.140](https://github.com/remotion-dev/remotion/releases/v4.0.140)[​](#delayrenderretries "Direct link to delayrenderretries")

Customize the [number of retries](/docs/delay-render#retrying) of the [`delayRender()`](/docs/delay-render) call that this component makes.

### `onAutoPlayError?`[v4.0.187](https://github.com/remotion-dev/remotion/releases/v4.0.187)[​](#onautoplayerror "Direct link to onautoplayerror")

A callback function that gets called when the video fails to play due to autoplay restrictions.  
If you don't pass a callback, the video will be muted and be retried once.  
This prop is useful if you want to handle the error yourself, e.g. for pausing the Player.  
Read more here about [autoplay restrictions](/docs/player/autoplay).

### `crossOrigin?`[v4.0.190](https://github.com/remotion-dev/remotion/releases/v4.0.190)[​](#crossorigin "Direct link to crossorigin")

Corresponds to the [`crossOrigin`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-crossorigin) attribute of the `<video>` element.  
One of `"anonymous"`, `"use-credentials"` or `undefined`.  
Default: `"anonymous"` if `onVideoFrame` is specified, `undefined`, otherwise.

### `useWebAudioApi?`[v4.0.306](https://github.com/remotion-dev/remotion/releases/v4.0.306)[​](#usewebaudioapi "Direct link to usewebaudioapi")

Enable the [Web Audio API](/docs/audio/volume#limitations) for the video tag.

### ~~`allowAmplificationDuringRender?`[v3.3.17](https://github.com/remotion-dev/remotion/releases/v3.3.17)~~[​](#allowamplificationduringrender "Direct link to allowamplificationduringrender")

Deprecated since v4.0.279: This prop intended to opt into setting the volume to a value higher than one, even though it would only apply during render.

The option does not make sense anymore, because it is now possible to set the volume higher than `1`.  
To prevent synthetic amplification, set a volume not higher than 1.

## Speed up renders for video with silent audio[​](#speed-up-renders-for-video-with-silent-audio "Direct link to Speed up renders for video with silent audio")

Remotion will download the whole video during render in order to mix its audio. If the video contains a silent audio track, you can add the muted property to signal to Remotion that it does not need to download the video and make the render more efficient.

## Codec support[​](#codec-support "Direct link to Codec support")

See: [Which video formats does Remotion support?](/docs/miscellaneous/video-formats)

## Alternatives: `<OffthreadVideo>` and `@remotion/media`[​](#alternatives-offthreadvideo-and-remotionmedia "Direct link to alternatives-offthreadvideo-and-remotionmedia")

[`<OffthreadVideo>`](/docs/offthreadvideo) is a Rust-based alternative to `<Html5Video>`.  
[`@remotion/media`](/docs/media/video) is an experimental component that will replace `<Html5Video>` at some point.

To decide which tag to use, see: [Comparison of video tags](/docs/video-tags)

## Compatibility[​](#compatibility "Direct link to Compatibility")

|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Browsers Environments|  |  |  |  |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | Chrome  Firefox  Safari  [Client-side rendering](/docs/client-side-rendering)  [Server-side rendering](/docs/ssr)  [Player](/docs/player)  [Studio](/docs/studio) |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | | | | | | | | | | | | | | | | | | | | | | |

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/core/src/video/html5-video.tsx)
- [`<Html5Audio />`](/docs/html5-audio)
- [`<OffthreadVideo />`](/docs/offthreadvideo)
- [`<Video />` (from `@remotion/media`)](/docs/media/video)
- [Comparison of video tags](/docs/video-tags)
- [`Change the speed of a video over time`](/docs/miscellaneous/snippets/accelerated-video)
