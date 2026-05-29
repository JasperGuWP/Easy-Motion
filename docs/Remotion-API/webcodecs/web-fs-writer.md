---
title: "webFsWriter"
source: https://www.remotion.dev/docs/webcodecs/web-fs-writer
---

# webFsWriter

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

A writer for `@remotion/webcodecs` that writes to the browser's file system using the File System Access API.

Can be used for [`convertMedia()`](/docs/webcodecs/convert-media) to write the converted output directly to a temporary file in the browser's origin-private file system.

## Availability[​](#availability "Direct link to Availability")

This writer is only available in browsers that support the [File System Access API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API). Use [`canUseWebFsWriter()`](#canusewebfswriter) to check if it's available.

## Example[​](#example "Direct link to Example")

```tsx
Using webFsWriter

import {convertMedia} from '@remotion/webcodecs';
import {webFsWriter} from '@remotion/webcodecs/web-fs';

const result = await convertMedia({
  src: 'https://remotion.media/BigBuckBunny.mp4',
  container: 'webm',
  writer: webFsWriter,
});

const blob = await result.save();Copy
```

## canUseWebFsWriter()[​](#canusewebfswriter "Direct link to canUseWebFsWriter()")

A function that returns a `Promise<boolean>` indicating whether the `webFsWriter` can be used in the current environment.

```tsx
Checking availability

import {canUseWebFsWriter, webFsWriter} from '@remotion/webcodecs/web-fs';

const canUse = await canUseWebFsWriter();
if (canUse) {
  // Use webFsWriter
} else {
  // Fall back to bufferWriter or another writer
}Copy
```

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/webcodecs/src/writers/web-fs.ts)
- [`bufferWriter`](/docs/webcodecs/buffer-writer) - Alternative in-memory writer
- [`convertMedia()`](/docs/webcodecs/convert-media)
