---
title: "Embedding videos into Remotion"
source: https://www.remotion.dev/docs/videos/
---

# Embedding videos into Remotion

You can embed existing videos into Remotion by using the [`<OffthreadVideo>`](/docs/offthreadvideo) component.

```tsx
import React from 'react';
import {OffthreadVideo, staticFile} from 'remotion';

export const MyComp: React.FC = () => {
  return <OffthreadVideo src="https://remotion.media/BigBuckBunny.mp4" />;
};Copy
```

## Using a local file[​](#using-a-local-file "Direct link to Using a local file")

Put a file into the [`public` folder](/docs/terminology/public-dir) and reference it using [`staticFile()`](/docs/staticfile).

```tsx
import React from 'react';
import {OffthreadVideo, staticFile} from 'remotion';

export const MyComp: React.FC = () => {
  return <OffthreadVideo src={staticFile('video.mp4')} />;
};Copy
```

## Trimming[​](#trimming "Direct link to Trimming")

By using the [`trimBefore`](/docs/offthreadvideo#trimbefore) prop, you can remove the first few seconds of the video.  
In the example below, the first two seconds of the video are skipped (assuming a composition FPS of 30).

```tsx
import React from 'react';
import {OffthreadVideo, staticFile} from 'remotion';

export const MyComp: React.FC = () => {
  return <OffthreadVideo src={staticFile('video.mp4')} trimBefore={60} />;
};Copy
```

Similarly, you can use [`trimAfter`](/docs/offthreadvideo#trimafter) to trim the end of the video.

```tsx
import React from 'react';
import {OffthreadVideo, staticFile} from 'remotion';

export const MyComp: React.FC = () => {
  return <OffthreadVideo src={staticFile('video.mp4')} trimBefore={60} trimAfter={120} />;
};Copy
```

## Delaying[​](#delaying "Direct link to Delaying")

Use the [`<Sequence>`](/docs/sequence) component to delay the appearance of a video.  
In the example below, the video will start playing at frame 60.

```tsx
import React from 'react';
import {OffthreadVideo, staticFile, Sequence} from 'remotion';

export const MyComp: React.FC = () => {
  return (
    <Sequence from={60}>
      <OffthreadVideo src={staticFile('video.mp4')} />
    </Sequence>
  );
};Copy
```

## Size and Position[​](#size-and-position "Direct link to Size and Position")

You can size and position the video using CSS.  
You'll find the properties `width`, `height`, `position`, `left`, `top`, `right`, `bottom`, `margin`, `aspectRatio` and `objectFit` useful.

```tsx
import React from 'react';
import {OffthreadVideo, staticFile} from 'remotion';

export const MyComp: React.FC = () => {
  return (
    <OffthreadVideo
      src={staticFile('video.mp4')}
      style={{
        width: 640,
        height: 360,
        position: 'absolute',
        top: 100,
        left: 100,
      }}
    />
  );
};Copy
```

## Volume[​](#volume "Direct link to Volume")

You can set the volume of the video using the [`volume`](/docs/offthreadvideo#volume) prop.

```tsx
import React from 'react';
import {OffthreadVideo, staticFile} from 'remotion';

export const MyComp: React.FC = () => {
  return <OffthreadVideo src={staticFile('video.mp4')} volume={0.5} />;
};Copy
```

You can also mute a video using the [`muted`](/docs/offthreadvideo#muted) prop.

```tsx
import React from 'react';
import {OffthreadVideo, staticFile} from 'remotion';

export const MyComp: React.FC = () => {
  return <OffthreadVideo src={staticFile('video.mp4')} muted />;
};Copy
```

See [Using Audio](/docs/audio/volume) for more ways you can control volume.

## Speed[​](#speed "Direct link to Speed")

You can use the [`playbackRate`](/docs/offthreadvideo#playbackrate) prop to change the speed of the video.

```tsx
import React from 'react';
import {OffthreadVideo, staticFile} from 'remotion';

export const MyComp: React.FC = () => {
  return <OffthreadVideo src={staticFile('video.mp4')} playbackRate={2} />;
};Copy
```

This only works if the speed is constant. See also: [Changing the speed of a video over time](/docs/miscellaneous/snippets/accelerated-video).

## Looping[​](#looping "Direct link to Looping")

See: [Looping an `<OffthreadVideo>`](/docs/offthreadvideo#looping-a-offthreadvideo)

## GIFs[​](#gifs "Direct link to GIFs")

See: [Using GIFs](/docs/gif)

## See also[​](#see-also "Direct link to See also")

- [`<OffthreadVideo>`](/docs/offthreadvideo)
- [Using Audio](/docs/using-audio)
