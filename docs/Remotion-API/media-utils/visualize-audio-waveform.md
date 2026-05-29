---
title: "visualizeAudioWaveform()"
source: https://www.remotion.dev/docs/media-utils/visualize-audio-waveform
---

# visualizeAudioWaveform()

*Part of the `@remotion/media-utils`* package of helper functions.

This function takes in `AudioData` (for example fetched by [`useAudioData()`](/docs/use-audio-data)) and processes it for displaying as a waveform.

This function is suitable for visualizing voice. For visualizing music, use [`visualizeAudio()`](/docs/visualize-audio)

```tsx
Usage

const waveform = visualizeAudioWaveform({
  fps,
  frame,
  audioData,
  numberOfSamples: 16,
  windowInSeconds: 1 / fps,
});Copy
```

See [Examples](#examples) below.

## Arguments[​](#arguments "Direct link to Arguments")

The only argument for this function is an object containing the following values:

### `audioData`[​](#audiodata "Direct link to audiodata")

`AudioData`

An object containing audio data. You can fetch this object using [`useAudioData()`](/docs/use-audio-data) or [`getAudioData()`](/docs/get-audio-data).

### `frame`[​](#frame "Direct link to frame")

`number`

The time of the track that you want to get the audio information for. The `frame` always refers to the position in the audio track - if you have shifted or trimmed the audio in your timeline, the frame returned by `useCurrentFrame` must also be tweaked before you pass it into this function.

### `fps`[​](#fps "Direct link to fps")

`number`

The frame rate of the composition. This helps the function understand the meaning of the `frame` input.

### `numberOfSamples`[​](#numberofsamples "Direct link to numberofsamples")

`number`

Must be a power of two, such as `32`, `64`, `128`, etc. This parameter controls the length of the output array. A lower number will simplify the spectrum and is useful if you want to animate elements roughly based on the level of lows, mids and highs. A higher number will give the spectrum in more detail, which is useful for displaying a bar chart or waveform-style visualization of the audio.

### `windowInSeconds`[​](#windowinseconds "Direct link to windowinseconds")

`number`

Time in seconds (can be float) which represents the duration for which you want to see the audio waveform.  
Example: Your video has an `fps` of 30, and you pass 15 as the `frame` on `visualizeAudioWaveform` and 0.25 as `windowInSeconds` then output will have audio waveform data from (15/30) - .125 = 0.375 sec to (15/30) +0.125 = 0.625 sec.

### `dataOffsetInSeconds`[v4.0.268](https://github.com/remotion-dev/remotion/releases/v4.0.268)[​](#dataoffsetinseconds "Direct link to dataoffsetinseconds")

The amount of seconds the audio is offset, pass this parameter if you are using [`useWindowedAudioData()`](/docs/use-windowed-audio-data).

### `normalize?`[v4.0.280](https://github.com/remotion-dev/remotion/releases/v4.0.280)[​](#normalize "Direct link to normalize")

*boolean*

Default `false`. If set to `true`, then the wave data gets scaled so that the biggest value is `1`.

## Return value[​](#return-value "Direct link to Return value")

`number[]`

An array of values describing the amplitude of each frequency range.  
Each value is between -1 and 1.  
The array is of length defined by the `numberOfSamples` parameter.

## Examples[​](#examples "Direct link to Examples")

### Basic example[​](#basic-example "Direct link to Basic example")

```tsx
import {createSmoothSvgPath, useAudioData, visualizeAudioWaveform} from '@remotion/media-utils';
import React from 'react';
import {AbsoluteFill, Html5Audio, useCurrentFrame, useVideoConfig, staticFile} from 'remotion';

const height = 300;

const BaseExample: React.FC = () => {
  const frame = useCurrentFrame();
  const audioDataVoice = useAudioData(staticFile('podcast.wav'));
  const {width, fps} = useVideoConfig();

  if (!audioDataVoice) {
    return null;
  }

  const waveform = visualizeAudioWaveform({
    fps,
    frame,
    audioData: audioDataVoice,
    numberOfSamples: 32,
    windowInSeconds: 1 / fps,
  });

  const p = createSmoothSvgPath({
    points: waveform.map((x, i) => {
      return {
        x: (i / (waveform.length - 1)) * width,
        y: (x - 0.5) * height + height / 2,
      };
    }),
  });

  return (
    <div style={{flex: 1}}>
      <Html5Audio src={staticFile('podcast.wav')} />
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
        <svg style={{backgroundColor: ' #0B84F3'}} viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
          <path stroke="white" fill="none" strokeWidth={10} d={p as string} />
        </svg>
      </AbsoluteFill>
    </div>
  );
};Copy
```

  

### Sliding effect[​](#sliding-effect "Direct link to Sliding effect")

By increasing the `windowInSeconds` by tenfold, the audiogram starts moving to the right:

```tsx
const waveform = visualizeAudioWaveform({
  fps,
  frame,
  audioData: audioDataVoice,
  numberOfSamples: 32,
  windowInSeconds: 10 / fps,
});Copy
```

  

### Posterizing[​](#posterizing "Direct link to Posterizing")

By only calculating the waveform every third frame, we make the waveform calmer and generate a cool effect:

```tsx
const waveform = visualizeAudioWaveform({
  fps,
  frame: Math.round(frame / 3) * 3,
  audioData: audioDataVoice,
  numberOfSamples: 32,
  windowInSeconds: 10 / fps,
});Copy
```

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/media-utils/src/visualize-audio-waveform.ts)
- [Audio visualization](/docs/audio/visualization)
- [`useAudioData()`](/docs/use-audio-data)
- [`getAudioData()`](/docs/get-audio-data)
- [`<Html5Audio/>`](/docs/html5-audio)
- [Using audio](/docs/using-audio)
