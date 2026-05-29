---
title: "API overview"
source: https://www.remotion.dev/docs/api
---

# API overview

[**Command line**

Reference for the `npx remotion` commands](/docs/cli)[**Configuration file**

Reference for the `remotion.config.ts` file](/docs/config)

## remotion

Core APIs: `useCurrentFrame()`, `interpolate()`, etc.

[**<AbsoluteFill>**

Position content absolutely and in full size](/docs/absolute-fill)[**cancelRender()**

Abort an error](/docs/cancel-render)[**<Composition>**

Define a video](/docs/composition)[**continueRender()**

Unblock a render](/docs/continue-render)[**delayRender()**

Block a render from continuing](/docs/delay-render)[**Easing**

Customize animation curve of `interpolate()`](/docs/easing)[**<Folder>**

Organize compositions in the Studio sidebar](/docs/folder)[**<Freeze>**

Freeze some content in time](/docs/freeze)[**getInputProps()**

Receive the user-defined input data](/docs/get-input-props)[**getRemotionEnvironment()**

Determine if you are currently previewing or rendering](/docs/get-remotion-environment)[**<Html5Audio>**

Synchronize `<audio>` with Remotion's time](/docs/html5-audio)[**<Html5Video>**

Synchronize a `<video>` with Remotion's time](/docs/html5-video)[**<HtmlInCanvas>**

Draw DOM content into a canvas via HTML-in-canvas](/docs/remotion/html-in-canvas)[**<IFrame>**

Render an `<iframe>` tag and wait for it to load](/docs/iframe)[**<Img>**

Render an `<img>` tag and wait for it to load](/docs/img)[**<CanvasImage>**

Render an image into a canvas and apply effects](/docs/canvasimage)[**interpolateColors()**

Map a range of values to colors](/docs/interpolate-colors)[**interpolate()**

Map a range of values to another](/docs/interpolate)[**<Loop>**

Play some content repeatedly](/docs/loop)[**measureSpring()**

Determine the duration of a spring](/docs/measure-spring)[**<OffthreadVideo>**

Alternative to `<Html5Video>`](/docs/offthreadvideo)[**<AnimatedImage>**

Disply a GIF, AVIF or animated WebP image](/docs/animatedimage)[**registerRoot()**

Initialize a Remotion project](/docs/register-root)[**<Sequence>**

Time-shifts it's children](/docs/sequence)[**<Series>**

Display contents after another](/docs/series)[**spring()**

Physics-based animation primitive](/docs/spring)[**staticFile()**

Access file from `public/` folder](/docs/staticfile)[**<Still>**

Define a still](/docs/still)[**useCurrentFrame()**

Obtain the current time](/docs/use-current-frame)[**useVideoConfig()**

Get the duration, dimensions and FPS of a composition](/docs/use-video-config)[**VERSION**

Get the current version of Remotion](/docs/version)

## @remotion/animated-emoji

Google Fonts Animated Emojis as Remotion Components

[**<AnimatedEmoji>**

Component for rendering an animated emoji.](/docs/animated-emoji/animated-emoji)[**getAvailableEmoji()**

Get a list of available emoji.](/docs/animated-emoji/get-available-emoji)

## @remotion/animation-utils

Obtain info about video and audio.

[**makeTransform()**

Create a value for the CSS `transform` property](/docs/animation-utils/make-transform)[**interpolateStyles()**

Map a range of values to CSS `style` values](/docs/animation-utils/interpolate-styles)

## @remotion/bundler

Create a Webpack bundle from Node.JS

[**bundle()**

Create a Webpack bundle](/docs/bundle)

## @remotion/captions

Common operations for subtitles.

[**Caption**

An object shape for captions](/docs/captions/caption)[**parseSrt()**

Parse a .srt file into a `Caption` array](/docs/captions/parse-srt)[**serializeSrt()**

Serialize a .srt file into a `Caption` array](/docs/captions/serialize-srt)[**createTikTokStyleCaptions()**

Structure the captions for TikTok-style display](/docs/captions/create-tiktok-style-captions)

## @remotion/cloudrun

Render videos and stills on GCP Cloud Run

