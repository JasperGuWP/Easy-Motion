---
title: "openBrowser()"
source: https://www.remotion.dev/docs/renderer/open-browser
---

# openBrowser()

*Available since v3.0 - Part of the `@remotion/renderer` package.*

Opens a Chrome or Chromium browser instance. By reusing an instance across [`renderFrames()`](/docs/renderer/render-frames), [`renderStill()`](/docs/renderer/render-still), [`renderMedia()`](/docs/renderer/render-media) and [`getCompositions()`](/docs/renderer/get-compositions) calls, you can save time by not opening and closing browsers for each call.

```tsx
const openBrowser: (
  browser: Browser,
  options: {
    shouldDumpIo?: boolean;
    browserExecutable?: string | null;
    chromiumOptions?: ChromiumOptions;
  },
) => Promise<puppeteer.Browser>;Copy
```

## Arguments[​](#arguments "Direct link to Arguments")

### `browser`[​](#browser "Direct link to browser")

Currently the only valid option is `"chrome"`. This field is reserved for future compatibility with other browsers.

### `options?`[​](#options "Direct link to options")

An object containing one or more of the following options:

#### ~~`shouldDumpIo?`~~[​](#shoulddumpio "Direct link to shoulddumpio")

Deprecated since v4.0.189, scheduled for removal in v5.0.

If set to `true`, logs and other browser diagnostics are being printed to standard output. This setting is useful for debugging.  
**Will be removed in 5.0:** Use `logLevel` instead.

#### `logLevel?`[v4.0.189](https://github.com/remotion-dev/remotion/releases/v4.0.189)[​](#loglevel "Direct link to loglevel")

One of `trace`, `verbose`, `info`, `warn`, `error`.  
 Determines how much info is being logged to the console.  
  
 Default `info`.

#### `browserExecutable?`[​](#browserexecutable "Direct link to browserexecutable")

A string defining the absolute path on disk of the browser executable that should be used. By default Remotion will try to detect it automatically and download one if none is available. If `puppeteerInstance` is defined, it will take precedence over `browserExecutable`.

#### `chromiumOptions?`[​](#chromiumoptions "Direct link to chromiumoptions")

Allows you to set certain Chromium / Google Chrome flags. See: [Chromium flags](/docs/chromium-flags).

note

Chromium flags need to be set at browser launch. If you pass an instance to SSR APIs like [`renderMedia()`](/docs/renderer/render-media), the `chromiumOptions` option of that API will not apply, but rather the flags that have been passed to `openBrowser()`.

#### `forceDeviceScaleFactor?`[​](#forcedevicescalefactor "Direct link to forcedevicescalefactor")

Set a [scale](/docs/scaling). If you plan to use scaling, you already need to set it when opening the browser.

#### `onBrowserDownload?`[v4.0.137](https://github.com/remotion-dev/remotion/releases/v4.0.137)[​](#onbrowserdownload "Direct link to onbrowserdownload")

Gets called when no compatible local browser is detected on the system and this API needs to download a browser. Return a callback to observe progress. [See here for how to use this option.](/docs/renderer/ensure-browser#onbrowserdownload)

### `chromeMode?`[v4.0.248](https://github.com/remotion-dev/remotion/releases/v4.0.248)[​](#chromemode "Direct link to chromemode")

One of `headless-shell,` `chrome-for-testing`. Default `headless-shell`. [Use `chrome-for-testing` to take advantage of GPU drivers on Linux.](https://remotion.dev/docs/miscellaneous/chrome-headless-shell)

## Closing the browser[​](#closing-the-browser "Direct link to Closing the browser")

Use the `close()` method to cleanup a browser you are not using anymore:

```tsx
const browser = await openBrowser('chrome');
browser.close({silent: true});Copy
```

If already closed or an operation is interrupted, an error is thrown.  
Setting the `silent` option to `true` will close the browser without generating an error.

## Compatibility[​](#compatibility "Direct link to Compatibility")

|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Browsers Servers Environments|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | Chrome  Firefox  Safari  Node.js  Bun  Serverless Functions  [Client-side rendering](/docs/client-side-rendering)  [Server-side rendering](/docs/ssr)  [Player](/docs/player)  [Studio](/docs/studio) |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/renderer/src/open-browser.ts)
- [Server-Side rendering](/docs/ssr)
