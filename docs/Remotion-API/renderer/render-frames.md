---
title: "renderFrames()"
source: https://www.remotion.dev/docs/renderer/render-frames
---

# renderFrames()

*Part of the `@remotion/renderer` package.*

Renders a series of images using Puppeteer and computes information for mixing audio.

If you want to render only a still image, use [renderStill()](/docs/renderer/render-still).

info

In Remotion 3.0, we added the [`renderMedia()`](/docs/renderer/render-media) API which combines `renderFrames()` and `stitchFramesToVideo()` into one simplified step and performs the render faster. Prefer `renderMedia()` if you can.

## Arguments[​](#arguments "Direct link to Arguments")

Takes an object with the following keys:

### `composition`[​](#composition "Direct link to composition")

*VideoConfig*

An object describing a composition using `id`, `width`, `height`, `fps` and `durationInFrames`, `defaultProps` and `props`.  
Call [`selectComposition()`](/docs/renderer/select-composition) or [`getCompositions()`](/docs/renderer/get-compositions) to get an array of possible configs.

### `onStart`[​](#onstart "Direct link to onstart")

Callback function that gets called once the renderer has prepared to start rendering and has calculated the amount of frames that are going to be rendered:

```tsx
import {OnStartData} from '@remotion/renderer';

const onStart = ({
  frameCount,
  parallelEncoding, // available from v4.0.52
  resolvedConcurrency, // available from v4.0.180
}: OnStartData) => {
  console.log(`Beginning to render ${frameCount}.`);

  if (parallelEncoding) {
    console.log('Parallel encoding is enabled.');
  }

  console.log(`Using concurrency: ${resolvedConcurrency}`);
};Copy
```

### `onFrameUpdate`[​](#onframeupdate "Direct link to onframeupdate")

A callback function that gets called whenever a frame finished rendering. An argument is passed containing how many frames have been rendered (not the frame number of the rendered frame).

In `v3.0.0`, a second argument was added: `frame`, returning the frame number that was just rendered.

In `v3.2.30`, a third argument was rendered: `timeToRenderInMilliseconds`, describing the time it took to render that frame in milliseconds.

```tsx
const onFrameUpdate = (framesRendered: number, frame: number, timeToRenderInMilliseconds: number) => {
  console.log(`${framesRendered} frames rendered.`);

  // From v3.0.0
  console.log(`${frame} was just rendered.`);

  // From v3.2.30
  console.log(`It took ${timeToRenderInMilliseconds}ms to render that frame.`);
};Copy
```

### `outputDir`[​](#outputdir "Direct link to outputdir")

A `string` specifying the directory (absolute path) to which frames should be saved. Pass `null` to this option and use the `onFrameBuffer` callback instead to get a `Buffer` of the frame rather than to write it to any location.

### `inputProps`[​](#inputprops "Direct link to inputprops")

