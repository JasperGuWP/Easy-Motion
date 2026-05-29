---
title: "pause()v4.0.287"
source: https://www.remotion.dev/docs/studio/pause
---

# pause()[v4.0.287](https://github.com/remotion-dev/remotion/releases/v4.0.287)

Pauses playback in the Remotion Studio.

## Examples[​](#examples "Direct link to Examples")

```tsx
Pause on button click

import {pause} from '@remotion/studio';

const PauseButton = () => {
  return <button onClick={pause}>Pause</button>;
};Copy
```

```tsx
Pause programmatically

import {pause} from '@remotion/studio';

// Pause playback
pause();Copy
```

## See also[​](#see-also "Direct link to See also")

- [play()](/docs/studio/play)
- [toggle()](/docs/studio/toggle)
- [seek()](/docs/studio/seek)
- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/studio/src/api/pause.ts)
