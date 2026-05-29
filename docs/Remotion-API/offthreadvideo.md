---
title: "<OffthreadVideo>"
source: https://www.remotion.dev/docs/offthreadvideo
---

# <OffthreadVideo>

[v3.0.11](https://github.com/remotion-dev/remotion/releases/v3.0.11)

This component imports and displays a video, similar to [`<Html5Video/>`](/docs/html5-video), but during rendering, extracts the exact frame from the video and displays it in a [`<Img>`](/docs/img) tag. This extraction process happens outside the browser using FFmpeg.

This component was designed to combat limitations of the default `<Html5Video>` element. See: [Comparison of video tags](/docs/video-tags).

Not supported in client-side rendering

`<OffthreadVideo>` is not supported in [`@remotion/web-renderer`](/docs/client-side-rendering). Use [`<Video>`](/docs/media/video) from `@remotion/media` instead.

## Example[​](#example "Direct link to Example")

```tsx
import {AbsoluteFill, OffthreadVideo, staticFile} from 'remotion';

export const MyVideo = () => {
  return (
    <AbsoluteFill>
      <OffthreadVideo src={staticFile('video.webm')} />
    </AbsoluteFill>
  );
};Copy
```

You can load a video from an URL as well:

```tsx
export const MyComposition = () => {
  return (
    <AbsoluteFill>
      <OffthreadVideo src="https://remotion.media/BigBuckBunny.mp4" />
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
      <OffthreadVideo src={staticFile('video.webm')} trimBefore={60} trimAfter={120} />
    </AbsoluteFill>
  );
};Copy
```

### `trimAfter?`[v4.0.319](https://github.com/remotion-dev/remotion/releases/v4.0.319)[​](#trimafter "Direct link to trimafter")

Removes a portion of the video at the end (right side). See [`trimBefore`](/docs/offthreadvideo#trimbefore) for an explanation.

### ~~`startFrom?`~~[​](#startfrom "Direct link to startfrom")

Deprecated

This prop has been renamed to [`trimBefore`](#trimbefore) in 4.0.319. It will continue to work but you cannot use it together with the new prop.

### ~~`endAt?`~~[​](#endat "Direct link to endat")

Deprecated

This prop has been renamed to [`trimAfter`](#trimafter) in 4.0.319. It will continue to work but you cannot use it together with the new prop.

### `transparent?`[v4.0.0](https://github.com/remotion-dev/remotion/releases/v4.0.0)[​](#transparent "Direct link to transparent")

If set to `true`, frames will be extracted as PNG, enabling transparency but also slowing down your render.

If set to `false` (*default*), frames will be extracted as bitmap (BMP), which is faster.

### `volume?`[​](#volume "Direct link to volume")

Allows you to control the volume for the whole track or change it on a per-frame basis. Refer to the [using audio](/docs/audio/volume) guide to learn how to use it.

```tsx
Example using static volume

export const MyComposition = () => {
  return (
    <AbsoluteFill>
      <OffthreadVideo volume={0.5} src={staticFile('video.webm')} />
    </AbsoluteFill>
  );
};Copy
```

```tsx
Example of a ramp up over 100 frames

export const MyComposition = () => {
  return (
    <AbsoluteFill>
      <OffthreadVideo volume={(f) => interpolate(f, [0, 100], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})} src={staticFile('video.webm')} />
    </AbsoluteFill>
  );
};Copy
```

By default, volumes between 0 and 1 are supported, where in iOS Safari, the volume is always 1.  
See [Volume Limitations](/docs/audio/volume#limitations) for more information.

### `loopVolumeCurveBehavior?`[v4.0.142](https://github.com/remotion-dev/remotion/releases/v4.0.142)[​](#loopvolumecurvebehavior "Direct link to loopvolumecurvebehavior")

Controls the `frame` which is returned when using the [`volume`](#volume) callback function and wrapping `OffthreadVideo` in a [`<Loop>`](/docs/loop).

Can be either `"repeat"` (default, start from 0 on each iteration) or `"extend"` (keep increasing frames).

### `style?`[​](#style "Direct link to style")

You can pass any style you can pass to a native HTML element. Keep in mind that during rendering, `<OffthreadVideo>` renders an [`<Img>`](/docs/img) tag, but a `<video>` tag is used during preview.

```tsx
export const MyComposition = () => {
  return (
    <AbsoluteFill>
      <Img src={staticFile('video.webm')} style={{height: 720, width: 1280}} />
    </AbsoluteFill>
  );
};Copy
```

### `name?`[v4.0.71](https://github.com/remotion-dev/remotion/releases/v4.0.71)[​](#name "Direct link to name")

A name and that will be shown as the label of the sequence in the timeline of the Remotion Studio. This property is purely for helping you keep track of items in the timeline.

### `toneFrequency?`[v4.0.47](https://github.com/remotion-dev/remotion/releases/v4.0.47)[​](#tonefrequency "Direct link to tonefrequency")

Adjust the pitch of the audio - will only be applied during rendering.

Accepts a number between `0.01` and `2`, where `1` represents the original pitch. Values less than `1` will decrease the pitch, while values greater than `1` will increase it.

A `toneFrequency` of 0.5 would lower the pitch by half, and a `toneFrequency` of `1.5` would increase the pitch by 50%.

### `onError?`[​](#onerror "Direct link to onerror")

Handle an error playing the video. From v3.3.89, if you pass an `onError` callback, then no exception will be thrown. Previously, the error could not be caught.

### `playbackRate?`[v2.2.0](https://github.com/remotion-dev/remotion/releases/v2.2.0)[​](#playbackrate "Direct link to playbackrate")

Controls the speed of the video. `1` is the default and means regular speed, `0.5` slows down the video so it's twice as long and `2` speeds up the video so it's twice as fast.

While Remotion doesn't limit the range of possible playback speeds, in development mode the [`HTMLMediaElement.playbackRate`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/playbackRate) API is used which throws errors on extreme values. At the time of writing, Google Chrome throws an exception if the playback rate is below `0.0625` or above `16`.

```tsx
Example of a video playing twice as fast

export const MyComposition = () => {
  return (
    <AbsoluteFill>
      <OffthreadVideo playbackRate={2} src={staticFile('video.webm')} />
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
      <OffthreadVideo muted src="https://remotion.media/BigBuckBunny.mp4" />
    </AbsoluteFill>
  );
};Copy
```

### `acceptableTimeShiftInSeconds?`[v3.2.42](https://github.com/remotion-dev/remotion/releases/v3.2.42)[​](#acceptabletimeshiftinseconds "Direct link to acceptabletimeshiftinseconds")

In the [Studio](/docs/terminology/studio) or in the [Remotion Player](/docs/player), Remotion will seek the video if it gets too much out of sync with Remotion's internal time - be it due to the video loading or the page being too slow to keep up in real-time. By default, a seek is triggered if `0.45` seconds of time shift is encountered. Using this prop, you can customize the threshold.

### `toneFrequency?`[v4.0.47](https://github.com/remotion-dev/remotion/releases/v4.0.47)[​](#tonefrequency-1 "Direct link to tonefrequency-1")

Adjust the pitch of the audio - will only be applied during rendering.

Accepts a number between `0.01` and `2`, where `1` represents the original pitch. Values less than `1` will decrease the pitch, while values greater than `1` will increase it.

A `toneFrequency` of 0.5 would lower the pitch by half, and a `toneFrequency` of `1.5` would increase the pitch by 50%.

### `pauseWhenBuffering?`[v4.0.111](https://github.com/remotion-dev/remotion/releases/v4.0.111)[​](#pausewhenbuffering "Direct link to pausewhenbuffering")

If set to `true` and the video is loading, the Player will enter into the [native buffering state](/docs/player/buffer-state). The default is `false`, but will become `true` in Remotion 5.0.

### `toneMapped?`[v4.0.117](https://github.com/remotion-dev/remotion/releases/v4.0.117)[​](#tonemapped "Direct link to tonemapped")

Since Remotion 4.0.117, Remotion will adjust the colors of videos in different color spaces (such as HDR) when converting to RGB, to counteract color shifts.  
Since the browser is painting in sRGB, this is necessary to ensure that the colors are displayed correctly.  
This behavior is by default `true` and can be disabled by setting `toneMapped` to `false`.  
Disabling tone mapping will speed up rendering, but may result in less vibrant colors.

Prior to Remotion 4.0.117, tone mapping was always disabled, and the `toneMapped` prop was not available.

### `audioStreamIndex?`[v4.0.340](https://github.com/remotion-dev/remotion/releases/v4.0.340)[​](#audiostreamindex "Direct link to audiostreamindex")

Select the audio stream to use. The default is `0`.

```tsx
export const MyComposition = () => {
  return (
    <AbsoluteFill>
      <OffthreadVideo audioStreamIndex={1} src={'https://remotion.media/multiple-audio-streams.mov'} />
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

### `showInTimeline?`[v4.0.122](https://github.com/remotion-dev/remotion/releases/v4.0.122)[​](#showintimeline "Direct link to showintimeline")

If set to `false`, no layer will be shown in the timeline of the Remotion Studio. The default is `true`.

### `delayRenderTimeoutInMilliseconds?`[v4.0.150](https://github.com/remotion-dev/remotion/releases/v4.0.150)[​](#delayrendertimeoutinmilliseconds "Direct link to delayrendertimeoutinmilliseconds")

Customize the [timeout](/docs/delay-render#modifying-the-timeout) of the [`delayRender()`](/docs/delay-render) call that this component makes.

### `delayRenderRetries?`[v4.0.178](https://github.com/remotion-dev/remotion/releases/v4.0.178)[​](#delayrenderretries "Direct link to delayrenderretries")

Customize the [number of retries](/docs/delay-render#retrying) of the [`delayRender()`](/docs/delay-render) call that this component makes.

### `onAutoPlayError?`[v4.0.187](https://github.com/remotion-dev/remotion/releases/v4.0.187)[​](#onautoplayerror "Direct link to onautoplayerror")

A callback function that gets called when the video fails to play due to autoplay restrictions.  
If you don't pass a callback, the video will be muted and be retried once.  
This prop is useful if you want to handle the error yourself, e.g. for pausing the Player.  
Read more here about [autoplay restrictions](/docs/player/autoplay).

### `onVideoFrame?`[v4.0.190](https://github.com/remotion-dev/remotion/releases/v4.0.190)[​](#onvideoframe "Direct link to onvideoframe")

A callback function that gets called when a frame is extracted from the video.  
Useful for [video manipulation](/docs/video-manipulation).  
The callback is called with a [`CanvasImageSource`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasImageSource) object.  
During preview, this is a `HTMLVideoElement` object, during rendering, it is an `HTMLImageElement`.

### `crossOrigin?`[v4.0.190](https://github.com/remotion-dev/remotion/releases/v4.0.190)[​](#crossorigin "Direct link to crossorigin")

Corresponds to the [`crossOrigin`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-crossorigin) attribute of the `<video>` element.  
One of `"anonymous"`, `"use-credentials"` or `undefined`.  
Default: `"anonymous"` if `onVideoFrame` is specified, `undefined`, otherwise.

### `useWebAudioApi?`[v4.0.306](https://github.com/remotion-dev/remotion/releases/v4.0.306)[​](#usewebaudioapi "Direct link to usewebaudioapi")

Enable the [Web Audio API](/docs/audio/volume#limitations) for the video tag.

### ~~`imageFormat` [v3.0.22](https://github.com/remotion-dev/remotion/releases/v3.0.22)~~[​](#imageformat- "Direct link to imageformat-")

*removed in v4.0.0*

Either `jpeg` or `png`. Default `jpeg`.  
With `png`, transparent videos (VP8, VP9, ProRes) can be displayed, however it is around 40% slower, with VP8 videos being [much slower](/docs/slow-method-to-extract-frame).

### ~~`allowAmplificationDuringRender?`[v3.3.17](https://github.com/remotion-dev/remotion/releases/v3.3.17)~~[​](#allowamplificationduringrender "Direct link to allowamplificationduringrender")

Deprecated since v4.0.279: This prop intended to opt into setting the volume to a value higher than one, even though it would only apply during render.

The option does not make sense anymore, because it is now possible to set the volume higher than `1`.  
To prevent synthetic amplification, set a volume not higher than 1.

### Other props[​](#other-props "Direct link to Other props")

The props [`onError`](/docs/img#onerror), `className` and `style` are supported and get passed to the underlying HTML element. Remember that during render, this is a `<img>` element, and during Preview, this is a `<video>` element.

## Performance tips[​](#performance-tips "Direct link to Performance tips")

Only set `transparent` to `true` if you need transparency. It is slower than non-transparent frame extraction.  
If you don't care about color accuracy, you can set `toneMapped` to `false` as well to save time on color conversion.

## Looping a OffthreadVideo[​](#looping-a-offthreadvideo "Direct link to Looping a OffthreadVideo")

Unlike [`<Html5Video>`](/docs/html5-video), `OffthreadVideo` does not implement the `loop` property.  
Consider using [another video tag](/docs/video-tags) for looping.

note

When a video ends, the last frame of the video remains visible by default.  
This matches the behavior of [`<Html5Video>`](/docs/html5-video#loop).

You can use the following `<LoopableOffthreadVideo>` component that uses Mediabunny to [determine the duration](/docs/mediabunny/metadata) for looping a video.

```tsx
src/LoopableOffthreadVideo.tsx

import React, {useEffect, useState} from 'react';
import {cancelRender, continueRender, delayRender, Loop, OffthreadVideo, RemotionOffthreadVideoProps, useRemotionEnvironment, useVideoConfig, Html5Video} from 'remotion';
import {getMediaMetadata} from './get-media-metadata';

const LoopedOffthreadVideo: React.FC<RemotionOffthreadVideoProps> = (props) => {
  const [duration, setDuration] = useState<number | null>(null);
  const [handle] = useState(() => delayRender());
  const {fps} = useVideoConfig();

  useEffect(() => {
    getMediaMetadata(props.src)
      .then(({durationInSeconds}) => {
        setDuration(durationInSeconds);
        continueRender(handle);
      })
      .catch((err) => {
        cancelRender(err);
      });

    return () => {
      continueRender(handle);
    };
  }, [handle, props.src]);

  if (duration === null) {
    return null;
  }

  return (
    <Loop durationInFrames={Math.floor(duration * fps)}>
      <OffthreadVideo {...props} />
    </Loop>
  );
};

export const LoopableOffthreadVideo: React.FC<
  RemotionOffthreadVideoProps & {
    loop?: boolean;
  }
> = ({loop, ...props}) => {
  const env = useRemotionEnvironment();
  if (env.isRendering) {
    if (loop) {
      return <LoopedOffthreadVideo {...props} />;
    }

    return <OffthreadVideo {...props} />;
  }

  return <Html5Video loop={loop} {...props}></Html5Video>;
};Copy
```

## Supported codecs by `<OffthreadVideo>`[​](#supported-codecs-by-offthreadvideo "Direct link to supported-codecs-by-offthreadvideo")

The following codecs can be read by `<OffthreadVideo>`:

- H.264 ("MP4")
- H.265 ("HEVC")
- VP8 and VP9 ("WebM")
- AV1 (from *v4.0.6*)
- ProRes

## Compatibility[​](#compatibility "Direct link to Compatibility")

|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Browsers Environments|  |  |  |  |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | Chrome  Firefox  Safari  [Client-side rendering](/docs/client-side-rendering)  [Server-side rendering](/docs/ssr)  [Player](/docs/player)  [Studio](/docs/studio) |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | | | | | | | | | | | | | | | | | | | | | | |

## See also[​](#see-also "Direct link to See also")

- [Source code for this component](https://github.com/remotion-dev/remotion/blob/main/packages/core/src/video/OffthreadVideo.tsx)
- [`<Html5Video />`](/docs/html5-video)
- [`<Video />` (from `@remotion/media`)](/docs/media/video)
- [Comparison of video tags](/docs/video-tags)
