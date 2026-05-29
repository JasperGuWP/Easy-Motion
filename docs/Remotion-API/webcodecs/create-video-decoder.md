---
title: "createVideoDecoder()v4.0.307"
source: https://www.remotion.dev/docs/webcodecs/create-video-decoder
---

warning

[We are phasing out Remotion WebCodecs and are moving to Mediabunny](/blog/mediabunny)!

warning

This package is experimental.  
We might change the API at any time, until we remove this notice.

# createVideoDecoder()[v4.0.307](https://github.com/remotion-dev/remotion/releases/v4.0.307)

This function is a wrapper around the [`VideoDecoder`](https://developer.mozilla.org/en-US/docs/Web/API/VideoDecoder) Web API.

```tsx
Create a video decoder

import {createVideoDecoder} from '@remotion/webcodecs';

const decoder = await createVideoDecoder({
  track,
  onFrame: console.log,
  onError: console.error,
});Copy
```

## Differences to `VideoDecoder`[​](#differences-to-videodecoder "Direct link to differences-to-videodecoder")

- Two new methods are added: [`.waitForQueueToBeLessThan()`](#waitforqueuetobelessthan) and `.waitForFinish()`.
- The [`dequeue`](https://developer.mozilla.org/en-US/docs/Web/API/VideoDecoder/dequeue_event) event is not supported as it is not reliable across browsers.
- In addition to [`EncodedVideoChunk`](https://developer.mozilla.org/en-US/docs/Web/API/EncodedVideoChunk), [`EncodedVideoChunkInit`](https://www.w3.org/TR/webcodecs/#dictdef-encodedvideochunkinit) objects are also accepted for `.decode()`.
- A [`webcodecsController()`](/docs/webcodecs/webcodecs-controller) instance can be passed in to the function, allowing for decoding to be paused, resumed and aborted.
- `.decode()` is async, and returns a promise, allowing for a halt if the decoder is paused.
- A [`logLevel`](#loglevel) can be passed in to the function, allowing the queue to be debugged.
- The [`onFrame`](#onframe) callback is being awaited. When rejected, the error lands in the [`onError`](#onerror) callback. When resolved, only then the queue size counter will be decreased.

## API[​](#api "Direct link to API")

Takes an object with the following properties:

### `track`[​](#track "Direct link to track")

An [`VideoDecoderConfig`](https://www.w3.org/TR/webcodecs/#dictdef-videodecoderconfig) object.  
You may pass a [`MediaParserVideoTrack`](/docs/media-parser/types#mediaparservideotrack) object from [`parseMedia()`](/docs/media-parser/parse-media), which also is an `VideoDecoderConfig` object.

### `onFrame`[​](#onframe "Direct link to onframe")

A callback that is called when a frame is decoded.

Takes a single argument, which is a [`VideoFrame`](https://developer.mozilla.org/en-US/docs/Web/API/VideoFrame) object.

If the passed callback is asynchronous, the queue size counter will be decreased only after the callback has been resolved.

However, the callback for the next frame may already be called while your callback is still running.  
We do not ensure that callbacks are running sequentially.

### `onError`[​](#onerror "Direct link to onerror")

A callback that is called when an error occurs or the decode is aborted through the controller.

Takes a single argument, which is an [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) object.

### `controller?`[​](#controller "Direct link to controller")

A [`webcodecsController()`](/docs/webcodecs/webcodecs-controller) instance.

If provided, you can call [`.pause()`](/docs/webcodecs/webcodecs-controller#pause), [`.resume()`](/docs/webcodecs/webcodecs-controller#resume) and [`.abort()`](/docs/webcodecs/webcodecs-controller#abort) on the controller to pause, resume and abort the decoding.

### `logLevel?`[​](#loglevel "Direct link to loglevel")

*string* `LogLevel`

One of `"error"`, `"warn"`, `"info"`, `"debug"`, `"trace"`.  
Default value: `"info"`, which logs only important information.

## Return type[​](#return-type "Direct link to Return type")

Returns an object with the following properties:

### `waitForQueueToBeLessThan()`[​](#waitforqueuetobelessthan "Direct link to waitforqueuetobelessthan")

Pass a number to wait for the queue to be less than the given number.

A promise that resolves when the queue size is less than the given number.  
The queue is only decremented when the [`onFrame`](#onframe) callback resolves.

### `flush()`[​](#flush "Direct link to flush")

Flushes the decoder, forcing the queue to be cleared. Returns a promise that resolves when all frames have been cleared and the [`onFrame()`](#onframe) callback has beeen resolved for all frames.

### `reset()`[​](#reset "Direct link to reset")

Clears the queue and resets the decoder. Same as [`VideoDecoder.reset()`](https://developer.mozilla.org/en-US/docs/Web/API/VideoDecoder/reset) + [`VideoDecoder.configure()`](https://developer.mozilla.org/en-US/docs/Web/API/VideoDecoder/close).

### `close()`[​](#close "Direct link to close")

Closes the decoder. Same as [`AudioDecoder.close()`](https://developer.mozilla.org/en-US/docs/Web/API/AudioDecoder/close).

### `checkReset()`[v4.0.312](https://github.com/remotion-dev/remotion/releases/v4.0.312)[​](#checkreset "Direct link to checkreset")

Returns a handle with a `wasReset()` function. If the decoder was reset inbetween the call to `.checkReset()` and the call to `wasReset()`, `wasReset()` will return `true`. See [below](#checking-if-the-decoder-was-reset) for an example.

### `getMostRecentSampleInput()`[v4.0.312](https://github.com/remotion-dev/remotion/releases/v4.0.312)[​](#getmostrecentsampleinput "Direct link to getmostrecentsampleinput")

Return the `.timestamp` of the most recently input sample.

## Example usage with `@remotion/media-parser`[​](#example-usage-with-remotionmedia-parser "Direct link to example-usage-with-remotionmedia-parser")

```tsx
Decode a video track

import {parseMedia} from '@remotion/media-parser';
import {createVideoDecoder} from '@remotion/webcodecs';

await parseMedia({
  src: 'https://remotion.media/video.mp4',
  onVideoTrack: async ({track, container}) => {
    const decoder = await createVideoDecoder({
      track,
      onFrame: console.log,
      onError: console.error,
    });

    return async (sample) => {
      // Called on every sample
      await decoder.waitForQueueToBeLessThan(10);
      await decoder.decode(sample);

      return async () => {
        // Called when the track is done
        await decoder.flush();
        decoder.close();
      };
    };
  },
});Copy
```

## Checking if the decoder was reset[​](#checking-if-the-decoder-was-reset "Direct link to Checking if the decoder was reset")

A potential race condition you may face is that `decoder.reset()` is called while a sample is waiting for the queue to be less than a certain number. Use `.checkReset()` to check if the decoder was reset after any asynchronous operation, and abort the processing of the sample if needed.

```tsx
Check if the decoder was reset

import {parseMedia} from '@remotion/media-parser';
import {createVideoDecoder} from '@remotion/webcodecs';

await parseMedia({
  src: 'https://remotion.media/video.mp4',
  onVideoTrack: async ({track, container}) => {
    const decoder = await createVideoDecoder({
      track,
      onFrame: console.log,
      onError: console.error,
    });

    return async (sample) => {
      const {wasReset} = decoder.checkReset();

      await decoder.waitForQueueToBeLessThan(10);
      if (wasReset()) {
        return;
      }

      await decoder.decode(sample);
      if (wasReset()) {
        return;
      }

      return async () => {
        if (wasReset()) {
          return;
        }

        // Called when the track is done
        await decoder.flush();
        decoder.close();
      };
    };
  },
});Copy
```

## Undecodable video[v4.0.333](https://github.com/remotion-dev/remotion/releases/v4.0.333)[​](#undecodable-video "Direct link to undecodable-video")

If the video cannot be decoded by the browser, an `VideoUndecodableError` will be thrown.

```tsx
Undecodable audio

import {VideoUndecodableError, createVideoDecoder} from '@remotion/webcodecs';

try {
  await createVideoDecoder({
    track: {codec: 'invalid'},
    onFrame: console.log,
    onError: console.error,
  });
} catch (error) {
  if (error instanceof VideoUndecodableError) {
    console.log('The video cannot be decoded by this browser');
  } else {
    throw error;
  }
}Copy
```

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/webcodecs/src/create-video-decoder.ts)
- [`@remotion/webcodecs`](/docs/webcodecs)