[**getServiceInfo()**

Gets information about a service](/docs/cloudrun/getserviceinfo)[**deployService()**

Create a new service in GCP Cloud Run](/docs/cloudrun/deployservice)[**deleteService()**

Delete a service in GCP Cloud Run](/docs/cloudrun/deleteservice)[**getServices()**

Lists available Remotion Cloud Run services](/docs/cloudrun/getservices)[**speculateServiceName()**

Speculate a service name based on its configuration](/docs/cloudrun/speculateservicename)[**getRegions()**

Get all available regions](/docs/cloudrun/getregions)[**deploySite()**

Bundle and upload a site to Cloud Storage](/docs/cloudrun/deploysite)[**deleteSite()**

Delete a bundle from Cloud Storage](/docs/cloudrun/deletesite)[**getSites()**

Get all available sites from Cloud Storage](/docs/cloudrun/getsites)[**getOrCreateBucket()**

Ensure a Remotion Cloud Storage bucket exists](/docs/cloudrun/getorcreatebucket)[**renderMediaOnCloudrun()**

Trigger a video or audio render](/docs/cloudrun/rendermediaoncloudrun)[**renderStillOnCloudrun()**

Trigger a still render](/docs/cloudrun/renderstilloncloudrun)[**testPermissions()**

Ensure permissions are correctly set up in GCP](/docs/cloudrun/testpermissions)

## @remotion/elevenlabs

Work with transcriptions from ElevenLabs

[**elevenLabsTranscriptToCaptions()**

Turn ElevenLabs Speech to Text output into an array of `Caption`](/docs/elevenlabs/elevenlabs-transcript-to-captions)

## @remotion/enable-scss

Webpack override for enabling SASS/SCSS

[**enableScss()**

Override the Webpack config to enable SCSS](/docs/enable-scss/enable-scss)

## @remotion/fonts

Load font files onto a page.

[**loadFont()**

Load a font from a URL or a local file](/docs/fonts-api/load-font)

## @remotion/gif

Include a GIF in your video.

[**<Gif>**

Render a GIF](/docs/gif/gif)[**getGifDurationInSeconds()**

Get the runtime of a GIF](/docs/gif/get-gif-duration-in-seconds)[**preloadGif()**

Prepare a GIF for displaying in the Player](/docs/gif/preload-gif)

## @remotion/google-fonts

Load Google Fonts onto a page.

[**loadFont()**

Load a Google Font](/docs/google-fonts/load-font)[**getAvailableFonts()**

Static list of available fonts](/docs/google-fonts/get-available-fonts)[**getInfo()**

Metadata about a specific font](/docs/google-fonts/get-info)[**loadFontFromInfo()**

Load a Google Font based on metadata](/docs/google-fonts/load-font-from-info)

## @remotion/install-whisper-cpp

Whisper.cpp installation and transcription

[**installWhisperCpp()**

Install the whisper.cpp software](/docs/install-whisper-cpp/install-whisper-cpp)[**downloadWhisperModel()**

Download a Whisper model](/docs/install-whisper-cpp/download-whisper-model)[**transcribe()**

Transcribe an audio file](/docs/install-whisper-cpp/transcribe)[**toCaptions()**

Converts the output from `transcribe()` into an array of `Caption` objects](/docs/install-whisper-cpp/to-captions)

## @remotion/lambda

Render videos and stills on AWS Lambda

