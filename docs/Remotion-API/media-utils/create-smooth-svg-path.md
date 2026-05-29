---
title: "createSmoothSvgPath()"
source: https://www.remotion.dev/docs/media-utils/create-smooth-svg-path
---

# createSmoothSvgPath()

*Part of the `@remotion/media-utils`* package of helper functions.

This function takes points, usually generated from [`visualizeAudioWaveform()`](/docs/media-utils/visualize-audio-waveform) or [`visualizeAudio()`](/docs/visualize-audio), and adds SVG `C` (curve) statements inbetween them to create a smooth path.

## Example[​](#example "Direct link to Example")

```tsx
import {createSmoothSvgPath} from '@remotion/media-utils';
import React from 'react';

const points = [
  {x: 0, y: 0},
  {x: 100, y: 100},
  {x: 200, y: 50},
  {x: 300, y: 150},
];

const path = createSmoothSvgPath({points});Copy
```

See a practical example [here](/docs/media-utils/visualize-audio-waveform#examples).

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/media-utils/src/create-smooth-svg-path.ts)
- [Audio visualization](/docs/audio/visualization)