[Input Props to pass to the selected composition of your video.](/docs/passing-props#passing-input-props-in-the-cli).  
Must be a JSON object.  
From the root component the props can be read using [`getInputProps()`](/docs/get-input-props).  
You may transform input props using [`calculateMetadata()`](/docs/calculate-metadata).

### `serveUrl`[​](#serveurl "Direct link to serveurl")

Either a Webpack bundle or a URL pointing to a bundled Remotion project. Call [`bundle()`](/docs/bundle) to generate a bundle. You can either pass the file location or deploy it as a website and pass the URL.

### `imageFormat?`[​](#imageformat "Direct link to imageformat")

Default: `"jpeg"`. Choose `jpeg` by default because it is the fastest.

- Choose `png` if you want your image sequence to have an alpha channel (for transparency).
- Choose `none` if you only want to render audio.

### `imageSequencePattern?` [v4.0.313](https://github.com/remotion-dev/remotion/releases/v4.0.313)[​](#imagesequencepattern- "Direct link to imagesequencepattern-")

A string pattern for naming the output image sequence files. You can use the following magic replacements:

- `[frame]`: Will be replaced with the zero-padded frame number (e.g. 0001, 0002, ...)
- `[ext]`: Will be replaced with the image format extension (e.g. jpeg, png)

Default: `element-[frame].[ext]`

**Example:**

```tsx
renderFrames({
  ...otherOptions,
  imageSequencePattern: 'frame_[frame]_custom.[ext]',
});
// Produces: frame_0001_custom.jpeg, frame_0002_custom.jpeg, ...Copy
```

### `concurrency?`[​](#concurrency "Direct link to concurrency")

A `number` specifying how many render processes should be started in parallel, a `string` specifying the percentage of the CPU threads to use, or `null` to let Remotion decide based on the CPU of the host machine. Default is half of the CPU threads available.

### `scale?`[v2.6.7](https://github.com/remotion-dev/remotion/releases/v2.6.7)[​](#scale "Direct link to scale")

*number - default: 1*

Scales the output dimensions by a factor. For example, a 1280x720px frame will become a 1920x1080px frame with a scale factor of `1.5`. See [Scaling](https://www.remotion.dev/docs/scaling) for more details.

### `jpegQuality?`[​](#jpegquality "Direct link to jpegquality")

Sets the quality of the generated JPEG images. Must be an integer between 0 and 100. Default is to leave it up to the browser, [current default is 80](https://github.com/chromium/chromium/blob/99314be8152e688bafbbf9a615536bdbb289ea87/headless/lib/browser/protocol/headless_handler.cc#L32).

Only applies if `imageFormat` is `'jpeg'`, otherwise this option is invalid.

### `port?`[​](#port "Direct link to port")

Prefer a specific port that will be used to serve the Remotion project. If not specified, a random port will be used.

### `frameRange?`[​](#framerange "Direct link to framerange")

Specify a single frame (passing a `number`) or a range of frames (passing a tuple `[number, number]`) to be rendered. By passing `null` (default) all frames of a composition get rendered. Pass `[number, null]` to render from a frame to the end of the composition.[v4.0.421](https://github.com/remotion-dev/remotion/releases/v4.0.421)

### `muted?`[v3.2.1](https://github.com/remotion-dev/remotion/releases/v3.2.1)[​](#muted "Direct link to muted")

Disables audio output. This option may only be set in combination with a video codec and should also be passed to [`stitchFramesToVideo()`](/docs/renderer/stitch-frames-to-video).

### `logLevel?`[v4.0.0](https://github.com/remotion-dev/remotion/releases/v4.0.0)[​](#loglevel "Direct link to loglevel")

One of `trace`, `verbose`, `info`, `warn`, `error`.  
 Determines how much info is being logged to the console.  
  
 Default `info`.

### `onArtifact?`[v4.0.176](https://github.com/remotion-dev/remotion/releases/v4.0.176)[​](#onartifact "Direct link to onartifact")

[Handle an artifact](/docs/artifacts#using-rendermedia-renderstill-or-renderframes) that was emitted by the [`<Artifact>`](/docs/artifact) component.

### `puppeteerInstance?`[​](#puppeteerinstance "Direct link to puppeteerinstance")

An already open [`Browser`](/docs/renderer/open-browser) instance. Use [`openBrowser()`](/docs/renderer/open-browser) to create a new instance. Reusing a browser across multiple function calls can speed up the rendering process. You are responsible for opening and closing the browser yourself. If you don't specify this option, a new browser will be opened and closed at the end.

note

Despite the name, not actually compatible with `puppeteer`, only with [`openBrowser()`](/docs/renderer/open-browser).

### `envVariables?`[v2.2.0](https://github.com/remotion-dev/remotion/releases/v2.2.0)[​](#envvariables "Direct link to envvariables")

An object containing key-value pairs of environment variables which will be injected into your Remotion projected and which can be accessed by reading the global `process.env` object.

### `onBrowserLog?`[v3.0.0](https://github.com/remotion-dev/remotion/releases/v3.0.0)[​](#onbrowserlog "Direct link to onbrowserlog")

Gets called when your project calls `console.log` or another method from console. A browser log has three properties:

- `text`: The message being printed
- `stackTrace`: An array of objects containing the following properties:
  - `url`: URL of the resource that logged.
  - `lineNumber`: 0-based line number in the file where the log got called.
  - `columnNumber`: 0-based column number in the file where the log got called.
- `type`: The console method - one of `log`, `debug`, `info`, `error`, `warning`, `dir`, `dirxml`, `table`, `trace`, `clear`, `startGroup`, `startGroupCollapsed`, `endGroup`, `assert`, `profile`, `profileEnd`, `count`, `timeEnd`, `verbose`

```tsx
renderFrames({
  onBrowserLog: (info) => {
    console.log(`${info.type}: ${info.text}`);
    console.log(
      info.stackTrace
        .map((stack) => {
          return `  ${stack.url}:${stack.lineNumber}:${stack.columnNumber}`;
        })
        .join('\n'),
    );
  },
});Copy
```

### `browserExecutable?`[v3.0.11](https://github.com/remotion-dev/remotion/releases/v3.0.11)[​](#browserexecutable "Direct link to browserexecutable")

A string defining the absolute path on disk of the browser executable that should be used. By default Remotion will try to detect it automatically and download one if none is available. If `puppeteerInstance` is defined, it will take precedence over `browserExecutable`.

### `cancelSignal?`[v3.0.15](https://github.com/remotion-dev/remotion/releases/v3.0.15)[​](#cancelsignal "Direct link to cancelsignal")

A token that allows the render to be cancelled. See: [`makeCancelSignal()`](/docs/renderer/make-cancel-signal)

### `onFrameBuffer?`[v3.0.0](https://github.com/remotion-dev/remotion/releases/v3.0.0)[​](#onframebuffer "Direct link to onframebuffer")

If you passed `null` to `outputDir`, this method will be called passing a buffer of the current frame. This is mostly used internally by Remotion to implement [`renderMedia()`](/docs/renderer/render-media) and might have limited usefulness for end users.

### `timeoutInMilliseconds?`[v2.6.3](https://github.com/remotion-dev/remotion/releases/v2.6.3)[​](#timeoutinmilliseconds "Direct link to timeoutinmilliseconds")

A number describing how long one frame may take to resolve all [`delayRender()`](/docs/delay-render) calls before the [render times out and fails](/docs/timeout). Default: `30000`

### `everyNthFrame?`[v3.1.0](https://github.com/remotion-dev/remotion/releases/v3.1.0)[​](#everynthframe "Direct link to everynthframe")

Renders only every nth frame. For example only every second frame, every third frame and so on. Only meant for rendering GIFs. [See here for more details.](/docs/render-as-gif)

### `chromiumOptions?`[v2.6.5](https://github.com/remotion-dev/remotion/releases/v2.6.5)[​](#chromiumoptions "Direct link to chromiumoptions")

Allows you to set certain Chromium / Google Chrome flags. See: [Chromium flags](/docs/chromium-flags).

note

Chromium flags need to be set at browser launch. If you pass an instance using [`puppeteerInstance`](#puppeteerinstance), options passed to `renderFrames()` will not apply, but rather the flags that have been passed to [`openBrowser()`](/docs/renderer/open-browser).

#### `disableWebSecurity?`[​](#disablewebsecurity "Direct link to disablewebsecurity")

*boolean - default `false`*

This will most notably disable CORS among other security features.

#### `enableMultiProcessOnLinux?`[v4.0.42](https://github.com/remotion-dev/remotion/releases/v4.0.42)[​](#enablemultiprocessonlinux "Direct link to enablemultiprocessonlinux")

*boolean - default `true`*

Removes the `--single-process` flag that gets passed to Chromium on Linux by default. This will make the render faster because multiple processes can be used, but may cause issues with some Linux distributions or if window server libraries are missing.  
Default: `false` until v4.0.136, then `true` from v4.0.137 on because newer Chrome versions don't allow rendering with the `--single-process` flag.   
This flag will be removed in Remotion v5.0.

#### `ignoreCertificateErrors?`[​](#ignorecertificateerrors "Direct link to ignorecertificateerrors")

*boolean - default `false`*

Results in invalid SSL certificates, such as self-signed ones, being ignored.

#### `headless?`[​](#headless "Direct link to headless")

Deprecated - will be removed in 5.0.0. With the migration to [Chrome Headless Shell](/docs/miscellaneous/chrome-headless-shell), this option is not functional anymore.  
  
 If disabled, the render will open an actual Chrome window where you can see the render happen. The default is headless mode.

#### `gl?`[​](#gl "Direct link to gl")

*string*

Changelog

- From Remotion v2.6.7 until v3.0.7, the default for Remotion Lambda was `swiftshader`, but from v3.0.8 the default is `swangle` (Swiftshader on Angle) since Chrome 101 added support for it.- From Remotion v2.4.3 until v2.6.6, the default was `angle`, however it turns out to have a small memory leak that could crash long Remotion renders.

Select the OpenGL renderer backend for Chromium.   
Accepted values:

- `"angle"`- `"egl"`- `"swiftshader"`- `"swangle"`- `"vulkan"` (*from Remotion v4.0.41*)- `"angle-egl"` (*from Remotion v4.0.51*)

The default is `null`, letting Chrome decide, except on Lambda where the default is `"swangle"`

#### `userAgent?`[v3.3.83](https://github.com/remotion-dev/remotion/releases/v3.3.83)[​](#useragent "Direct link to useragent")

Lets you set a custom user agent that the headless Chrome browser assumes.

#### `darkMode?`[v4.0.381](https://github.com/remotion-dev/remotion/releases/v4.0.381)[​](#darkmode "Direct link to darkmode")

Whether Chromium should pretend to be in dark mode by emulating the media feature 'prefers-color-scheme: dark'. Default is `false`.

### `offthreadVideoCacheSizeInBytes?`[v4.0.23](https://github.com/remotion-dev/remotion/releases/v4.0.23)[​](#offthreadvideocachesizeinbytes "Direct link to offthreadvideocachesizeinbytes")

From v4.0, Remotion has a cache for [`<OffthreadVideo>`](https://remotion.dev/docs/offthreadvideo) frames. The default is `null`, corresponding to half of the system memory available when the render starts.  
 This option allows to override the size of the cache. The higher it is, the faster the render will be, but the more memory will be used.  
The used value will be printed when running in verbose mode.  
Default: `null`

### `mediaCacheSizeInBytes?`[v4.0.352](https://github.com/remotion-dev/remotion/releases/v4.0.352)[​](#mediacachesizeinbytes "Direct link to mediacachesizeinbytes")

Specify the maximum size of the cache that `<Video>` and `<Audio>` from `@remotion/media` may use combined, in bytes.   
The default is half of the available system memory when the render starts.

### `offthreadVideoThreads?`[v4.0.261](https://github.com/remotion-dev/remotion/releases/v4.0.261)[​](#offthreadvideothreads "Direct link to offthreadvideothreads")

The number of threads that[`<OffthreadVideo>`](https://remotion.dev/docs/offthreadvideo) can start to extract frames. The default is 2. Increase carefully, as too many threads may cause instability.

### `binariesDirectory?`[v4.0.120](https://github.com/remotion-dev/remotion/releases/v4.0.120)[​](#binariesdirectory "Direct link to binariesdirectory")

The directory where the platform-specific binaries and libraries that Remotion needs are located. Those include an `ffmpeg` and `ffprobe` binary, a Rust binary for various tasks, and various shared libraries. If the value is set to `null`, which is the default, then the path of a platform-specific package located at `node_modules/@remotion/compositor-*` is selected.  
This option is useful in environments where Remotion is not officially supported to run like bundled serverless functions or Electron.

#### `onBrowserDownload?`[v4.0.137](https://github.com/remotion-dev/remotion/releases/v4.0.137)[​](#onbrowserdownload "Direct link to onbrowserdownload")

Gets called when no compatible local browser is detected on the system and this API needs to download a browser. Return a callback to observe progress. [See here for how to use this option.](/docs/renderer/ensure-browser#onbrowserdownload)

### `chromeMode?`[v4.0.248](https://github.com/remotion-dev/remotion/releases/v4.0.248)[​](#chromemode "Direct link to chromemode")

One of `headless-shell,` `chrome-for-testing`. Default `headless-shell`. [Use `chrome-for-testing` to take advantage of GPU drivers on Linux.](https://remotion.dev/docs/miscellaneous/chrome-headless-shell)

### ~~`quality?`~~[​](#quality "Direct link to quality")

Renamed to `jpegQuality` in `v4.0.0`.

### ~~`dumpBrowserLogs?`~~[​](#dumpbrowserlogs "Direct link to dumpbrowserlogs")

Deprecated in v4.0 in favor of [`logLevel`](#loglevel).

### ~~`parallelism?`~~[​](#parallelism "Direct link to parallelism")

Renamed to `concurrency` in v3.2.17.
Removed in `v4.0.0`.

### ~~`ffmpegExecutable`~~[​](#ffmpegexecutable "Direct link to ffmpegexecutable")

*removed in v4.0*

An absolute path overriding the `ffmpeg` executable to use.

### ~~`ffprobeExecutable`~~ [v3.0.17](https://github.com/remotion-dev/remotion/releases/v3.0.17)[​](#ffprobeexecutable- "Direct link to ffprobeexecutable-")

*removed in v4.0*

An absolute path overriding the `ffprobe` executable to use.

## Return value[​](#return-value "Direct link to Return value")

A promise resolving to an object containing the following properties:

- `frameCount`: `number` - describing how many frames got rendered.
- `assetsInfo`: `RenderAssetInfo` - information that can be passed to `stitchFramesToVideo()` to mix audio. The shape of this object should be considered as Remotion internals and may change across Remotion versions.

## Compatibility[​](#compatibility "Direct link to Compatibility")

|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Browsers Servers Environments|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | Chrome  Firefox  Safari  Node.js  Bun  Serverless Functions  [Client-side rendering](/docs/client-side-rendering)  [Server-side rendering](/docs/ssr)  [Player](/docs/player)  [Studio](/docs/studio) |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/renderer/src/render-frames.ts)
- [`renderMedia()`](/docs/renderer/render-media)
- [`bundle()`](/docs/bundle)
- [Server-Side rendering](/docs/ssr)
- [`getCompositions()`](/docs/renderer/get-compositions)
- [`stitchFramesToVideo()`](/docs/renderer/stitch-frames-to-video)
- [`renderStill()`](/docs/renderer/render-still)