[**estimatePrice()**

Estimate the price of a render](/docs/lambda/estimateprice)[**deployFunction()**

Create a new function in AWS Lambda](/docs/lambda/deployfunction)[**deleteFunction()**

Delete a function in AWS Lambda](/docs/lambda/deletefunction)[**getFunctionInfo()**

Gets information about a function](/docs/lambda/getfunctioninfo)[**getFunctions()**

Lists available Remotion Lambda functions](/docs/lambda/getfunctions)[**getCompositionsOnLambda()**

Gets list of compositions inside a Lambda function](/docs/lambda/getcompositionsonlambda)[**deleteSite()**

Delete a bundle from S3](/docs/lambda/deletesite)[**deploySite()**

Bundle and upload a site to S3](/docs/lambda/deploysite)[**getAwsClient()**

Access the AWS SDK directly](/docs/lambda/getawsclient)[**getRegions()**

Get all available regions](/docs/lambda/getregions)[**getSites()**

Get all available sites](/docs/lambda/getsites)[**downloadMedia()**

Download a render artifact from S3](/docs/lambda/downloadmedia)[**getUserPolicy()**

Get the policy JSON for your AWS user](/docs/lambda/getuserpolicy)[**getRolePolicy()**

Get the policy JSON for your AWS role](/docs/lambda/getrolepolicy)[**getOrCreateBucket()**

Ensure a Remotion S3 bucket exists](/docs/lambda/getorcreatebucket)[**getRenderProgress()**

Query the progress of a render](/docs/lambda/getrenderprogress)[**presignUrl()**

Make a private file public to those with the link](/docs/lambda/presignurl)[**renderMediaOnLambda()**

Trigger a video or audio render](/docs/lambda/rendermediaonlambda)[**renderStillOnLambda()**

Trigger a still render](/docs/lambda/renderstillonlambda)[**simulatePermissions()**

Ensure permissions are correctly set up](/docs/lambda/simulatepermissions)[**speculateFunctionName()**

Get the lambda function name based on its configuration](/docs/lambda/speculatefunctionname)[**validateWebhookSignature()**

Validate an incoming webhook request is authentic](/docs/lambda/validatewebhooksignature)[**appRouterWebhook()**

Handle incoming webhooks specifically for the Next.js app router](/docs/lambda/approuterwebhook)[**pagesRouterWebhook()**

Handle incoming webhooks specifically for the Next.js pages router](/docs/lambda/pagesrouterwebhook)[**expressWebhook()**

Handle incoming webhooks specifically for Express.js](/docs/lambda/expresswebhook)

## @remotion/layout-utils

Layout helpers

[**measureText()**

Get dimensions of text](/docs/layout-utils/measure-text)[**fillTextBox()**

Find line breaks and overflows in a text box](/docs/layout-utils/fill-text-box)[**fitText()**

Get font size to fit text in a box](/docs/layout-utils/fit-text)[**fitTextOnNLines()**

Get font size to fit text on n lines](/docs/layout-utils/fit-text-on-n-lines)

## @remotion/licensing

Report and query company license usage

[**registerUsageEvent()**

Register a render](/docs/licensing/register-usage-event)[**getUsage()**

Query usage of company license](/docs/licensing/get-usage)

## @remotion/light-leaks

Light Leak effects

[**`lightLeak()`**

Apply a light leak as a canvas effect](/docs/light-leaks/light-leak-effect)[**<LightLeak>**

Render a light leak effect](/docs/light-leaks/light-leak)

## @remotion/lottie

Include a Lottie animation in your video

[**<Lottie>**

Embed a Lottie animation in Remotion](/docs/lottie/lottie)[**getLottieMetadata()**

Get metadata of a Lottie animation](/docs/lottie/getlottiemetadata)[**staticFile()**

Load Lottie animations from a static file](/docs/lottie/staticfile)

## @remotion/media

An experimental `<NewVideo />` tag for embedding videos.

[**<Video>**

WebCodecs-based tag for embedding videos](/docs/media/video)[**<Audio>**

WebCodecs-based tag for embedding audio](/docs/media/audio)

## @remotion/media-parser

A pure JavaScript library for parsing video files

[**parseMedia()**

Parse a media file.](/docs/media-parser/parse-media)[**downloadAndParseMedia()**

Download and parse a media file.](/docs/media-parser/download-and-parse-media)[**parseMediaOnWebWorker()**

Parse a media file in the browser on a separate thread.](/docs/media-parser/parse-media-on-web-worker)[**parseMediaOnServerWorker()**

Parse a media file on the server on a separate thread.](/docs/media-parser/parse-media-on-server-worker)[**mediaParserController()**

Pause, resume and abort the parsing.](/docs/media-parser/media-parser-controller)[**hasBeenAborted()**

Determine from an error if the parsing has been aborted.](/docs/media-parser/has-been-aborted)[**WEBCODECS\_TIMESCALE**

The global timescale (`1_000_000`) of WebCodecs as a constant.](/docs/media-parser/webcodecs-timescale)

