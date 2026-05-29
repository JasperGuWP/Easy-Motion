---
title: "play()v4.0.287"
source: https://www.remotion.dev/docs/studio/play
---

# play()[v4.0.287](https://github.com/remotion-dev/remotion/releases/v4.0.287)

Starts playback in the Remotion Studio.

The function accepts an optional event parameter which can be a `React.SyntheticEvent` or a [`PointerEvent`](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent). This allows the function to be used directly as an event handler.

## Examples[​](#examples "Direct link to Examples")

```tsx
Start playing on button click

import {play} from '@remotion/studio';

const PlayButton = () => {
  // Call with the event parameter for better browser audio autoplay
  return <button onClick={(e) => play(e)}>Play</button>;
};Copy
```

```tsx
Start playing programmatically

import {play} from '@remotion/studio';

// Call without event parameter
play();Copy
```

## See also[​](#see-also "Direct link to See also")

- [pause()](/docs/studio/pause)
- [toggle()](/docs/studio/toggle)
- [seek()](/docs/studio/seek)
- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/studio/src/api/play.ts)
