---
title: "toggle()v4.0.287"
source: https://www.remotion.dev/docs/studio/toggle
---

# toggle()[v4.0.287](https://github.com/remotion-dev/remotion/releases/v4.0.287)

Toggles playback in the Remotion Studio. If the composition is currently playing, it will pause. If it's paused, it will start playing.

The function accepts an optional event parameter which can be a `React.SyntheticEvent` or a [`PointerEvent`](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent). This allows the function to be used directly as an event handler.

## Examples[​](#examples "Direct link to Examples")

```tsx
Toggle playback on button click

import {toggle} from '@remotion/studio';

const ToggleButton = () => {
  // Call with the event parameter for better browser audio autoplay

  return <button onClick={(e) => toggle(e)}>Play/Pause</button>;
};Copy
```

```tsx
Toggle playback programmatically

import {toggle} from '@remotion/studio';

// Call without event parameter
toggle();Copy
```

## See also[​](#see-also "Direct link to See also")

- [play()](/docs/studio/play)
- [pause()](/docs/studio/pause)
- [seek()](/docs/studio/seek)
- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/studio/src/api/toggle.ts)