## @remotion/media-utils

Obtain info about video and audio.

[**audioBufferToDataUrl()**

Serialize an audio buffer](/docs/audio-buffer-to-data-url)[**getAudioData()**

Get metadata of an audio source](/docs/get-audio-data)[**getAudioDurationInSeconds()**

Get the duration of an audio source](/docs/get-audio-duration-in-seconds)[**getVideoMetadata()**

Get metadata of a video source](/docs/get-video-metadata)[**getWaveformPortion()**

Trims audio data into a waveform](/docs/get-waveform-portion)[**useAudioData()**

`getAudioData()` as a hook](/docs/use-audio-data)[**useWindowedAudioData()**

Optimized for fetching only current data, works only with `.wav`](/docs/use-windowed-audio-data)[**visualizeAudio()**

Process a music waveform for visualization](/docs/visualize-audio)[**visualizeAudioWaveform()**

Process a voice waveform for visualization](/docs/media-utils/visualize-audio-waveform)[**createSmoothSvgPath()**

Turn waveform points into a smooth SVG path](/docs/media-utils/create-smooth-svg-path)

## @remotion/motion-blur

Apply motion blur effects to components

[**<Trail>**

Add a trail effect to children](/docs/motion-blur/trail)[**<CameraMotionBlur>**

Add a natural camera motion blur effect to children](/docs/motion-blur/camera-motion-blur)

## @remotion/noise

Generate noise effects

[**noise2D()**

Create 2D noise](/docs/noise/noise-2d)[**noise3D()**

Create 3D noise](/docs/noise/noise-3d)[**noise4D()**

Create 4D noise](/docs/noise/noise-4d)

## @remotion/openai-whisper

Work with transcriptions from OpenAI Whisper

[**openAiWhisperApiToCaptions()**

Turn OpenAI Whisper API transcriptions into an array of `Caption`](/docs/openai-whisper/openai-whisper-api-to-captions)

## @remotion/paths

Manipulate and obtain info about SVG paths

[**getLength()**

Obtain length of an SVG path](/docs/paths/get-length)[**cutPath()**

Cut an SVG path at a specified length](/docs/paths/cut-path)[**getPointAtLength()**

Get coordinates at a certain point of an SVG path](/docs/paths/get-point-at-length)[**getTangentAtLength()**

Gets tangents `x` and `y` of a point which is on an SVG path](/docs/paths/get-tangent-at-length)[**reversePath()**

Switch direction of an SVG path](/docs/paths/reverse-path)[**normalizePath()**

Replace relative with absolute coordinates](/docs/paths/normalize-path)[**interpolatePath()**

Interpolates between two SVG paths](/docs/paths/interpolate-path)[**evolvePath()**

Animate an SVG path](/docs/paths/evolve-path)[**translatePath()**

Translates the position of an path against X/Y coordinates](/docs/paths/translate-path)[**warpPath()**

Remap the coordinates of a path](/docs/paths/warp-path)[**scalePath()**

Grow or shrink the size of the path](/docs/paths/scale-path)[**getBoundingBox()**

Get the bounding box of a SVG path](/docs/paths/get-bounding-box)[**resetPath()**

Translates an SVG path to `(0, 0)`](/docs/paths/reset-path)[**extendViewBox()**

Widen an SVG viewBox in all directions](/docs/paths/extend-viewbox)[**getSubpaths()**

Split SVG path into its parts](/docs/paths/get-subpaths)[**parsePath()**

Parse a string into an array of instructions](/docs/paths/parse-path)[**serializeInstructions()**

Turn an array of instructions into a SVG path](/docs/paths/serialize-instructions) [**reduceInstructions()**

Reduce the amount of instruction types](/docs/paths/reduce-instructions)

## @remotion/player

Play a Remotion video in the browser.

[**<Player>**

Embed a Remotion composition in a web app](/docs/player/player)[**<Thumbnail>**

Embed a still in a web app](/docs/player/thumbnail)

## @remotion/preload

Preload media for the Player

