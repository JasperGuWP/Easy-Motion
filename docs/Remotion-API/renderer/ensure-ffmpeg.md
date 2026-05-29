---
title: "ensureFfmpeg()v3.3"
source: https://www.remotion.dev/docs/renderer/ensure-ffmpeg
---

# ensureFfmpeg()[v3.3](https://github.com/remotion-dev/remotion/releases/v3.3)

*Removed from v4.0*

warning

This API has been removed in v4.0 and is not necessary to call anymore. This page remains for archival purposes.

Checks if the `ffmpeg` binary is installed and if it is not, [downloads it and puts it into your `node_modules` folder](/docs/ffmpeg).

```tsx
ensure.mjs

import {ensureFfmpeg} from '@remotion/renderer';

await ensureFfmpeg();Copy
```

You might not need to call this function. Remotion will automatically download `ffmpeg` if a render is attempted, and no binary was found.

This function is useful if you need FFmpeg to be ready before the first render is started.

Also call [`ensureFfprobe()`](/docs/renderer/ensure-ffprobe) to get both binaries that Remotion requires.

## Options[​](#options "Direct link to Options")

Optionally, you can pass an object and pass the following options:

### `remotionRoot`[​](#remotionroot "Direct link to remotionroot")

*string*

The directory in which your `node_modules` is located.

## Return value[​](#return-value "Direct link to Return value")

A promise which resolves an object with the following properties:

- `wasAlreadyInstalled`: Boolean whether the binary was downloaded because of this function call.
- `result`: A string, either `found-in-path`, `found-in-node-modules` or `installed`.

## Exceptions[​](#exceptions "Direct link to Exceptions")

This function throws if no binary was found, the download fails or no binaries are available for your platform.

## See also[​](#see-also "Direct link to See also")

- CLI equivalent: [`npx remotion install ffmpeg`](/docs/cli/install)
- [`ensureFfprobe()`](/docs/renderer/ensure-ffprobe)
- [Installing FFmpeg](/docs/ffmpeg)
