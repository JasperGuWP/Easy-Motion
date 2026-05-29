---
title: "preloadGif()"
source: https://www.remotion.dev/docs/gif/preload-gif
---

# preloadGif()

*available from v3.3.38*

Call `preloadGif(src)` with the URL of the GIF that you would like to load and the GIF will be prepared for display in the [`<Player>`](/docs/player).

The function returns an object with two entries: `waitUntilDone()` that returns a Promise which can be awaited and `free()` which will cancel preloading or free up the memory if the GIF is not being used anymore.

```tsx
import { preloadGif } from "@remotion/gif";

const { waitUntilDone, free } = preloadGif(
  "https://media.giphy.com/media/xT0GqH01ZyKwd3aT3G/giphy.gif"
);

waitUntilDone().then(() => {
  console.log("The GIF is now ready to play!");

  // Later, free the memory of the GIF
  free();
});Copy
```

## See also[​](#see-also "Direct link to See also")

- [`<Gif>`](/docs/gif)
- [Preloading](/docs/preload)
