---
title: "mediaParserController()"
source: https://www.remotion.dev/docs/media-parser/media-parser-controller
---

# mediaParserController()

warning

[We are phasing out Media Parser and are moving to Mediabunny](/blog/mediabunny)!

Pass `mediaParserController()` to [`controller`](/docs/media-parser/parse-media#controller) to steer the `parseMedia()` function.

Each `mediaParserController` can only be attached to 1 [`parseMedia()`](/docs/media-parser/parse-media) call.

```tsx
Use mediaParserController()

import {mediaParserController, parseMedia} from '@remotion/media-parser';

const controller = mediaParserController();

parseMedia({
  src: 'https://www.w3schools.com/html/mov_bbb.mp4',
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

This function returns an object that can be passed to [`parseMedia({controller})`](/docs/media-parser/parse-media#controller).

It has the following methods:

### `pause()`[​](#pause "Direct link to pause")

Pauses the download and parsing process.

### `resume()`[​](#resume "Direct link to resume")

Resumes the download and parsing process.

### `abort()`[​](#abort "Direct link to abort")

Aborts the download and parsing process.

### `seek(timeInSeconds: number)`[​](#seektimeinseconds-number "Direct link to seektimeinseconds-number")

[Seeks to the best keyframe](/docs/media-parser/seeking) that comes before the time you specified.

### `getSeekingHints()`[​](#getseekinghints "Direct link to getseekinghints")

Returns a promise that resolves to the [seeking hints](/docs/media-parser/seeking-hints).

### `addEventListener()`[​](#addeventlistener "Direct link to addeventlistener")

See events below.

### `removeEventListener()`[​](#removeeventlistener "Direct link to removeeventlistener")

See events below.

## Events[​](#events "Direct link to Events")

You can attach event listeners to the object returned by `mediaParserController()`.

```tsx
Use events

import {mediaParserController, parseMedia} from '@remotion/media-parser';

const controller = mediaParserController();

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

It also emits the following events:

### `pause`[​](#pause-1 "Direct link to pause-1")

Emitted when the download and parsing process is paused.

### `resume`[​](#resume-1 "Direct link to resume-1")

Emitted when the download and parsing process is resumed.

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/media-parser/src/media-parser-controller.ts)
- [Pause, resume and abort parsing](/docs/media-parser/pause-resume-abort)
- [`parseMedia()`](/docs/media-parser/parse-media)
