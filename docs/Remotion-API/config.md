---
title: "Configuration file"
source: https://www.remotion.dev/docs/config
---

# Configuration file

To configure Remotion, create a `remotion.config.ts` file in the root of your Remotion project.

These options will apply to CLI commands such as `npx remotion studio` and `npx remotion render`.

warning

The configuration file has no effect when using [SSR](/docs/renderer) APIs.

You can control several behaviors of Remotion here.

```tsx
remotion.config.ts

import {Config} from '@remotion/cli/config';

Config.setConcurrency(8);
Config.setPixelFormat('yuv444p');
Config.setCodec('h265');Copy
```

## `overrideWebpackConfig()`[v1.1.0](https://github.com/remotion-dev/remotion/releases/v1.1.0)[​](#overridewebpackconfig "Direct link to overridewebpackconfig")

Allows you to insert your custom Webpack config. [See the page about custom Webpack configs](/docs/webpack) for more information.

```tsx
remotion.config.ts

Config.overrideWebpackConfig((currentConfiguration) => {
  // Return a new Webpack configuration
  return {
    ...currentConfiguration,
    // new configuration
  };
});Copy
```

## `setCachingEnabled()`[v2.0.0](https://github.com/remotion-dev/remotion/releases/v2.0.0)[​](#setcachingenabled "Direct link to setcachingenabled")

Enable or disable Webpack caching. This flag is enabled by default, use `--bundle-cache=false` to disable caching.

```tsx
remotion.config.ts

Config.setCachingEnabled(false);Copy
```

