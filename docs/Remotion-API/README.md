# Remotion API 文档

> 爬取自 https://www.remotion.dev/docs/api
> 爬取时间：2026-05-29
> 共 288 个 API 页面，1.8 MB

## 核心 API

- [<AbsoluteFill>](absolute-fill.md) — 绝对定位全尺寸容器
- [<Composition>](composition.md) — 定义视频
- [<Still>](still.md) — 定义静态图片
- [<Folder>](folder.md) — 组织 Studio 侧边栏
- [<Sequence>](sequence.md) — 时间偏移子元素
- [<Series>](series.md) — 依次显示内容
- [<Loop>](loop.md) — 循环播放
- [<Freeze>](freeze.md) — 冻结内容

### 获取数据
- [useCurrentFrame()](use-current-frame.md) — 获取当前时间
- [useVideoConfig()](use-video-config.md) — 获取时长、尺寸、帧率
- [getInputProps()](get-input-props.md) — 接收输入数据
- [getRemotionEnvironment()](get-remotion-environment.md) — 判断预览/渲染状态
- [VERSION](version.md) — 获取当前 Remotion 版本

### 动画
- [interpolate()](interpolate.md) — 值范围映射
- [interpolateColors()](interpolate-colors.md) — 颜色范围映射
- [spring()](spring.md) — 物理弹簧动画
- [measureSpring()](measure-spring.md) — 测量弹簧时长
- [Easing](easing.md) — 缓动函数

### 渲染控制
- [delayRender()](delay-render.md) — 阻塞渲染
- [continueRender()](continue-render.md) — 解除阻塞
- [cancelRender()](cancel-render.md) — 中止渲染
- [registerRoot()](register-root.md) — 初始化项目

### 静态文件
- [staticFile()](staticfile.md) — 访问 public/ 文件夹
- [preloadVideo()](preload/preload-video.md)
- [preloadAudio()](preload/preload-audio.md)
- [preloadFont()](preload/preload-font.md)
- [preloadImage()](preload/preload-image.md)

## 媒体组件

### 视频
- [<Html5Video>](html5-video.md) — HTML5 `<video>` 标签
- [<OffthreadVideo>](offthreadvideo.md) — 离线程视频渲染
- [<Video> (WebCodecs)](media/video.md)

### 音频
- [<Html5Audio>](html5-audio.md) — HTML5 `<audio>` 标签
- [<Audio> (WebCodecs)](media/audio.md)

### 图片/GIF/Canvas
- [<Img>](img.md) — 图片加载
- [<IFrame>](iframe.md) — iframe 渲染
- [<Gif>](gif/gif.md) — GIF 渲染
- [<CanvasImage>](canvasimage.md) — Canvas 图像效果
- [<AnimatedImage>](animatedimage.md) — 动态图片 (GIF/AVIF/WebP)
- [<HtmlInCanvas>](remotion/html-in-canvas.md)

### 音频数据
- [getAudioData()](get-audio-data.md)
- [getAudioDurationInSeconds()](get-audio-duration-in-seconds.md)
- [useAudioData()](use-audio-data.md)
- [useWindowedAudioData()](use-windowed-audio-data.md)
- [getWaveformPortion()](get-waveform-portion.md)
- [audioBufferToDataUrl()](audio-buffer-to-data-url.md)
- [visualizeAudio()](visualize-audio.md)

### 视频数据
- [getVideoMetadata()](get-video-metadata.md)
- [getGifDurationInSeconds()](gif/get-gif-duration-in-seconds.md)

## Lottie / Rive / Three.js / Skia

- [<Lottie>](lottie/lottie.md) — Lottie 动画
- [getLottieMetadata()](lottie/getlottiemetadata.md)
- [<RemotionRiveCanvas>](rive/remotionrivecanvas.md)
- [<ThreeCanvas>](three-canvas.md) — React Three Fiber
- [useVideoTexture()](use-video-texture.md)
- [useOffthreadVideoTexture()](use-offthread-video-texture.md)
- [<SkiaCanvas>](skia/skia-canvas.md)
- [enableSkia()](skia/enable-skia.md)

## 形状 (Shapes)

- [<Rect/>](shapes/rect.md) / [makeRect()](shapes/make-rect.md)
- [<Circle/>](shapes/circle.md) / [makeCircle()](shapes/make-circle.md)
- [<Ellipse/>](shapes/ellipse.md) / [makeEllipse()](shapes/make-ellipse.md)
- [<Triangle/>](shapes/triangle.md) / [makeTriangle()](shapes/make-triangle.md)
- [<Star/>](shapes/star.md) / [makeStar()](shapes/make-star.md)
- [<Pie/>](shapes/pie.md) / [makePie()](shapes/make-pie.md)
- [<Heart/>](shapes/heart.md) / [makeHeart()](shapes/make-heart.md)
- [<Polygon/>](shapes/polygon.md) / [makePolygon()](shapes/make-polygon.md)
- [<Arrow/>](shapes/arrow.md) / [makeArrow()](shapes/make-arrow.md)