[**preloadVideo()**

Preload a video source](/docs/preload/preload-video)[**preloadAudio()**

Preload an audio source](/docs/preload/preload-audio)[**preloadFont()**

Preload a font](/docs/preload/preload-font)[**preloadImage()**

Preload an image](/docs/preload/preload-image)[**resolveRedirect()**

Get the definitive URL after all redirects](/docs/preload/preload-audio)

## @remotion/renderer

Render video, audio and stills from Node.JS or Bun

[**getCompositions()**

List available compositions](/docs/renderer/get-compositions)[**selectComposition()**

Get a composition](/docs/renderer/select-composition)[**renderMedia()**

Render a video or audio](/docs/renderer/render-media)[**renderFrames()**

Render a series of images](/docs/renderer/render-frames)[**renderStill()**

Render a single image](/docs/renderer/render-still)[**stitchFramesToVideo()**

Turn images into a video](/docs/renderer/stitch-frames-to-video)[**openBrowser()**

Open a Chrome browser to reuse across renders](/docs/renderer/open-browser)[**ensureBrowser()**

Open a Chrome browser to reuse across renders](/docs/renderer/ensure-browser)[**makeCancelSignal()**

Create token to later cancel a render](/docs/renderer/make-cancel-signal)[**getVideoMetadata()**

Get metadata from a video file in Node.js](/docs/renderer/get-video-metadata)[**getSilentParts()**

Obtain silent portions of a video or audio](/docs/renderer/get-silent-parts)[**combineChunks()**

Combine chunks of partial renders](/docs/renderer/combine-chunks)[**ensureFfmpeg()**

Check for ffmpeg binary and install if not existing](/docs/renderer/ensure-ffmpeg)[**ensureFfprobe()**

Check for ffprobe binary and install if not existing](/docs/renderer/ensure-ffprobe)[**getCanExtractFramesFast()**

Probes for fast extraction for <OffthreadVideo>](/docs/renderer/get-can-extract-frames-fast)

## @remotion/rive

Embed Rive animations in Remotion

[**<RemotionRiveCanvas>**

Render a Rive animation](/docs/rive/remotionrivecanvas)

## @remotion/sfx

Sound effects library

[**whip**

Whip sound effect](/docs/sfx/whip)[**whoosh**

Whoosh sound effect](/docs/sfx/whoosh)[**pageTurn**

Page turn sound effect](/docs/sfx/page-turn)[**uiSwitch**

UI switch sound effect](/docs/sfx/ui-switch)[**mouseClick**

Mouse click sound effect](/docs/sfx/mouse-click)[**shutterModern**

Modern camera shutter sound effect](/docs/sfx/shutter-modern)[**shutterOld**

Vintage camera shutter sound effect](/docs/sfx/shutter-old)[**ding**

Ding notification sound effect](/docs/sfx/ding)[**bruh**

Bruh sound effect](/docs/sfx/bruh)[**vineBoom**

Vine boom sound effect](/docs/sfx/vine-boom)[**windowsXpError**

Windows XP error sound effect](/docs/sfx/windows-xp-error)[**fah**

Fah meme sound effect](/docs/sfx/fah)[**spongebobFail**

SpongeBob fail sound effect](/docs/sfx/spongebob-fail)[**omgHellNah**

Oh my god bro hell nah sound effect](/docs/sfx/omg-hell-nah)[**priceIsRightFail**

Price Is Right fail horn sound effect](/docs/sfx/price-is-right-fail)[**romanceMeme**

Romance meme sound effect](/docs/sfx/romance-meme)[**boneCrack**

Bone crack sound effect](/docs/sfx/bone-crack)[**animeWow**

Anime wow sound effect](/docs/sfx/anime-wow)[**yippee**

Yippee sound effect](/docs/sfx/yippee)[**loadingLag**

Loading lag sound effect](/docs/sfx/loading-lag)[**wilhelmScream**

Wilhelm scream sound effect](/docs/sfx/wilhelm-scream)[**macQuack**

Mac quack sound effect](/docs/sfx/mac-quack)[**skedaddle**

Skedaddle sound effect](/docs/sfx/skedaddle)[**snapchatNotification**

Snapchat notification sound effect](/docs/sfx/snapchat-notification)[**nellyAhh**

Nelly ahh sound effect](/docs/sfx/nelly-ahh)[**sanctuaryGuardianWhat**

Sanctuary Guardian what meme sound effect](/docs/sfx/sanctuary-guardian-what)[**minecraftHurt**

Minecraft hurt sound effect](/docs/sfx/minecraft-hurt)[**ohMyGodVine**

Oh my god vine sound effect](/docs/sfx/oh-my-god-vine)[**illuminatiConfirmed**

Illuminati confirmed sound effect](/docs/sfx/illuminati-confirmed)[**dramaticBoomer**

Dramatic boomer sound effect](/docs/sfx/dramatic-boomer)[**triggered**

Triggered meme sound effect](/docs/sfx/triggered)[**recordScratch**

Record scratch sound effect](/docs/sfx/record-scratch)

