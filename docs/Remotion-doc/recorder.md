---
title: "Recorder"
source: https://www.remotion.dev/docs/recorder
---

The Remotion Recorder is a video production tool **built entirely in JavaScript**.

## Recording[​](#recording "Direct link to Recording")

Record your facecam and screen in sync but independently. This allows you to create a dynamic layout later.

|  |  |  |  |
| --- | --- | --- | --- |
| | Record webcam and display as separate streams. Up to 4 sources can be recorded at the same time! Ensure you are in the center of the video and you are not too close to the microphone. | | | |

## Different platforms require different formats[​](#different-platforms-require-different-formats "Direct link to Different platforms require different formats")

Each platform has its own conventions for how videos should look.

|  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- |
| WIP | **Twitter, LinkedIn** 1:1  Muted by default  Captions burned in  **YouTube** 16:9  Audio by default  Captions as .srt file  Endcard with related videos  **TikTok, Reels, Shorts [planned](#tiktok-format)** 9:16  Safe space at bottom required  Word-by-word captions | | | | | |

The goal of the Recorder: Edit once **and feel native on each platform**.

This has a measurable impact on the performance of your post: For example, a 1:1 video on X [results in 30-35% higher video views and a 80-100% higher engagement rate](https://buffer.com/resources/square-video-vs-landscape-video/).

## Captions are essential[​](#captions-are-essential "Direct link to Captions are essential")

Generate captions locally using [Whisper.cpp](https://github.com/ggerganov/whisper.cpp). The Recorder will automatically install it for you.  
AI will make mistakes - so we make it easy to correct them.

|  |  |  |
| --- | --- | --- |
| Captions have word-level timings Orphan words are avoided by balancing the text layout Use `backticks` to highlight technical terms | | |

|  |  |  |
| --- | --- | --- |
| Fix captions quickly by clicking on a word Write a JavaScript function to fix common misspellings Captions are stored as editable JSON | | |

## Agnostic endcards[​](#agnostic-endcards "Direct link to Agnostic endcards")

Your viewer watched the entire video! Now don't make them forget about you.

|  |  |
| --- | --- |
| If you post on Twitter, the call-to-action is "Follow" and your other platforms are linked. If you post on YouTube, the call to action is "Subscribe" and cutouts for related videos are made. | |

The endcard is written with React and CSS, so can be easily customized.

## Customization[​](#customization "Direct link to Customization")

Having access to the entire source code, you can use CSS to customize the look of the Recorder.

|  |  |  |
| --- | --- | --- |
| Look of the built-in light theme Look of the built-in dark theme Use CSS to make it your own! | | |

The Recorder is built with TypeScript and React, and you can fully customize it's behavior.
It's a hackable video editor.

## Silence removal[​](#silence-removal "Direct link to Silence removal")

Automatically remove the silence at the start and end of your take.

## Music[​](#music "Direct link to Music")

Add background music to your video and automatically fade between the different sections.  
Three exclusive tracks are included that you may use for your video.

## Layouting[​](#layouting "Direct link to Layouting")

Whether you only record your facecam, or also your display, the Recorder always finds the ideal layout - even if you mix landscape and portrait videos.

## Transitions[​](#transitions "Direct link to Transitions")

Enable clean transitions between scenes - no matter if you change the layout during the video.

## Chapters[​](#chapters "Direct link to Chapters")

Mark a scene as the beginning of a new chapter and automatically generate animated chapters.

## B-Roll[​](#b-roll "Direct link to B-Roll")

Add images and videos on top of your facecam or display while your voiceover is playing to give the video more depth.

## Exporting[​](#exporting "Direct link to Exporting")

Export your video with much control over the encoding options.  
Render a video with a single click on a button, the CLI, Node.JS APIs, GitHub Actions, or even on AWS Lambda!

## See also[​](#see-also "Direct link to See also")

- [Editor Starter](/docs/editor-starter)

---

1) 9:16 format is not yet implemented.
