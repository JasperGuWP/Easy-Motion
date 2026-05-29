---
title: "toCaptions()v4.0.216"
source: https://www.remotion.dev/docs/install-whisper-cpp/to-captions
---

# toCaptions()[v4.0.216](https://github.com/remotion-dev/remotion/releases/v4.0.216)

Converts the output from [`transcribe()`](/docs/install-whisper-cpp/transcribe) into an array of [`Caption`](/docs/captions/caption) objects, so you can use the functions from [`@remotion/captions`](/docs/captions/api).

```tsx
generate-captions.mjs

import {toCaptions, transcribe} from '@remotion/install-whisper-cpp';
import path from 'path';

const whisperCppOutput = await transcribe({
  inputPath: '/path/to/audio.wav',
  whisperPath: path.join(process.cwd(), 'whisper.cpp'),
  whisperCppVersion: '1.5.5',
  model: 'medium.en',
  tokenLevelTimestamps: true,
});

const {captions} = toCaptions({
  whisperCppOutput,
});

console.log(captions); /*
 [
    {
      text: "William",
      startMs: 40,
      endMs: 420,
      timestampMs: 240,
      confidence: 0.813602,
    }, {
      text: " just",
      startMs: 420,
      endMs: 650,
      timestampMs: 480,
      confidence: 0.990905,
    }, {
      text: " hit",
      startMs: 650,
      endMs: 810,
      timestampMs: 700,
      confidence: 0.981798,
    }
  ]
*/Copy
```

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/install-whisper-cpp/src/to-captions.ts)
- [`@remotion/install-whisper-cpp`](/docs/install-whisper-cpp)
- [`@remotion/captions`](/docs/captions/api)
