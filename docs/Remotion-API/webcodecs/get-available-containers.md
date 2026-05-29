---
title: "getAvailableContainers()"
source: https://www.remotion.dev/docs/webcodecs/get-available-containers
---

# getAvailableContainers()

warning

[We are phasing out Remotion WebCodecs and are moving to Mediabunny](/blog/mediabunny)!

Returns an array of available containers that can be used with the `convertMedia` function.

```tsx
Getting available containers

import {getAvailableContainers} from '@remotion/webcodecs';

const containers = getAvailableContainers();
console.log(containers);Copy
```

note

New containers may be added to this function and it will not be considered a breaking change.

## As a type[​](#as-a-type "Direct link to As a type")

If you need a TypeScript type that covers the available output containers, you can import the type definition:

```tsx
Type definition

import type {ConvertMediaContainer} from '@remotion/webcodecs';

(alias) type ConvertMediaContainer = "webm" | "mp4" | "wav"
import ConvertMediaContainer
```

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/webcodecs/src/get-available-containers.ts)
