---
title: "bufferWriter"
source: https://www.remotion.dev/docs/webcodecs/buffer-writer
---

# bufferWriter

warning

[We are phasing out Remotion WebCodecs and are moving to Mediabunny](/blog/mediabunny)!

💼 Important License Disclaimer

This package is licensed under the [Remotion License](/docs/license).  
We consider a team of 4 or more people a "company".

  

**For "companies"**: A Remotion Company license needs to be obtained to use this package.  
 In a future version of `@remotion/webcodecs`, this package will also require the purchase of a newly created "WebCodecs Conversion Seat". [Get in touch](/contact) with us if you are planning to use this package.

  

**For individuals and teams up to 3:** You can use this package for free.

  

This is a short, non-binding explanation of our license. See the [License](/docs/license) itself for more details.

warning

**Unstable API**: The writer interface is experimental. The API may change in the future.

A writer for `@remotion/webcodecs` that writes to an in-memory resizable ArrayBuffer.

Can be used for [`convertMedia()`](/docs/webcodecs/convert-media) to write the converted output to memory as a buffer.

## Example[​](#example "Direct link to Example")

```tsx
Using bufferWriter

import {convertMedia} from '@remotion/webcodecs';
import {bufferWriter} from '@remotion/webcodecs/buffer';

const result = await convertMedia({
  src: 'https://remotion.media/BigBuckBunny.mp4',
  container: 'webm',
  writer: bufferWriter,
});

const blob = await result.save();Copy
```

## Memory limitations[​](#memory-limitations "Direct link to Memory limitations")

The `bufferWriter` uses a resizable ArrayBuffer with a maximum size of 2GB. If your output file would exceed this limit, the conversion will fail.

```tsx
Error handling for large files

import {convertMedia} from '@remotion/webcodecs';
import {bufferWriter} from '@remotion/webcodecs/buffer';

try {
  const result = await convertMedia({
    src: 'very-large-video.mp4',
    container: 'webm',
    writer: bufferWriter,
  });
} catch (error) {
  if ((error as Error).message.includes('Could not create buffer writer')) {
    // Handle case where ArrayBuffer cannot be resized further
    console.log('File too large for buffer writer, consider using webFsWriter');
  }
}Copy
```

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/webcodecs/src/writers/buffer-implementation/writer.ts)
- [`webFsWriter`](/docs/webcodecs/web-fs-writer) - Alternative file system writer
- [`convertMedia()`](/docs/webcodecs/convert-media)
