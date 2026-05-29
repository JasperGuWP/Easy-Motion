---
title: "rotateAndResizeVideoFrame()v4.0.316"
source: https://www.remotion.dev/docs/webcodecs/rotate-and-resize-video-frame
---

warning

[We are phasing out Remotion WebCodecs and are moving to Mediabunny](/blog/mediabunny)!

# rotateAndResizeVideoFrame()[v4.0.316](https://github.com/remotion-dev/remotion/releases/v4.0.316)

*Part of the [`@remotion/webcodecs`](/docs/webcodecs) package.*

💼 Important License Disclaimer

This package is licensed under the [Remotion License](/docs/license).  
We consider a team of 4 or more people a "company".

  

**For "companies"**: A Remotion Company license needs to be obtained to use this package.  
 In a future version of `@remotion/webcodecs`, this package will also require the purchase of a newly created "WebCodecs Conversion Seat". [Get in touch](/contact) with us if you are planning to use this package.

  

**For individuals and teams up to 3:** You can use this package for free.

  

This is a short, non-binding explanation of our license. See the [License](/docs/license) itself for more details.

Resizes and/or rotates a [`VideoFrame`](https://developer.mozilla.org/en-US/docs/Web/API/VideoFrame) object.  
Returns a new [`VideoFrame`](https://developer.mozilla.org/en-US/docs/Web/API/VideoFrame) object with the applied transformations, or the original frame if no transformations are applied.

```tsx
Rotating a video frame by 90 degrees

import {rotateAndResizeVideoFrame} from '@remotion/webcodecs';

// Assume you have a VideoFrame object
declare const frame: VideoFrame;

const rotatedFrame = rotateAndResizeVideoFrame({
  frame,
  rotation: 90,
  resizeOperation: null,
});

console.log('Original dimensions:', frame.displayWidth, 'x', frame.displayHeight);
console.log('Rotated dimensions:', rotatedFrame.displayWidth, 'x', rotatedFrame.displayHeight);Copy
```

```tsx
Resizing a video frame by width

import {rotateAndResizeVideoFrame} from '@remotion/webcodecs';

// Assume you have a VideoFrame object
declare const frame: VideoFrame;

const resizedFrame = rotateAndResizeVideoFrame({
  frame,
  rotation: 0,
  resizeOperation: {
    mode: 'width',
    width: 640,
  },
});

console.log('Resized frame width:', resizedFrame.displayWidth);Copy
```

```tsx
Rotating and resizing together

import {rotateAndResizeVideoFrame} from '@remotion/webcodecs';

// Assume you have a VideoFrame object
declare const frame: VideoFrame;

const transformedFrame = rotateAndResizeVideoFrame({
  frame,
  rotation: 180,
  resizeOperation: {
    mode: 'height',
    height: 480,
  },
  needsToBeMultipleOfTwo: true,
});Copy
```

## API[​](#api "Direct link to API")

### `frame`[​](#frame "Direct link to frame")

A [`VideoFrame`](https://developer.mozilla.org/en-US/docs/Web/API/VideoFrame) object to be transformed.

### `rotation`[​](#rotation "Direct link to rotation")

The rotation angle in degrees. Only multiples of 90 degrees are supported (0, 90, 180, 270, etc.).

### `resizeOperation`[​](#resizeoperation "Direct link to resizeoperation")

A resize operation to apply to the frame, or `null` if no resizing is needed.  
See: [Resize modes](/docs/webcodecs/resize-a-video#resize-modes) for available options.

### `needsToBeMultipleOfTwo?`[​](#needstobemultipleoftwo "Direct link to needstobemultipleoftwo")

Whether the resulting dimensions should be multiples of 2. Default: `false`.  
This is often required if encoding to a codec like H.264.  
If `true`, the dimensions will be rounded down to the nearest even number.

## Behavior[​](#behavior "Direct link to Behavior")

The function returns the **original frame** unchanged in these cases:

- No rotation (0°) and no resize operation is specified
- No rotation (0°) and resize operation results in the same dimensions

Otherwise, it returns a **new `VideoFrame`** object:

- When rotation is applied (90°, 180°, 270°, etc.)
- When resizing changes the dimensions
- When both rotation and resizing are applied

Additional behavior notes:

- Rotation is applied first, then resizing
- For 90° and 270° rotations, the width and height are swapped
- The function creates a new `VideoFrame` using an `OffscreenCanvas` for the transformation

## Memory Management[​](#memory-management "Direct link to Memory Management")

**Important**: You are responsible for closing `VideoFrame` objects to prevent memory leaks. Since this function may return either the original frame or a new frame, you should check if a new frame was created before closing the original:

```tsx
Proper memory cleanup

import {rotateAndResizeVideoFrame} from '@remotion/webcodecs';

// Assume you have a VideoFrame object
declare const originalFrame: VideoFrame;

const transformedFrame = rotateAndResizeVideoFrame({
  frame: originalFrame,
  rotation: 90,
  resizeOperation: null,
});

// Only close the original frame if a new one was created
if (transformedFrame !== originalFrame) {
  originalFrame.close();
}

// Remember to also close the transformed frame when you're done with it
// transformedFrame.close();Copy
```

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/webcodecs/src/rotate-and-resize-video-frame.ts)
