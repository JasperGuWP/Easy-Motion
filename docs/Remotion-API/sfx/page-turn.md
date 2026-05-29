---
title: "pageTurnv4.0.429"
source: https://www.remotion.dev/docs/sfx/page-turn
---

# pageTurn[v4.0.429](https://github.com/remotion-dev/remotion/releases/v4.0.429)

  

A URL pointing to a page turn sound effect WAV file.

## Example[​](#example "Direct link to Example")

```tsx
MyComp.tsx

import {pageTurn} from '@remotion/sfx';
import {Audio} from '@remotion/media';

const MyVideo = () => {
  return <Audio src={pageTurn} />;
};Copy
```

## Value[​](#value "Direct link to Value")

```tsx
https://remotion.media/page-turn.wavCopy
```

## Duration[​](#duration "Direct link to Duration")

0.400 seconds (1 channel, 44100 Hz, 16-bit)

## Attribution[​](#attribution "Direct link to Attribution")

Draw Knife 1 by kenney.nl - [kenney.nl](https://kenney.nl) - License: Creative Commons 0

## See also[​](#see-also "Direct link to See also")

- [`whip`](/docs/sfx/whip)
- [`whoosh`](/docs/sfx/whoosh)