## SVG Path

- [getLength()](paths/get-length.md), [cutPath()](paths/cut-path.md)
- [getPointAtLength()](paths/get-point-at-length.md)
- [getTangentAtLength()](paths/get-tangent-at-length.md)
- [interpolatePath()](paths/interpolate-path.md)
- [evolvePath()](paths/evolve-path.md)
- [translatePath()](paths/translate-path.md), [scalePath()](paths/scale-path.md), [warpPath()](paths/warp-path.md)
- [reversePath()](paths/reverse-path.md), [resetPath()](paths/reset-path.md)
- [normalizePath()](paths/normalize-path.md)
- [parsePath()](paths/parse-path.md), [serializeInstructions()](paths/serialize-instructions.md)
- [reduceInstructions()](paths/reduce-instructions.md)
- [getBoundingBox()](paths/get-bounding-box.md), [extendViewBox()](paths/extend-viewbox.md)
- [getSubpaths()](paths/get-subpaths.md)

## 文本布局

- [measureText()](layout-utils/measure-text.md)
- [fillTextBox()](layout-utils/fill-text-box.md)
- [fitText()](layout-utils/fit-text.md)
- [fitTextOnNLines()](layout-utils/fit-text-on-n-lines.md)

## 动画工具

- [makeTransform()](animation-utils/make-transform.md)
- [interpolateStyles()](animation-utils/interpolate-styles.md)

## 特效 (Effects)

### Motion Blur
- [<CameraMotionBlur>](motion-blur/camera-motion-blur.md)
- [<Trail>](motion-blur/trail.md)

### Noise
- [noise2D()](noise/noise-2d.md), [noise3D()](noise/noise-3d.md), [noise4D()](noise/noise-4d.md)

### Light Leaks
- [<LightLeak>](light-leaks/light-leak.md), [lightLeak()](light-leaks/light-leak-effect.md)

### Starburst
- [<Starburst>](starburst/starburst.md), [starburst()](starburst/starburst-effect.md)

### Animated Emoji
- [<AnimatedEmoji>](animated-emoji/animated-emoji.md)
- [getAvailableEmoji()](animated-emoji/get-available-emoji.md) (1 个失败)

## 转场 (Transitions)

### 转场系列
- [<TransitionSeries>](transitions/transitionseries.md)

### 时间控制
- [linearTiming()](transitions/timings/lineartiming.md)
- [springTiming()](transitions/timings/springtiming.md)

### 转场效果 (Presentations)
- [fade()](transitions/presentations/fade.md), [slide()](transitions/presentations/slide.md)
- [wipe()](transitions/presentations/wipe.md), [flip()](transitions/presentations/flip.md)
- [clockWipe()](transitions/presentations/clock-wipe.md), [iris()](transitions/presentations/iris.md)
- [cube()](transitions/presentations/cube.md), [swap()](transitions/presentations/swap.md)
- [dissolve()](transitions/presentations/dissolve.md), [ripple()](transitions/presentations/ripple.md)
- [crosswarp()](transitions/presentations/crosswarp.md), [crossZoom()](transitions/presentations/cross-zoom.md)
- [zoomBlur()](transitions/presentations/zoom-blur.md), [zoomInOut()](transitions/presentations/zoom-in-out.md)
- [dreamyZoom()](transitions/presentations/dreamy-zoom.md), [filmBurn()](transitions/presentations/film-burn.md)
- [linearBlur()](transitions/presentations/linear-blur.md), [bookFlip()](transitions/presentations/book-flip.md)
- [none()](transitions/presentations/none.md)

## 字幕 (Captions)

- [Caption](captions/caption.md) — 字幕对象
- [parseSrt()](captions/parse-srt.md), [serializeSrt()](captions/serialize-srt.md)
- [createTikTokStyleCaptions()](captions/create-tiktok-style-captions.md)

## Whisper / ElevenLabs

- [transcribe()](install-whisper-cpp/transcribe.md) — whisper.cpp 转录
- [installWhisperCpp()](install-whisper-cpp/install-whisper-cpp.md)
- [downloadWhisperModel()](install-whisper-cpp/download-whisper-model.md)
- [toCaptions()](install-whisper-cpp/to-captions.md)
- [openAiWhisperApiToCaptions()](openai-whisper/openai-whisper-api-to-captions.md)
- [elevenLabsTranscriptToCaptions()](elevenlabs/elevenlabs-transcript-to-captions.md)

