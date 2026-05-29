---
title: "downloadWhisperModel()v4.0.115"
source: https://www.remotion.dev/docs/install-whisper-cpp/download-whisper-model
---

# downloadWhisperModel()[v4.0.115](https://github.com/remotion-dev/remotion/releases/v4.0.115)

Downloads a Whisper.cpp model to a folder.  
You should first install Whisper.cpp, for example through [`installWhisperCpp()`](/docs/install-whisper-cpp/install-whisper-cpp).

```tsx
install-whisper.mjs

import path from 'path';
import {downloadWhisperModel} from '@remotion/install-whisper-cpp';

const {alreadyExisted} = await downloadWhisperModel({
  model: 'medium.en',
  folder: path.join(process.cwd(), 'whisper.cpp'),
});Copy
```

## Options[​](#options "Direct link to Options")

### `folder`[​](#folder "Direct link to folder")

The folder to download the model to. The model will be downloaded into this folder with the filename `ggml-${model}.bin`.

### `model`[​](#model "Direct link to model")

The model to download. Possible values: `tiny`, `tiny.en`, `base`, `base.en`, `small`, `small.en`, `medium`, `medium.en`, `large-v1`, `large-v2`, `large-v3`, `large-v3-turbo`.

### `onProgress?`[​](#onprogress "Direct link to onprogress")

Act upon download progress. This is the function signature:

```tsx
import type {OnProgress} from '@remotion/install-whisper-cpp';

const onProgress: OnProgress = (downloadedBytes: number, totalBytes: number) => {
  const progress = downloadedBytes / totalBytes;
};Copy
```

### `printOutput?`[​](#printoutput "Direct link to printoutput")

Print human-readable progress to the console. Default: `true`.

### `signal?`[v4.0.156](https://github.com/remotion-dev/remotion/releases/v4.0.156)[​](#signal "Direct link to signal")

A signal from an [`AbortController`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) to cancel the download process.

## Return Value[​](#return-value "Direct link to Return Value")

Returns an object with the following property:

### `alreadyExisted`[​](#alreadyexisted "Direct link to alreadyexisted")

Indicates whether a file at the output path already existed. If it did, the function did not do anything and this property is set to `true`.

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/install-whisper-cpp/src/download-whisper-model.ts)
- [`@remotion/install-whisper-cpp`](/docs/install-whisper-cpp)
- [`installWhisperCpp()`](/docs/install-whisper-cpp/install-whisper-cpp)
