---
title: "ensureBrowser()v4.0.137"
source: https://www.remotion.dev/docs/renderer/ensure-browser
---

# ensureBrowser()[v4.0.137](https://github.com/remotion-dev/remotion/releases/v4.0.137)

Ensures a browser is locally installed so a Remotion render can be executed.

```tsx
Simple usage

import {ensureBrowser} from '@remotion/renderer';

await ensureBrowser();Copy
```

```tsx
Setting a specific Chrome version and listening to progress

import {ensureBrowser} from '@remotion/renderer';

await ensureBrowser({
  onBrowserDownload: () => {
    console.log('Downloading browser');

    return {
      version: '149.0.7790.0',
      onProgress: ({percent}) => {
        console.log(`${Math.round(percent * 100)}% downloaded`);
      },
    };
  },
});Copy
```

## API[​](#api "Direct link to API")

An object with the following properties, all of which are optional:

### `chromeMode?`[v4.0.248](https://github.com/remotion-dev/remotion/releases/v4.0.248)[​](#chromemode "Direct link to chromemode")

One of `headless-shell,` `chrome-for-testing`. Default `headless-shell`. [Use `chrome-for-testing` to take advantage of GPU drivers on Linux.](https://remotion.dev/docs/miscellaneous/chrome-headless-shell)

### `browserExecutable?`[​](#browserexecutable "Direct link to browserexecutable")

Pass a path to a browser executable that you want to use instead of downloading.  
If the path does not exist, this function will throw.  
Pass the same path to any other API that supports the `browserExecutable` option.

### `logLevel?`[​](#loglevel "Direct link to loglevel")

One of `trace`, `verbose`, `info`, `warn`, `error`.  
 Determines how much info is being logged to the console.  
  
 Default `info`.

### `onBrowserDownload`[​](#onbrowserdownload "Direct link to onbrowserdownload")

Specify a specific version of Chrome that should be used and hook into the download progress.  
See the example below for the function signature.

```tsx
init.ts

import {ensureBrowser, OnBrowserDownload, DownloadBrowserProgressFn} from '@remotion/renderer';

const onProgress: DownloadBrowserProgressFn = ({percent, downloadedBytes, totalSizeInBytes}) => {
  console.log(`${Math.round(percent * 100)}% downloaded`);
};

const onBrowserDownload: OnBrowserDownload = () => {
  console.log('Downloading browser');

  return {
    // Pass `null` to use Remotion's recommendation.
    version: '149.0.7790.0',
    onProgress,
  };
};

await ensureBrowser({
  onBrowserDownload,
});Copy
```

## Return value[​](#return-value "Direct link to Return value")

A promise with no value.

## Compatibility[​](#compatibility "Direct link to Compatibility")

|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Browsers Servers Environments|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | Chrome  Firefox  Safari  Node.js  Bun  Serverless Functions  [Client-side rendering](/docs/client-side-rendering)  [Server-side rendering](/docs/ssr)  [Player](/docs/player)  [Studio](/docs/studio) |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/renderer/src/ensure-browser.ts)
- [Chrome Headless Shell](/docs/miscellaneous/chrome-headless-shell)
- [Server-Side rendering](/docs/ssr)