## @remotion/shapes

Generate SVG shapes

[**makeArrow()**

Generate SVG Path for a arrow](/docs/shapes/make-arrow)[**<Arrow/>**

Render a arrow](/docs/shapes/arrow)[**makeRect()**

Generate SVG Path for a rect](/docs/shapes/make-rect)[**<Rect/>**

Render a rect](/docs/shapes/rect)[**makeCircle()**

Generate SVG Path for a circle](/docs/shapes/make-circle)[**<Circle/>**

Render a circle](/docs/shapes/circle)[**makeHeart()**

Generate SVG Path for a heart](/docs/shapes/make-heart)[**<Heart/>**

Render a heart](/docs/shapes/heart)[**makePie()**

Generate SVG Path for a pie](/docs/shapes/make-pie)[**<Pie/>**

Render a pie](/docs/shapes/pie)[**makeEllipse()**

Generate SVG Path for a ellipse](/docs/shapes/make-ellipse)[**<Ellipse/>**

Render a ellipse](/docs/shapes/ellipse)[**makeTriangle()**

Generate SVG Path for a triangle](/docs/shapes/make-triangle)[**<Triangle/>**

Render a triangle](/docs/shapes/triangle)[**makeStar()**

Generate SVG Path for a star](/docs/shapes/make-star)[**<Star/>**

Render a star](/docs/shapes/star)[**makePolygon()**

Generate SVG Path for a polygon](/docs/shapes/make-polygon)[**<Polygon/>**

Render a polygon](/docs/shapes/polygon)

## @remotion/skia

Low-level graphics using React Native Skia

[**enableSkia()**

Webpack override for enabling Skia](/docs/skia/enable-skia)[**<SkiaCanvas>**

React Native Skia <Canvas> wrapper](/docs/skia/skia-canvas)

## @remotion/starburst

Starburst Effect

### Effects

[**`starburst()`**

Apply a starburst ray effect](/docs/starburst/starburst-effect)

### Components

[**<Starburst>**

Render a starburst ray effect](/docs/starburst/starburst)

## @remotion/studio

APIs for controlling theRemotion Studio

[**getStaticFiles()**

Get a list of files in the `public` folder](/docs/studio/get-static-files)[**watchPublicFolder()**

Listen to changes in the public folder](/docs/studio/watch-public-folder)[**watchStaticFile()**

Listen to changes of a static file](/docs/studio/watch-static-file)[**writeStaticFile()**

Save content to a file in the public directory](/docs/studio/write-static-file)[**saveDefaultProps()**

Save default props to the root file](/docs/studio/save-default-props)[**updateDefaultProps()**

Update default props in the Props editor](/docs/studio/update-default-props)[**deleteStaticFile()**

Delete a file from the public directory](/docs/studio/delete-static-file)[**restartStudio()**

Restart the Studio Server.](/docs/studio/restart-studio)[**play()**

Start playback in the timeline](/docs/studio/play)[**pause()**

Pause playback in the timeline](/docs/studio/pause)[**toggle()**

Toggle playback in the timeline](/docs/studio/toggle)[**seek()**

Jump to a position in the timeline](/docs/studio/seek)[**goToComposition()**

Select a composition in the composition selector](/docs/studio/go-to-composition)[**focusDefaultPropsPath()**

Scrolls to a specific field in the default props editor](/docs/studio/focus-default-props-path)[**reevaluateComposition()**

Re-runs calculateMetadata() on the current composition](/docs/studio/reevaluate-composition)[**visualControl()**

Create a control in the right sidebar of the Studio](/docs/studio/visual-control)

