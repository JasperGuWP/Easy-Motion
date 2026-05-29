---
title: "seek()v4.0.259"
source: https://www.remotion.dev/docs/studio/seek
---

# seek()[v4.0.259](https://github.com/remotion-dev/remotion/releases/v4.0.259)

Jump to a position in time in the Remotion Studio.

If a number smaller than 0 is passed, the value will be automatically clamped to 0.  
If a number greater than or equal to the duration of the composition is passed, the value will be automatically clamped to `durationInFrames - 1`.

Use [`useVideoConfig()`](/docs/use-video-config) to get the duration of the composition.

## Examples[​](#examples "Direct link to Examples")

```tsx
Saving {color: 'green'} to Root.tsx

import {seek} from '@remotion/studio';

seek(100);Copy
```

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/studio/src/api/seek.ts)
