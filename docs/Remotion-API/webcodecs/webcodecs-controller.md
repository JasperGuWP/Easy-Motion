---
title: "webcodecsController()"
source: https://www.remotion.dev/docs/webcodecs/webcodecs-controller
---

# webcodecsController()

warning

[We are phasing out Remotion WebCodecs and are moving to Mediabunny](/blog/mediabunny)!

Pass `webcodecsController()` to [`controller`](/docs/webcodecs/convert-media#controller) to steer the `convertMedia()` function.

```tsx
Use webcodecsController()

import {webcodecsController, convertMedia} from '@remotion/webcodecs';

const controller = webcodecsController();

convertMedia({
  src: 'https://www.w3schools.com/html/mov_bbb.mp4',
  container: 'webm',
  controller,
});

// Pause
controller.pause();

// Resume
controller.resume();

// Abort
controller.abort();Copy
```

## API[​](#api "Direct link to API")

This function returns an object that can be passed to [`convertMedia({controller})`](/docs/webcodecs/convert-media#controller).

It has the following methods:

### `pause()`[​](#pause "Direct link to pause")

Pauses the conversion.

### `resume()`[​](#resume "Direct link to resume")

Resumes the conversion.

### `abort()`[​](#abort "Direct link to abort")

Aborts the conversion.

### `addEventListener()`[​](#addeventlistener "Direct link to addeventlistener")

See events below.

### `removeEventListener()`[​](#removeeventlistener "Direct link to removeeventlistener")

See events below.

## Events[​](#events "Direct link to Events")

You can attach event listeners to the `webcodecsController` object.

```tsx
Use events

import {webcodecsController, convertMedia} from '@remotion/webcodecs';

const controller = webcodecsController();

const onPause = () => {
  console.log('Paused');
};

const onResume = () => {
  console.log('Resumed');
};

controller.addEventListener('pause', onPause);
controller.addEventListener('resume', onResume);

// Make sure to cleanup later:
controller.removeEventListener('pause', onPause);
controller.removeEventListener('resume', onResume);Copy
```

The `webcodecsController` object emits the following events:

### `pause`[​](#pause-1 "Direct link to pause-1")

Emitted when the conversion is paused.

### `resume`[​](#resume-1 "Direct link to resume-1")

Emitted when the conversion is resumed.

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/webcodecs/src/webcodecs-controller.ts)
- [Pause, resume and abort conversion](/docs/webcodecs/pause-resume-abort)
- [`convertMedia()`](/docs/webcodecs/convert-media)