## @remotion/tailwind

Webpack override for using TailwindCSS v3

[**enableTailwind()**

Override the Webpack config to enable TailwindCSS](/docs/tailwind/enable-tailwind)

## @remotion/tailwind-v4

Webpack override for using TailwindCSS v4

[**enableTailwind()**

Override the Webpack config to enable TailwindCSS](/docs/tailwind-v4/enable-tailwind)

## @remotion/three

Create 3D videos using React Three Fiber

[**<ThreeCanvas>**

A wrapper for React Three Fiber' Canvas](/docs/three-canvas)[**useVideoTexture(**

Use a video in React Three Fiber](/docs/use-video-texture)[**useOffthreadVideoTexture()**

Use an <OffthreadVideo> in React Three Fiber](/docs/use-offthread-video-texture)

## @remotion/transitions

Transition between scenes

### Components

[**`<TransitionSeries>`**

A `<Series>` with transitions inbetween](/docs/transitions/transitionseries)

### Timings

[**`springTiming()`**

Transition with a `spring()`](/docs/transitions/timings/springtiming)[**`linearTiming()`**

Transition linearly with optional Easing](/docs/transitions/timings/lineartiming)

### Presentations

Hover over an effect to see the preview.

[**`fade()`**

Animate the opacity of the scenes](/docs/transitions/presentations/fade)[**`slide()`**

Slide in and push out the previous scene](/docs/transitions/presentations/slide)[**`wipe()`**

Slide over the previous scene](/docs/transitions/presentations/wipe)[**`flip()`**

Rotate the previous scene](/docs/transitions/presentations/flip)[**`clockWipe()`**

Reveal the new scene in a circular movement](/docs/transitions/presentations/clock-wipe)[**`iris()`**

Reveal the scene through a circular mask from center](/docs/transitions/presentations/iris)[[](/img/zoom-blur-transition-thumb.mp4)

**`zoomBlur()`**

HTML-in-canvas

Zoom and rotate scenes with a radial blur](/docs/transitions/presentations/zoom-blur)[[](/img/dreamy-zoom-transition-thumb.mp4)

**`dreamyZoom()`**

HTML-in-canvas

Zoom through a white flash with gentle rotation](/docs/transitions/presentations/dreamy-zoom)[[](/img/film-burn-transition-thumb.mp4)

**`filmBurn()`**

HTML-in-canvas

Burn through scenes with procedural glow and blur](/docs/transitions/presentations/film-burn)[[](/img/linear-blur-transition-thumb.mp4)

**`linearBlur()`**

HTML-in-canvas

Blend scenes with a directional multi-sample blur](/docs/transitions/presentations/linear-blur)[[](/img/book-flip-transition-thumb.mp4)

**`bookFlip()`**

HTML-in-canvas

Turn the scenes like a shaded book page](/docs/transitions/presentations/book-flip)[[](/img/zoom-in-out-transition-thumb.mp4)

**`zoomInOut()`**

HTML-in-canvas

Zoom one scene in, crossfade, zoom the next out](/docs/transitions/presentations/zoom-in-out)[[](/img/dissolve-transition-thumb.mp4)

**`dissolve()`**

HTML-in-canvas

Burn through the previous scene with a glowing edge](/docs/transitions/presentations/dissolve)[[](/img/ripple-transition-thumb.mp4)

**`ripple()`**

HTML-in-canvas

Ripple the outgoing scene with a sinusoidal wave](/docs/transitions/presentations/ripple)[[](/img/crosswarp-transition-thumb.mp4)

**`crosswarp()`**

HTML-in-canvas

Warp both scenes across the x-axis and blend them](/docs/transitions/presentations/crosswarp)[[](/img/cross-zoom-transition-thumb.mp4)

**`crossZoom()`**

HTML-in-canvas

Zoom both scenes through a moving center and blur](/docs/transitions/presentations/cross-zoom)[[](/img/swap-transition-thumb.mp4)

**`swap()`**

HTML-in-canvas

Swap scenes with perspective and reflections](/docs/transitions/presentations/swap)[**`cube()`**

Paid

Rotate both scenes with 3D perspective](/docs/transitions/presentations/cube)[**`none()`**

Have no visual effect.](/docs/transitions/presentations/none)

