---
title: "getLottieMetadata()"
source: https://www.remotion.dev/docs/lottie/getlottiemetadata
---

# getLottieMetadata()

*Part of the [`@remotion/lottie`](/docs/lottie) package.*

Using this function, you can get the basic metadata such as dimensions, duration and framerate of a Lottie animation.

```tsx
Animation.tsx

import { getLottieMetadata } from "@remotion/lottie";

// animationData is a JSON object, can be imported from a .json file, remote file or using staticFile()
const metadata = getLottieMetadata(animationData);

/*
{
  durationInFrames: 90,
  durationInSeconds: 3.0030030030030037,
  fps: 29.9700012207031,
  height: 1080,
  width: 1920,
}
*/Copy
```

## API[​](#api "Direct link to API")

The function takes one argument, a JavaScript object that adheres to the Lottie schema.

### Return value[​](#return-value "Direct link to Return value")

If the metadata cannot be parsed, this function returns `null`.

If the metadata can be parsed, it returns an object with the following properties:

#### `height`[​](#height "Direct link to height")

The natural height of the animation in pixels.

#### `width`[​](#width "Direct link to width")

The natural width of the animation in pixels.

#### `durationInSeconds`[​](#durationinseconds "Direct link to durationinseconds")

The duration of the animation in seconds, if the `fps` from this object is used.

#### `durationInFrames`[​](#durationinframes "Direct link to durationinframes")

The duration of the animation in frames, if the `fps` from this object is used.

note

This value is rounded down to the closest integer, since Remotion does not support non-integer values for `durationInFrames`.

#### `fps`[​](#fps "Direct link to fps")

The natural framerate of the Lottie animation.

## See also[​](#see-also "Direct link to See also")

- [Change Remotion composition metadata based on Lottie metadata](/docs/dynamic-metadata)