The [command line flag](/docs/cli/render#--bundle-cache) `--bundle-cache` will take precedence over this option.

## `setStudioPort()`[v4.0.61](https://github.com/remotion-dev/remotion/releases/v4.0.61)[​](#setstudioport "Direct link to setstudioport")

Set the HTTP port for the Studio.

```tsx
remotion.config.ts

Config.setStudioPort(3003);Copy
```

The [command line flag](/docs/cli/studio#--port) `--port` will take precedence over this option.

## `setRendererPort()`[v4.0.61](https://github.com/remotion-dev/remotion/releases/v4.0.61)[​](#setrendererport "Direct link to setrendererport")

Set the port to be used to host the Webpack bundle.

```tsx
remotion.config.ts

Config.setRendererPort(3004);Copy
```

The [command line flag](/docs/cli/render#--port) `--port` will take precedence over this option.

## `setPublicDir()`[v3.2.13](https://github.com/remotion-dev/remotion/releases/v3.2.13)[​](#setpublicdir "Direct link to setpublicdir")

Define the location of the [`public/ directory`](/docs/terminology/public-dir). If not defined, Remotion will assume the location is the `public` folder in your Remotion root.

```tsx
remotion.config.ts

Config.setPublicDir('./custom-public-dir');Copy
```

The [command line flag](/docs/cli/render#--public-dir) `--public-dir` will take precedence over this option.

## `setBundleOutDir()`[v4.0.426](https://github.com/remotion-dev/remotion/releases/v4.0.426)[​](#setbundleoutdir "Direct link to setbundleoutdir")

Define the location of the resulting bundle. By default it is a folder called `build`, adjacent to the [Remotion Root](/docs/terminology/remotion-root).

```tsx
remotion.config.ts

Config.setBundleOutDir('./custom-build-dir');Copy
```

The [command line flag](/docs/cli/bundle#--out-dir) `--out-dir` will take precedence over this option.

## `setBenchmarkRuns()`[​](#setbenchmarkruns "Direct link to setbenchmarkruns")

Specify how many times the video should be rendered during a benchmark. Default `3`.

```tsx
remotion.config.ts

Config.setBenchmarkRuns(5);Copy
```

The [command line flag](/docs/cli/benchmark#--runs) `--runs` will take precedence over this option.

## `setBenchmarkConcurrencies()`[v4.0.430](https://github.com/remotion-dev/remotion/releases/v4.0.430)[​](#setbenchmarkconcurrencies "Direct link to setbenchmarkconcurrencies")

Specify which concurrency values should be used while benchmarking. Multiple values can be passed separated by comma. Learn more about [concurrency](https://remotion.dev/docs/terminology/concurrency).

```tsx
remotion.config.ts

Config.setBenchmarkConcurrencies('1,4,8');Copy
```

The [command line flag](/docs/cli/benchmark#--concurrencies) `--concurrencies` will take precedence over this option.

## `setEntryPoint()`[v3.2.40](https://github.com/remotion-dev/remotion/releases/v3.2.40)[​](#setentrypoint "Direct link to setentrypoint")

Sets the Remotion [entry point](/docs/terminology/entry-point), you don't have to specify it for CLI commands.

```tsx
remotion.config.ts

Config.setEntryPoint('./src/index.ts');Copy
```

If you pass an entry point as a CLI argument, it will take precedence.

## `setLogLevel()`[v2.0.1](https://github.com/remotion-dev/remotion/releases/v2.0.1)[​](#setloglevel "Direct link to setloglevel")

*previously named "setLevel"*

Increase or decrease the amount of log messages in the CLI.
Acceptable values:

- `error`: Silent except error messages.
- `warn`: Only showing errors and warnings.
- `info` (*default*): Default output - besides errors and warnings, prints progress and output location.
- `verbose`: All of the above, plus browser logs and other debug info.

```tsx
remotion.config.ts

Config.setLogLevel('verbose');Copy
```

The [command line flag](/docs/cli/render#--log) `--log` will take precedence over this option.

## `setMaxTimelineTracks()`[v2.1.10](https://github.com/remotion-dev/remotion/releases/v2.1.10)[​](#setmaxtimelinetracks "Direct link to setmaxtimelinetracks")

Set how many tracks are being displayed in the timeline in the Studio at most. This does not affect your video, just the amount of tracks shown when previewing. Default `15`.

```tsx
remotion.config.ts

Config.setMaxTimelineTracks(20);Copy
```

## `setKeyboardShortcutsEnabled()`[v3.2.11](https://github.com/remotion-dev/remotion/releases/v3.2.11)[​](#setkeyboardshortcutsenabled "Direct link to setkeyboardshortcutsenabled")

Enable or disable keyboard shortcuts in the Remotion Studio.

```tsx
remotion.config.ts

Config.setKeyboardShortcutsEnabled(false);Copy
```

The [command line flag](/docs/cli/studio#--disable-keyboard-shortcuts) `--disable-keyboard-shortcuts` will take precedence over this option.

## `setExperimentalClientSideRenderingEnabled()`[v4.0.387](https://github.com/remotion-dev/remotion/releases/v4.0.387)[​](#setexperimentalclientsiderenderingenabled "Direct link to setexperimentalclientsiderenderingenabled")

Enable WIP client-side rendering in the Remotion Studio. See https://www.remotion.dev/docs/client-side-rendering/ for notes.

```tsx
remotion.config.ts

Config.setExperimentalClientSideRenderingEnabled(true);Copy
```

The [command line flag](/docs/cli/studio#--enable-experimental-client-side-rendering) `--enable-experimental-client-side-rendering` will take precedence over this option.

## `setAllowHtmlInCanvasEnabled()`[v4.0.447](https://github.com/remotion-dev/remotion/releases/v4.0.447)[​](#setallowhtmlincanvasenabled "Direct link to setallowhtmlincanvasenabled")

When client-side rendering is enabled in the Studio, allow the experimental Chromium HTML-in-canvas API to be used for capturing frames. See [HTML-in-canvas docs](/docs/client-side-rendering/html-in-canvas).

```tsx
remotion.config.ts

Config.setAllowHtmlInCanvasEnabled(true);Copy
```

The [command line flag](/docs/cli/studio#--allow-html-in-canvas) `--allow-html-in-canvas` will take precedence over this option.

## `setExperimentalRspackEnabled()`[v4.0.426](https://github.com/remotion-dev/remotion/releases/v4.0.426)[​](#setexperimentalrspackenabled "Direct link to setexperimentalrspackenabled")

Use [Rspack](https://rspack.dev) instead of Webpack as the bundler for the Studio. Default `false`.

```tsx
remotion.config.ts

Config.setExperimentalRspackEnabled(true);Copy
```

The [command line flag](/docs/cli/studio#--experimental-rspack) `--experimental-rspack` will take precedence over this option.

## `setWebpackPollingInMilliseconds()`[v3.3.11](https://github.com/remotion-dev/remotion/releases/v3.3.11)[​](#setwebpackpollinginmilliseconds "Direct link to setwebpackpollinginmilliseconds")

Enables Webpack polling instead of the file system event listeners for hot reloading. This is useful if you are inside a virtual machine or have a remote file system. Pass a value in milliseconds.

```tsx
remotion.config.ts

Config.setWebpackPollingInMilliseconds(1000);Copy
```

The [command line flag](/docs/cli/studio#--webpack-poll) `--webpack-poll` will take precedence over this option.

## `setNumberOfSharedAudioTags()`[v3.3.2](https://github.com/remotion-dev/remotion/releases/v3.3.2)[​](#setnumberofsharedaudiotags "Direct link to setnumberofsharedaudiotags")

Set number of shared audio tags. See [Using the numberOfSharedAudioTags prop](https://www.remotion.dev/docs/player/autoplay#using-the-numberofsharedaudiotags-prop) for more information.

```tsx
remotion.config.ts

Config.setNumberOfSharedAudioTags(5);Copy
```

The [command line flag](/docs/cli/studio#--number-of-shared-audio-tags) `--number-of-shared-audio-tags` will take precedence over this option.

## `setShouldOpenBrowser()`[v3.3.19](https://github.com/remotion-dev/remotion/releases/v3.3.19)[​](#setshouldopenbrowser "Direct link to setshouldopenbrowser")

If specified, Remotion will not open a browser window when starting the Studio.

```tsx
remotion.config.ts

Config.setShouldOpenBrowser(false);Copy
```

The [command line flag](/docs/cli/studio#--no-open) `--no-open` will take precedence over this option.

## `setBrowserExecutable()`[v1.5.0](https://github.com/remotion-dev/remotion/releases/v1.5.0)[​](#setbrowserexecutable "Direct link to setbrowserexecutable")

Set a custom Chrome or Chromium executable path. By default Remotion will try to find an existing version of Chrome on your system and if not found, it will download one. This flag is useful if you don't have Chrome installed in a standard location and you want to prevent downloading an additional browser or need support for the H264 codec.

```tsx
remotion.config.ts

Config.setBrowserExecutable('/usr/bin/google-chrome-stable');Copy
```

The [command line flag](/docs/cli/render#--browser-executable) `--browser-executable` will take precedence over this option.

## `setDelayRenderTimeoutInMilliseconds()`[v2.6.3](https://github.com/remotion-dev/remotion/releases/v2.6.3)[​](#setdelayrendertimeoutinmilliseconds "Direct link to setdelayrendertimeoutinmilliseconds")

*previously named "setTimeoutInMilliseconds"*

Define how long a single frame may take to resolve all [`delayRender()`](/docs/delay-render) calls [before it times out](/docs/timeout). Default: `30000`

```tsx
remotion.config.ts

Config.setDelayRenderTimeoutInMilliseconds(60000);Copy
```

The [command line flag](/docs/cli/render#--timeout) `--timeout` will take precedence over this option.

## `setChromiumDisableWebSecurity()`[v2.6.5](https://github.com/remotion-dev/remotion/releases/v2.6.5)[​](#setchromiumdisablewebsecurity "Direct link to setchromiumdisablewebsecurity")

This will most notably disable CORS in Chrome among other security features.

```tsx
remotion.config.ts

Config.setChromiumDisableWebSecurity(true);Copy
```

The [command line flag](/docs/cli/render#--disable-web-security) `--disable-web-security` will take precedence over this option.

## `setChromiumDarkMode()`[v4.0.381](https://github.com/remotion-dev/remotion/releases/v4.0.381)[​](#setchromiumdarkmode "Direct link to setchromiumdarkmode")

Whether Chromium should pretend to be in dark mode by emulating the media feature 'prefers-color-scheme: dark'. Default is `false`.

```tsx
remotion.config.ts

Config.setChromiumDarkMode(true);Copy
```

## `setChromiumIgnoreCertificateErrors()`[v2.6.5](https://github.com/remotion-dev/remotion/releases/v2.6.5)[​](#setchromiumignorecertificateerrors "Direct link to setchromiumignorecertificateerrors")

Results in invalid SSL certificates in Chrome, such as self-signed ones, being ignored.

```tsx
remotion.config.ts

Config.setChromiumIgnoreCertificateErrors(true);Copy
```

The [command line flag](/docs/cli/render#--ignore-certificate-errors) `--ignore-certificate-errors` will take precedence over this option.

## `setChromiumHeadlessMode()`[v2.6.5](https://github.com/remotion-dev/remotion/releases/v2.6.5)[​](#setchromiumheadlessmode "Direct link to setchromiumheadlessmode")

Deprecated - will be removed in 5.0.0. With the migration to [Chrome Headless Shell](/docs/miscellaneous/chrome-headless-shell), this option is not functional anymore.  
  
 If disabled, the render will open an actual Chrome window where you can see the render happen. The default is headless mode.

```tsx
remotion.config.ts

Config.setChromiumHeadlessMode(false);Copy
```

## `setChromiumMultiProcessOnLinux()`[v4.0.42](https://github.com/remotion-dev/remotion/releases/v4.0.42)[​](#setchromiummultiprocessonlinux "Direct link to setchromiummultiprocessonlinux")

Removes the `--single-process` flag that gets passed to Chromium on Linux by default. This will make the render faster because multiple processes can be used, but may cause issues with some Linux distributions or if window server libraries are missing.  
Default: `false` until v4.0.136, then `true` from v4.0.137 on because newer Chrome versions don't allow rendering with the `--single-process` flag.   
This flag will be removed in Remotion v5.0.

```tsx
remotion.config.ts

Config.setChromiumMultiProcessOnLinux(true);Copy
```

## `setChromeMode()`[v4.0.248](https://github.com/remotion-dev/remotion/releases/v4.0.248)[​](#setchromemode "Direct link to setchromemode")

One of `headless-shell,` `chrome-for-testing`. Default `headless-shell`. [Use `chrome-for-testing` to take advantage of GPU drivers on Linux.](https://remotion.dev/docs/miscellaneous/chrome-headless-shell)

```tsx
remotion.config.ts

Config.setChromeMode('chrome-for-testing');Copy
```

The [command line flag](/docs/cli/render#--chrome-mode) `--chrome-mode` will take precedence over this option.

## `setChromiumOpenGlRenderer()`[​](#setchromiumopenglrenderer "Direct link to setchromiumopenglrenderer")

Changelog

- From Remotion v2.6.7 until v3.0.7, the default for Remotion Lambda was `swiftshader`, but from v3.0.8 the default is `swangle` (Swiftshader on Angle) since Chrome 101 added support for it.- From Remotion v2.4.3 until v2.6.6, the default was `angle`, however it turns out to have a small memory leak that could crash long Remotion renders.

Select the OpenGL renderer backend for Chromium.   
Accepted values:

- `"angle"`- `"egl"`- `"swiftshader"`- `"swangle"`- `"vulkan"` (*from Remotion v4.0.41*)- `"angle-egl"` (*from Remotion v4.0.51*)

The default is `null`, letting Chrome decide, except on Lambda where the default is `"swangle"`

```tsx
remotion.config.ts

Config.setChromiumOpenGlRenderer('angle');Copy
```

The [command line flag](/docs/cli/render#--gl) `--gl` will take precedence over this option.

## `setConcurrency()`[​](#setconcurrency "Direct link to setconcurrency")

How many CPU threads to use. Minimum 1. The maximum is the amount of threads you have (In Node.JS `os.cpus().length`). You can also provide a percentage value (e.g. `50%`).

```tsx
remotion.config.ts

Config.setConcurrency(8);Copy
```

The [command line flag](/docs/cli/render#--concurrency) `--concurrency` will take precedence over this option.

tip

Try to set your concurrency to `os.cpus().length` to all the threads available on your CPU for faster rendering. The drawback is that other parts of your system might slow down.

## `setVideoImageFormat()`[v4.0.0](https://github.com/remotion-dev/remotion/releases/v4.0.0)[​](#setvideoimageformat "Direct link to setvideoimageformat")

Determines which in which image format to render the frames. Either:

- `jpeg` - the fastest option (default)
- `png` - slower, but supports transparency
- `none` - don't render images, just calculate audio information

```tsx
remotion.config.ts

Config.setVideoImageFormat('png');Copy
```

## `setStillImageFormat()`[v4.0.0](https://github.com/remotion-dev/remotion/releases/v4.0.0)[​](#setstillimageformat "Direct link to setstillimageformat")

Determines which in which image format to render the frames. Either:

- `png` (default)
- `jpeg`
- `pdf`
- `webp`

```tsx
remotion.config.ts

Config.setStillImageFormat('pdf');Copy
```

## `setScale()`[v2.6.7](https://github.com/remotion-dev/remotion/releases/v2.6.7)[​](#setscale "Direct link to setscale")

[Scales the output frames by the factor you pass in.](/docs/scaling) For example, a 1280x720px frame will become a 1920x1080px frame with a scale factor of `1.5`. Vector elements like fonts and HTML markups will be rendered with extra details. Default: `1`.

```tsx
remotion.config.ts

Config.setScale(2);Copy
```

The [command line flag](/docs/cli/render#--scale) `--scale` will take precedence over this option.

## `setMuted()`[v3.2.1](https://github.com/remotion-dev/remotion/releases/v3.2.1)[​](#setmuted "Direct link to setmuted")

Disables audio output. Default `false`.

```tsx
remotion.config.ts

Config.setMuted(true);Copy
```

The [command line flag](/docs/cli/render#--muted) `--muted` will take precedence over this option.

## `setDisallowParallelEncoding()`[v4.0.315](https://github.com/remotion-dev/remotion/releases/v4.0.315)[​](#setdisallowparallelencoding "Direct link to setdisallowparallelencoding")

Disallows the renderer from doing rendering frames and encoding at the same time. This makes the rendering process more memory-efficient, but possibly slower. Default `false`.

```tsx
remotion.config.ts

Config.setDisallowParallelEncoding(true);Copy
```

The [command line flag](/docs/cli/render#--disallow-parallel-encoding) `--disallow-parallel-encoding` will take precedence over this option.

## `setEnforceAudioTrack()`[v3.2.1](https://github.com/remotion-dev/remotion/releases/v3.2.1)[​](#setenforceaudiotrack "Direct link to setenforceaudiotrack")

Render a silent audio track if there would be none otherwise. Default `false`.

```tsx
remotion.config.ts

Config.setEnforceAudioTrack(true);Copy
```

The [command line flag](/docs/cli/render#--enforce-audio-track) `--enforce-audio-track` will take precedence over this option.

## `setSampleRate()`[v4.0.448](https://github.com/remotion-dev/remotion/releases/v4.0.448)[​](#setsamplerate "Direct link to setsamplerate")

Controls the sample rate of the output audio. The default is `48000` Hz. Match this to your source audio to avoid resampling artifacts.

```tsx
remotion.config.ts

Config.setSampleRate(44100);Copy
```

The [command line flag](/docs/cli/render#--sample-rate) `--sample-rate` will take precedence over this option.

## `setForSeamlessAacConcatenation()`[v4.0.123](https://github.com/remotion-dev/remotion/releases/v4.0.123)[​](#setforseamlessaacconcatenation "Direct link to setforseamlessaacconcatenation")

If enabled, the audio is trimmed to the nearest AAC frame, which is required for seamless concatenation of AAC files. This is a requirement if you later want to combine multiple video snippets seamlessly.  
  
 This option is used internally. There is currently no documentation yet for to concatenate the audio chunks.

```tsx
remotion.config.ts

Config.setForSeamlessAacConcatenation(true);Copy
```

The [command line flag](/docs/cli/render#--for-seamless-aac-concatenation) `--for-seamless-aac-concatenation` will take precedence over this option.

## `setFrameRange()`[v2.0.0](https://github.com/remotion-dev/remotion/releases/v2.0.0)[​](#setframerange "Direct link to setframerange")

Render a subset of a video. Pass a single number to render a still, or a range (e.g. `0-9`) to render a subset of frames. Pass `100-` to render from frame 100 to the end.

```tsx
remotion.config.ts

Config.setFrameRange(90); // To render only the 91st frameCopy
```

or

```tsx
remotion.config.ts

Config.setFrameRange([0, 20]); // Render a video only containing the first 21 framesCopy
```

or

```tsx
remotion.config.ts

Config.setFrameRange([100, null]); // Render from frame 100 to the end of the compositionCopy
```

Pass `[number, null]` to render from a frame to the end of the composition.[v4.0.421](https://github.com/remotion-dev/remotion/releases/v4.0.421)

The [command line flag](/docs/cli/render#--frames) `--frames` will take precedence over this option.

## `setJpegQuality()`[​](#setjpegquality "Direct link to setjpegquality")

The JPEG quality of each frame. Must be a number between 0 and 100. Will not work if you render PNG frames. [Default: 80](https://github.com/chromium/chromium/blob/99314be8152e688bafbbf9a615536bdbb289ea87/headless/lib/browser/protocol/headless_handler.cc#L32).

```tsx
remotion.config.ts

Config.setJpegQuality(90);Copy
```

The [command line flag](/docs/cli/render#--jpeg-quality) `--jpeg-quality` will take precedence over this option.

## `setDotEnvLocation()`[​](#setdotenvlocation "Direct link to setdotenvlocation")

Specify a location for a dotenv file. Default `.env`.

```tsx
remotion.config.ts

Config.setDotEnvLocation('.my-env');Copy
```

The [command line flag](/docs/cli/render#--env-file) `--env-file` will take precedence over this option.

## `setEveryNthFrame()`[​](#seteverynthframe "Direct link to seteverynthframe")

This option may only be set when rendering GIFs. It determines how many frames are rendered, while the other ones get skipped in order to lower the FPS of the GIF. For example, if the `fps` is 30, and `everyNthFrame` is 2, the FPS of the GIF is `15`.

```tsx
remotion.config.ts

Config.setEveryNthFrame(2);Copy
```

The [command line flag](/docs/cli/render#--every-nth-frame) `--every-nth-frame` will take precedence over this option.

## `setNumberOfGifLoops()`[​](#setnumberofgifloops "Direct link to setnumberofgifloops")

Allows you to set the number of loops as follows:

- `null` (or omitting in the CLI) plays the GIF indefinitely.- `0` disables looping- `1` loops the GIF once (plays twice in total)- `2` loops the GIF twice (plays three times in total) and so on.

```tsx
remotion.config.ts

Config.setNumberOfGifLoops(2);Copy
```

The [command line flag](/docs/cli/render#--number-of-gif-loops) `--number-of-gif-loops` will take precedence over this option.

## `setOutputLocation()`[v3.1.6](https://github.com/remotion-dev/remotion/releases/v3.1.6)[​](#setoutputlocation "Direct link to setoutputlocation")

Set the output location of the video or still, relative to the current working directory. The default is `out/{composition}.{container}`. For example, `out/HelloWorld.mp4`.

```tsx
remotion.config.ts

Config.setOutputLocation('out/video.mp4');Copy
```

If you pass another argument to the render command, it will take precedence: `npx remotion render src/index.ts HelloWorld out/video.mp4`.

## `setOverwriteOutput()`[​](#setoverwriteoutput "Direct link to setoverwriteoutput")

Set this to `false` to prevent overwriting Remotion outputs when they already exists.

```tsx
remotion.config.ts

Config.setOverwriteOutput(false);Copy
```

info

In version 1.x, the default behavior was inverse - Remotion would not override by default.

## `setPixelFormat()`[​](#setpixelformat "Direct link to setpixelformat")

Sets the pixel format in FFmpeg. See [the FFmpeg docs for an explanation](https://trac.ffmpeg.org/wiki/Chroma%20Subsampling). Acceptable values: "yuv420p", "yuva420p", "yuv422p", "yuv444p", "yuv420p10le", "yuv422p10le", "yuv444p10le", "yuva444p10le".

```tsx
remotion.config.ts

Config.setPixelFormat('yuv420p');Copy
```

The [command line flag](/docs/cli/render#--pixel-format) `--pixel-format` will take precedence over this option.

## `setCodec()`[v1.4.0](https://github.com/remotion-dev/remotion/releases/v1.4.0)[​](#setcodec "Direct link to setcodec")

Choose one of the supported codecs: `h264` *(default)*, `h265`, `vp8`, `vp9`, `av1`.

- `h264` is the classic MP4 file as you know it.
- `h265` is the successor of H264, with smaller file sizes. Also known as HEVC. Poor browser compatibility.
- `vp8` is the codec for WebM.
- `vp9` is the next-generation codec for WebM. Lower file size, longer compression time.
- `av1` is the successor of VP9 and achieves lower file size, with longer compression time.
- `prores` is a common codec if you want to import the output into another video editing program *(available from v2.1.6)*
- `mp3` will export audio only as an MP3 file *(available from v2.0)*
- `wav` will export audio only as an WAV file *(available from v2.0)*
- `aac` will export audio only as an AAC file *(available from v2.0)*

`AV1` is not available on Remotion Lambda or Linux ARM64 GNU. See the [Encoding guide](/docs/encoding) for details.

```tsx
remotion.config.ts

Config.setCodec('h265');Copy
```

The [command line flag](/docs/cli/render#--codec) `--codec` will take precedence over this option.

**See also**: [Encoding guide](/docs/encoding)

## `setAudioCodec()`[​](#setaudiocodec "Direct link to setaudiocodec")

```tsx
remotion.config.ts

Config.setAudioCodec('pcm-16');Copy
```

Choose the encoding of your audio.

- The default is dependent on the chosen `codec`.
- Choose `pcm-16` if you need uncompressed audio.
- Not all video containers support all audio codecs.
- This option takes precedence if the `codec` option also specifies an audio codec.

The [command line flag](/docs/cli/render#--audio-codec) `--audio-codec` will take precedence over this option.

Refer to the [Encoding guide](/docs/encoding) to see defaults and supported combinations.

## `setProResProfile()`[v2.1.6](https://github.com/remotion-dev/remotion/releases/v2.1.6)[​](#setproresprofile "Direct link to setproresprofile")

Set the ProRes profile. This option is only valid if the codec has been set to `prores`. Possible values: "4444-xq", "4444", "hq", "standard", "light", "proxy". Default: `"hq"`. See [here](https://video.stackexchange.com/a/14715) for an explanation of possible values.

```tsx
remotion.config.ts

Config.setProResProfile('4444');Copy
```

The [command line flag](/docs/cli/render#--prores-profile) `--prores-profile` will take precedence over this option.

## `setX264Preset()`[v4.2.2](https://github.com/remotion-dev/remotion/releases/v4.2.2)[​](#setx264preset "Direct link to setx264preset")

Set the Preset profile. This option is only valid if the codec has been set to `h264`.
Possible values: `superfast`, `veryfast`, `faster`, `fast`, `medium`, `slow`, `slower`, `veryslow`, `placebo`,
Default: `medium`

```tsx
remotion.config.ts

Config.setX264Preset('fast');Copy
```

The [command line flag](/docs/cli/render#--x264-preset) `--x264-preset` will take precedence over this option.

**See also**: [Encoding guide](/docs/encoding), [Transparent videos](/docs/transparent-videos)

## `setGopSize()`[v4.0.466](https://github.com/remotion-dev/remotion/releases/v4.0.466)[​](#setgopsize "Direct link to setgopsize")

Set the maximum number of frames between two keyframes. This maps to FFmpeg's `-g` option. Default: Let the encoder decide.

```tsx
remotion.config.ts

Config.setGopSize(239);Copy
```

The [command line flag](/docs/cli/render#--gop) `--gop` will take precedence over this option.

## `setImageSequence()`[v1.4.0](https://github.com/remotion-dev/remotion/releases/v1.4.0)[​](#setimagesequence "Direct link to setimagesequence")

Pass this flag to output an image sequence instead of a video. The default image format is JPEG. See [`setImageSequence()`](/docs/config#setimagesequence) for more details.

```tsx
remotion.config.ts

Config.setImageSequence(true);Copy
```

The [command line flag](/docs/cli/render#--sequence) `--sequence` will take precedence over this option.

## `overrideHeight()`[v3.2.40](https://github.com/remotion-dev/remotion/releases/v3.2.40)[​](#overrideheight "Direct link to overrideheight")

Overrides the height of the composition.

```tsx
remotion.config.ts

Config.overrideHeight(600);Copy
```

The [command line flag](/docs/cli/render#--height) `--height` will take precedence over this option.

## `overrideWidth()`[v3.2.40](https://github.com/remotion-dev/remotion/releases/v3.2.40)[​](#overridewidth "Direct link to overridewidth")

Overrides the width of the composition.

```tsx
remotion.config.ts

Config.overrideWidth(900);Copy
```

The [command line flag](/docs/cli/render#--width) `--width` will take precedence over this option.

## `overrideFps()`[v4.0.424](https://github.com/remotion-dev/remotion/releases/v4.0.424)[​](#overridefps "Direct link to overridefps")

Overrides the frames per second of the composition.

```tsx
remotion.config.ts

Config.overrideFps(25);Copy
```

The [command line flag](/docs/cli/render#--fps) `--fps` will take precedence over this option.

## `overrideDuration()`[v4.0.424](https://github.com/remotion-dev/remotion/releases/v4.0.424)[​](#overrideduration "Direct link to overrideduration")

Overrides the duration in frames of the composition.

```tsx
remotion.config.ts

Config.overrideDuration(300);Copy
```

The [command line flag](/docs/cli/render#--duration) `--duration` will take precedence over this option.

## `setCrf()`[v1.4.0](https://github.com/remotion-dev/remotion/releases/v1.4.0)[​](#setcrf "Direct link to setcrf")

The "Constant Rate Factor" (CRF) of the output. [Use this setting to tell FFmpeg how to trade off size and quality.](/docs/encoding#controlling-quality-using-the-crf-setting)

Ranges for CRF scale, by codec:

- `h264` crf range is 1-51 where crf 18 is *default*.
- `h265` crf range is 0-51 where crf 23 is *default*.
- `vp8` crf range is 4-63 where crf 9 is *default*.
- `vp9` crf range is 0-63 where crf 28 is *default*.
- `av1` crf range is 0-63 where crf 30 is *default*.

The lowest value is lossless, and the highest value is the worst quality possible. Higher values decrease the filesize at the cost of quality.

The range is exponential, so increasing the CRF value +6 results in roughly half the bitrate / file size, while -6 leads to roughly twice the bitrate.

Choose the highest CRF value that still provides an acceptable quality. If the output looks good, then try a higher value. If it looks bad, choose a lower value.

```tsx
remotion.config.ts

Config.setCrf(16);Copy
```

The [command line flag](/docs/cli/render#--crf) `--crf` will take precedence over this option.

note

If you enable [hardware acceleration](/docs/hardware-acceleration), you cannot set a `crf`. Use the [`setVideoBitrate()`](#setvideobitrate) option instead.

## `setVideoBitrate()`[v3.2.32](https://github.com/remotion-dev/remotion/releases/v3.2.32)[​](#setvideobitrate "Direct link to setvideobitrate")

Specify the target bitrate for the generated video. The syntax for FFmpeg's`-b:v` parameter should be used. FFmpeg may encode the video in a way that will not result in the exact video bitrate specified. Example values: `512K` for 512 kbps, `1M` for 1 Mbps.
  
  

```tsx
remotion.config.ts

Config.setVideoBitrate('1M');Copy
```

The [command line flag](/docs/cli/render#--video-bitrate) `--video-bitrate` will take precedence over this option.

## `setEncodingBufferSize()`[v4.0.78](https://github.com/remotion-dev/remotion/releases/v4.0.78)[​](#setencodingbuffersize "Direct link to setencodingbuffersize")

The value for the `-bufsize` flag of FFmpeg. Should be used in conjunction with the encoding max rate flag.
  
  

```tsx
remotion.config.ts

Config.setEncodingBufferSize('10000k');Copy
```

The [command line flag](/docs/cli/render#--buffer-size) `--buffer-size` will take precedence over this option.

## `setEncodingMaxRate()`[v4.0.78](https://github.com/remotion-dev/remotion/releases/v4.0.78)[​](#setencodingmaxrate "Direct link to setencodingmaxrate")

The value for the `-maxrate` flag of FFmpeg. Should be used in conjunction with the encoding buffer size flag.
  
  

```tsx
remotion.config.ts

Config.setEncodingMaxRate('5000k');Copy
```

The [command line flag](/docs/cli/render#--max-rate) `--max-rate` will take precedence over this option.

## `setAudioBitrate()`[v3.2.32](https://github.com/remotion-dev/remotion/releases/v3.2.32)[​](#setaudiobitrate "Direct link to setaudiobitrate")

Specify the target bitrate for the generated video. The syntax for FFmpeg's `-b:a` parameter should be used. FFmpeg may encode the video in a way that will not result in the exact audio bitrate specified. Example values: `512K` for 512 kbps, `1M` for 1 Mbps. Default: `320k`
  
  

```tsx
remotion.config.ts

Config.setAudioBitrate('128K');Copy
```

The [command line flag](/docs/cli/render#--audio-bitrate) `--audio-bitrate` will take precedence over this option.

## `setAudioLatencyHint()`[v4.0.303](https://github.com/remotion-dev/remotion/releases/v4.0.303)[​](#setaudiolatencyhint "Direct link to setaudiolatencyhint")

Sets the [audio latency](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/AudioContext) hint for the global `AudioContext` context that Remotion uses to play audio.  
Possible values: `interactive`, `balanced`, `playback`
  
  

```tsx
remotion.config.ts

Config.setAudioLatencyHint('interactive');Copy
```

The `--audio-latency-hint` command line flag will take precedence over this option.

## `setEnableFolderExpiry()`[v4.0.32](https://github.com/remotion-dev/remotion/releases/v4.0.32)[​](#setenablefolderexpiry "Direct link to setenablefolderexpiry")

When deploying sites, enable or disable S3 Lifecycle policies which allow for renders to auto-delete after a certain time. Default is `null`, which does not change any lifecycle policies of the S3 bucket. See: [Lambda autodelete](/docs/lambda/autodelete).
  

```tsx
remotion.config.ts

Config.setEnableFolderExpiry(true);Copy
```

## `setLambdaInsights()`[v4.0.115](https://github.com/remotion-dev/remotion/releases/v4.0.115)[​](#setlambdainsights "Direct link to setlambdainsights")

Enable [Lambda Insights in AWS CloudWatch](https://remotion.dev/docs/lambda/insights). For this to work, you may have to update your role permission.
  
  

```tsx
remotion.config.ts

Config.setLambdaInsights(true);Copy
```

## `setDeleteAfter()`[v4.0.32](https://github.com/remotion-dev/remotion/releases/v4.0.32)[​](#setdeleteafter "Direct link to setdeleteafter")

Automatically delete the render after a certain period. Accepted values are `1-day`, `3-days`, `7-days` and `30-days`.  
 For this to work, your bucket needs to have [lifecycles enabled](/docs/lambda/autodelete).
  
  

```tsx
remotion.config.ts

Config.setDeleteAfter('3-days');Copy
```

## `setBeepOnFinish()`[v4.0.84](https://github.com/remotion-dev/remotion/releases/v4.0.84)[​](#setbeeponfinish "Direct link to setbeeponfinish")

Whether the Remotion Studio tab should beep when the render is finished.
  
  

```tsx
remotion.config.ts

Config.setBeepOnFinish(true);Copy
```

The [command line flag](/docs/cli/studio#--beep-on-finish) `--beep-on-finish` will take precedence over this option.

## `setEnableCrossSiteIsolation()`[v4.0.306](https://github.com/remotion-dev/remotion/releases/v4.0.306)[​](#setenablecrosssiteisolation "Direct link to setenablecrosssiteisolation")

Enable Cross-Site Isolation in the Studio (sets Cross-Origin-Opener-Policy and Cross-Origin-Embedder-Policy HTTP headers, required for `@remotion/whisper-web`).
  
  

```tsx
remotion.config.ts

Config.setEnableCrossSiteIsolation(true);Copy
```

The [command line flag](/docs/cli/studio#--cross-site-isolation) `--cross-site-isolation` will take precedence over this option.

## `setAskAIEnabled()`[v4.0.407](https://github.com/remotion-dev/remotion/releases/v4.0.407)[​](#setaskaienabled "Direct link to setaskaienabled")

If the Cmd + I shortcut of the Ask AI modal conflicts with your Studio, you can disable it using this.
  
  

```tsx
remotion.config.ts

Config.setAskAIEnabled(false);Copy
```

The [command line flag](/docs/cli/studio#--disable-ask-ai) `--disable-ask-ai` will take precedence over this option.

## `setForceNewStudioEnabled()`[v4.0.421](https://github.com/remotion-dev/remotion/releases/v4.0.421)[​](#setforcenewstudioenabled "Direct link to setforcenewstudioenabled")

Forces starting a new Studio instance even if one is already running on the same port for the same project.
  
  

```tsx
remotion.config.ts

Config.setForceNewStudioEnabled(true);Copy
```

The [command line flag](/docs/cli/studio#--force-new) `--force-new` will take precedence over this option.

## `setIPv4()`[v4.0.125](https://github.com/remotion-dev/remotion/releases/v4.0.125)[​](#setipv4 "Direct link to setipv4")

Forces Remotion to bind to an IPv4 interface for the Studio server.
  
  

```tsx
remotion.config.ts

Config.setIPv4(true);Copy
```

The [command line flag](/docs/cli/studio#--ipv4) `--ipv4` will take precedence over this option.

## `setBufferStateDelayInMilliseconds()`[v4.0.111](https://github.com/remotion-dev/remotion/releases/v4.0.111)[​](#setbufferstatedelayinmilliseconds "Direct link to setbufferstatedelayinmilliseconds")

Set the amount of milliseconds after which the Player in the Studio will display a buffering UI after the Player has entered a buffer state. Default `300`.

```tsx
remotion.config.ts

Config.setBufferStateDelayInMilliseconds(0);Copy
```

## `setBinariesDirectory()`[v4.0.120](https://github.com/remotion-dev/remotion/releases/v4.0.120)[​](#setbinariesdirectory "Direct link to setbinariesdirectory")

The directory where the platform-specific binaries and libraries that Remotion needs are located. Those include an `ffmpeg` and `ffprobe` binary, a Rust binary for various tasks, and various shared libraries. If the value is set to `null`, which is the default, then the path of a platform-specific package located at `node_modules/@remotion/compositor-*` is selected.  
This option is useful in environments where Remotion is not officially supported to run like bundled serverless functions or Electron.
  
  

```tsx
remotion.config.ts

Config.setBinariesDirectory('/path/to/custom/directory');Copy
```

## `setPreferLosslessAudio()`[v4.0.123](https://github.com/remotion-dev/remotion/releases/v4.0.123)[​](#setpreferlosslessaudio "Direct link to setpreferlosslessaudio")

Uses a lossless audio codec, if one is available for the codec. If you set`audioCodec`, it takes priority over `preferLossless`.
  
  

```tsx
remotion.config.ts

Config.setPreferLosslessAudio(true);Copy
```

## `setHardwareAcceleration()`[v4.0.228](https://github.com/remotion-dev/remotion/releases/v4.0.228)[​](#sethardwareacceleration "Direct link to sethardwareacceleration")

One of
"disable", "if-possible", or "required"
. Default "disable". Encode using a hardware-accelerated encoder if
available. If set to "required" and no hardware-accelerated encoder is
available, then the render will fail.
  
  

```tsx
remotion.config.ts

Config.setHardwareAcceleration('if-possible');Copy
```

## `overrideFfmpegCommand()`[v3.2.22](https://github.com/remotion-dev/remotion/releases/v3.2.22)[​](#overrideffmpegcommand "Direct link to overrideffmpegcommand")

Modifies the FFmpeg command that Remotion uses under the hood. It works reducer-style, meaning that you pass a function that takes a command as an argument and returns a new command.

```tsx
remotion.config.ts

Config.overrideFfmpegCommand(({args}) => {
  // Define the custom FFmpeg options as an array of strings
  const customFfmpegOptions = ['-profile:v', 'main', '-video_track_timescale', '90000', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-strict', 'experimental'];
  // The customFfmpegOptions are inserted before the last element to ensure
  // they appear before the ffmpeg's output path
  args.splice(args.length - 1, 0, ...customFfmpegOptions);
  return args;
});Copy
```

The function you pass must accept an object as it's only parameter which contains the following properties:

- `type`: Either `"stitcher"` or `"pre-stitcher"`. If enough memory and CPU is available, Remotion may use a two-pass process for the video generation. `pre-stitcher` is the encoding phase and `stitcher` is the muxing phase. If the override function is only called once with `stitcher`, then encoding and muxing is done in the same step. You can tell whether parallel encoding is enabled by adding `--log=verbose` to your render command.
- `args`: An array of strings that is passed as arguments to the FFmpeg command.

Your function must return a modified array of strings.

warning

Using this feature is discouraged. Before using it, we want to make you aware of some caveats:

- The render command can change with any new Remotion version, even when it is a patch upgrade. This might break your usage of this feature.
- Depending on the selected codec, available CPU and RAM, Remotion may or may not use "parallel encoding" which will result in multiple FFmpeg commands being executed. Your function must be able to handle being called multiple times.
- The FFmpeg binary provided by Remotion supports only a small subset of FFmpeg commands, therefore not every passed option will be applied.
- This feature is not available when using Remotion Lambda.

Before you use this hack, reach out to the Remotion team on [Discord](https://remotion.dev/discord) and ask us if we are open to implement the feature you need in a clean way - we often do implement new features quickly based on users feedback.

## `setPublicLicenseKey()`[v4.0.398](https://github.com/remotion-dev/remotion/releases/v4.0.398)[​](#setpubliclicensekey "Direct link to setpubliclicensekey")

The public license key for your company license, obtained from the License keys page on [remotion.pro](https://remotion.pro/dashboard). If you are eligible for the free license, pass "free-license".
  
  

```tsx
remotion.config.ts

Config.setPublicLicenseKey('your-license-key');Copy
```

The [command line flag](/docs/cli/studio#--public-license-key) `--public-license-key` will take precedence over this option.

## `setImageSequencePattern()`[​](#setimagesequencepattern "Direct link to setimagesequencepattern")

Pattern for naming image sequence files. Supports `[frame]` for the zero-padded frame number and `[ext]` for the file extension.

```tsx
remotion.config.ts

Config.setImageSequencePattern('frame_[frame]_custom.[ext]');Copy
```

The [command line flag](/docs/cli/render#--image-sequence-pattern) `--image-sequence-pattern` will take precedence over this option.

## ~~`setQuality()`~~[​](#setquality "Direct link to setquality")

Renamed to `setJpegQuality` in `v4.0.0`.

## ~~`setFfmpegExecutable()`~~[​](#setffmpegexecutable "Direct link to setffmpegexecutable")

*removed in v4.0*

Allows you to use a custom FFmpeg binary. Must be an absolute path. By default, this is null and the FFmpeg in `PATH` will be used.

```tsx
remotion.config.ts

Config.setFfmpegExecutable('/path/to/custom/ffmpeg');Copy
```

The [command line flag](/docs/cli/render#--ffmpeg-executable) `--ffmpeg-executable` will take precedence over this option.

## ~~`setFfprobeExecutable()`~~[​](#setffprobeexecutable "Direct link to setffprobeexecutable")

*removed in v4.0*

Allows you to use a custom `ffprobe` binary. Must be an absolute path. By default, this is null and the `ffprobe` in `PATH` will be used.

```tsx
remotion.config.ts

Config.setFfprobeExecutable('/path/to/custom/ffprobe');Copy
```

The [command line flag](/docs/cli/render#--ffprobe-executable-) `--ffprobe-executable` will take precedence over this option.

## ~~`setPort()`~~[​](#setport "Direct link to setport")

*deprecated in v4.0.61 - use [`setStudioPort()`](/docs/config#setstudioport)*
and [`setRendererPort()`](/docs/config#setrendererport) instead.

Define on which port Remotion should start it's HTTP servers.  
By default, Remotion will try to find a free port.  
If you specify a port, but it's not available, Remotion will throw an error.

warning

Setting this option will break rendering in the Remotion Studio, because this option controls two settings at the same time:

- When starting the [Remotion Studio](/docs/terminology/studio), a server will be started to host it ([`setStudioPort()`](/docs/config#setstudioport)).
- During rendering, a HTTP server is also started in the background to serve the Webpack [bundle](/docs/terminology/bundle) ([`setRendererPort()`](/docs/config#setrendererport)).

Use the options individually.

```tsx
remotion.config.ts

Config.setPort(3003);Copy
```

The [command line flag](/docs/cli/render#--port) `--port` will take precedence over this option. If set on `npx remotion studio`, it will set the Studio port, otherwise the renderer port.

## ~~`setOutputFormat()`~~[​](#setoutputformat "Direct link to setoutputformat")

*Removed in v4.0.0*
*Deprecated*. Use `setCodec()` and `setImageSequence()` instead.

Either `'mp4'` or `'png-sequence'`.

```tsx
remotion.config.ts

import {Config} from '@remotion/cli/config';
// ---cut---
Config.setOutputFormat('mp4');Copy
```

The [command line flags](/docs/cli) `--sequence` and `--codec` will take precedence over this option.

The [command line flag](/docs/cli) `--quality` will take precedence over this option.

## ~~`setImageFormat()`~~[v1.4.0](https://github.com/remotion-dev/remotion/releases/v1.4.0)[​](#setimageformat "Direct link to setimageformat")

*Removed in v4.0*

Replaced in v4.0 with `setVideoImageFormat()` and `setStillImageFormat()`

Determines which in which image format to render the frames. Either:

- `jpeg` - the fastest option (default from v1.1)
- `png` - slower, but supports transparency
- `none` - don't render images, just calculate audio information (available from v2.0)

```tsx
remotion.config.ts

import {Config} from '@remotion/cli/config';
// ---cut---
Config.setImageFormat('png');Copy
```

The [command line flag](/docs/cli/render#--image-format) `--image-format` will take precedence over this option.

## Importing ES Modules[​](#importing-es-modules "Direct link to Importing ES Modules")

The [config file](/docs/config) gets executed in a CommonJS environment. If you want to import ES modules to override the Webpack config, you can pass an async function to `Config.overrideWebpackConfig()`:

```tsx
remotion.config.ts

import {Config} from '@remotion/cli/config';

Config.overrideWebpackConfig(async (currentConfiguration) => {
  const {enableSass} = await import('./src/enable-sass');
  return enableSass(currentConfiguration);
});Copy
```

## Old config file format[​](#old-config-file-format "Direct link to Old config file format")

In v3.3.39, a new config file format was introduced which flattens the options so they can more easily be discovered using TypeScript autocompletion.

Previously, each config option was two levels deep:

```tsx
remotion.config.ts

Config.Bundling.setCachingEnabled(false);Copy
```

From v3.3.39 on, all options can be accessed directly from the `Config` object.

```tsx
remotion.config.ts

Config.setCachingEnabled(false);Copy
```

The old way is deprecated, but will work for the foreseeable future.

## See also[​](#see-also "Direct link to See also")

- [Encoding guide](/docs/encoding)