## @remotion/vercel

Render videos on Vercel Sandbox

[**createSandbox()**

Create a sandbox with Remotion installed](/docs/vercel/create-sandbox)[**addBundleToSandbox()**

Copy a Remotion bundle into a sandbox](/docs/vercel/add-bundle-to-sandbox)[**renderMediaOnVercel()**

Render a video in a sandbox](/docs/vercel/render-media-on-vercel)[**getRenderProgress()**

Poll a detached sandbox render](/docs/vercel/get-render-progress)[**renderStillOnVercel()**

Render a still image in a sandbox](/docs/vercel/render-still-on-vercel)[**uploadToVercelBlob()**

Upload a file from the sandbox to Vercel Blob](/docs/vercel/upload-to-vercel-blob)[**Types**

TypeScript types reference](/docs/vercel/types)

## @remotion/webcodecs

Converting media using WebCodecs

[**convertMedia()**

Converts a video using WebCodecs and Media Parser](/docs/webcodecs/convert-media)[**getAvailableContainers()**

Get a list of containers `@remotion/webcodecs` supports.](/docs/webcodecs/get-available-containers)[**webcodecsController()**

Pause, resume and abort the conversion.](/docs/webcodecs/webcodecs-controller)[**canReencodeVideoTrack()**

Determine if a video track can be re-encoded](/docs/webcodecs/can-reencode-video-track)[**canReencodeAudioTrack()**

Determine if a audio track can be re-encoded](/docs/webcodecs/can-reencode-audio-track)[**canCopyVideoTrack()**

Determine if a video track can be copied without re-encoding](/docs/webcodecs/can-copy-video-track)[**canCopyAudioTrack()**

Determine if a audio track can be copied without re-encoding](/docs/webcodecs/can-copy-audio-track)[**getDefaultAudioCodec()**

Gets the default audio codec for a container if no other audio codec is specified.](/docs/webcodecs/get-default-audio-codec)[**getDefaultVideoCodec()**

Gets the default video codec for a container if no other audio codec is specified.](/docs/webcodecs/get-default-video-codec)[**defaultOnAudioTrackHandler()**

The default track transformation function for audio tracks.](/docs/webcodecs/default-on-audio-track-handler)[**defaultOnVideoTrackHandler()**

The default track transformation function for video tracks.](/docs/webcodecs/default-on-video-track-handler)[**getAvailableAudioCodecs()**

Get the audio codecs that can fit in a container.](/docs/webcodecs/get-available-audio-codecs)[**getAvailableVideoCodecs()**

Get the video codecs that can fit in a container.](/docs/webcodecs/get-available-video-codecs)[**convertAudioData()**

Change the format or sample rate of an `AudioData` object.](/docs/webcodecs/convert-audiodata)[**createAudioDecoder()**

Create an `AudioDecoder` object.](/docs/webcodecs/create-audio-decoder)[**createVideoDecoder()**

Create a `VideoDecoder` object.](/docs/webcodecs/create-video-decoder)[**extractFrames()**

Extract frames from a video at specific timestamps.](/docs/webcodecs/extract-frames)[**getPartialAudioData()**

Extract audio data from a specific time window of a media file.](/docs/webcodecs/get-partial-audio-data)[**rotateAndResizeVideoFrame()**

Rotate and resize a video frame.](/docs/webcodecs/rotate-and-resize-video-frame)[**webFsWriter**

Writer that saves to browser file system using File System Access API.](/docs/webcodecs/web-fs-writer)[**bufferWriter**

Writer that saves to an in-memory resizable ArrayBuffer.](/docs/webcodecs/buffer-writer)

## @remotion/zod-types

Zod types enabling Remotion Studio UI

[**zColor()**

A Zod Type for colors](/docs/zod-types/z-color)[**zTextarea()**

A Zod Type for multiple-line text in a textarea](/docs/zod-types/z-textarea)[**zMatrix()**

A Zod Type for editing matrices](/docs/zod-types/z-matrix)
