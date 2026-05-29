---
title: "Captionv4.0.216"
source: https://www.remotion.dev/docs/captions/caption
---

# Caption[v4.0.216](https://github.com/remotion-dev/remotion/releases/v4.0.216)

This is a simple data structure for a caption.

```tsx
import type {Caption} from '@remotion/captions';

(alias) type Caption = {
    text: string;
    startMs: number;
    endMs: number;
    timestampMs: number | null;
    confidence: number | null;
}
import Caption
```

By establishing a standard data structure, we allow many operations that involve captions to be interoperable:

- **Transcribing**: Using the [`@remotion/install-whisper-cpp`](/docs/install-whisper-cpp), [`@remotion/openai-whisper`](/docs/openai-whisper), or [`@remotion/elevenlabs`](/docs/elevenlabs) packages
- **Formatting**: For example, creating pages using [`createTikTokStyleCaptions()`](/docs/captions/create-tiktok-style-captions)
- **Parsing**: Using the [`parseSrt()`](/docs/captions/parse-srt) function
- **Serializing**: For example to a `.srt` file using [`serializeSrt()`](/docs/captions/serialize-srt)

## Fields[​](#fields "Direct link to Fields")

### `text`[​](#text "Direct link to text")

The text of the caption.

### `startMs`[​](#startms "Direct link to startms")

The start time of the caption in milliseconds.

### `endMs`[​](#endms "Direct link to endms")

The end time of the caption in milliseconds.

### `timestampMs`[​](#timestampms "Direct link to timestampms")

The timestamp of the caption as a singular timestamp in milliseconds.  
When using [`@remotion/install-whisper-cpp`](/docs/install-whisper-cpp), this the `t_dtw` value.  
Otherwise, it is not defined, but may be the average of the start and end timestamps.

### `confidence`[​](#confidence "Direct link to confidence")

A number between 0 and 1 that indicates how confident the transcription is.

## Whitespace sensitivity[​](#whitespace-sensitivity "Direct link to Whitespace sensitivity")

The [`text`](#text) field is whitespace sensitive. You should include spaces in it, ideally before each word.

While rendering, apply the [`white-space: pre`](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space) CSS property to the container of the caption to ensure that the spaces are preserved.

## See also[​](#see-also "Direct link to See also")

- [Source code for this type](https://github.com/remotion-dev/remotion/blob/main/packages/captions/src/caption.ts)
- [`@remotion/captions`](/docs/captions/api)