## 音效 (SFX)

31 个内置音效：[whip](sfx/whip.md), [whoosh](sfx/whoosh.md), [ding](sfx/ding.md), [bruh](sfx/bruh.md), [vineBoom](sfx/vine-boom.md), [animeWow](sfx/anime-wow.md), [wilhelmScream](sfx/wilhelm-scream.md), [recordScratch](sfx/record-scratch.md), [triggered](sfx/triggered.md) 等

## 音频可视化

- [visualizeAudioWaveform()](media-utils/visualize-audio-waveform.md)
- [createSmoothSvgPath()](media-utils/create-smooth-svg-path.md)

## 渲染器 (Renderer — Node.js)

### 核心
- [getCompositions()](renderer/get-compositions.md)
- [selectComposition()](renderer/select-composition.md)
- [renderMedia()](renderer/render-media.md)
- [renderFrames()](renderer/render-frames.md)
- [renderStill()](renderer/render-still.md)
- [stitchFramesToVideo()](renderer/stitch-frames-to-video.md)
- [combineChunks()](renderer/combine-chunks.md)

### 浏览器
- [openBrowser()](renderer/open-browser.md)
- [ensureBrowser()](renderer/ensure-browser.md)

### 工具
- [makeCancelSignal()](renderer/make-cancel-signal.md)
- [getSilentParts()](renderer/get-silent-parts.md)
- [getCanExtractFramesFast()](renderer/get-can-extract-frames-fast.md)
- [ensureFfmpeg()](renderer/ensure-ffmpeg.md), [ensureFfprobe()](renderer/ensure-ffprobe.md)

## Lambda

20 个 Lambda 函数 API：[rendermediaonlambda](lambda/rendermediaonlambda.md), [deployfunction](lambda/deployfunction.md), [deploysite](lambda/deploysite.md), [estimateprice](lambda/estimateprice.md) 等

## Cloud Run

13 个 Cloud Run API：[rendermediaoncloudrun](cloudrun/rendermediaoncloudrun.md), [deployservice](cloudrun/deployservice.md), [deploysite](cloudrun/deploysite.md) 等

## Vercel

- [createSandbox()](vercel/create-sandbox.md)
- [renderMediaOnVercel()](vercel/render-media-on-vercel.md)
- [renderStillOnVercel()](vercel/render-still-on-vercel.md)
- [uploadToVercelBlob()](vercel/upload-to-vercel-blob.md)
- [getRenderProgress()](vercel/get-render-progress.md)
- [Types](vercel/types.md)

## Player

- [<Player>](player/player.md)
- [<Thumbnail>](player/thumbnail.md)

## WebCodecs / Media Parser

- [convertMedia()](webcodecs/convert-media.md) — 视频转换
- [extractFrames()](webcodecs/extract-frames.md) — 帧提取
- [parseMedia()](media-parser/parse-media.md) — 解析媒体文件
- [canCopyVideoTrack()](webcodecs/can-copy-video-track.md) / [canReencodeVideoTrack()](webcodecs/can-reencode-video-track.md)
- 30+ WebCodecs / Media Parser API

## Studio API

- [play()](studio/play.md), [pause()](studio/pause.md), [toggle()](studio/toggle.md), [seek()](studio/seek.md)
- [getStaticFiles()](studio/get-static-files.md), [writeStaticFile()](studio/write-static-file.md), [deleteStaticFile()](studio/delete-static-file.md)
- [saveDefaultProps()](studio/save-default-props.md), [updateDefaultProps()](studio/update-default-props.md)
- [restartStudio()](studio/restart-studio.md), [visualControl()](studio/visual-control.md)

## 字体

- [loadFont()](fonts-api/load-font.md)
- [Google Fonts: getInfo()](google-fonts/get-info.md), [loadFontFromInfo()](google-fonts/load-font-from-info.md) (getAvailableFonts 1 个失败)

## Zod Types

- [zColor()](zod-types/z-color.md), [zTextarea()](zod-types/z-textarea.md), [zMatrix()](zod-types/z-matrix.md)

## 配置

- [CLI 命令](cli.md)
- [配置文件 remotion.config.ts](config.md)
- [enableScss()](enable-scss/enable-scss.md), [enableTailwind()](tailwind/enable-tailwind.md)
- [bundle()](bundle.md)

## 许可证

- [registerUsageEvent()](licensing/register-usage-event.md), [getUsage()](licensing/get-usage.md)

---

**爬取失败 (2/290)**: animated-emoji/animated-emoji, google-fonts/get-available-fonts（HTML 结构递归深度超限）(共 2 页失败，其余 288 页成功)
