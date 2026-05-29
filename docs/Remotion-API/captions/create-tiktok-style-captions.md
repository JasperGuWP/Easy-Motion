---
title: "createTikTokStyleCaptions()v4.0.216"
source: https://www.remotion.dev/docs/captions/create-tiktok-style-captions
---

# createTikTokStyleCaptions()[v4.0.216](https://github.com/remotion-dev/remotion/releases/v4.0.216)

Using this function, you can segment tokens to create "pages" of captions, as commonly seen on TikTok videos.

You may specify how often pages switch.
A high value for `combineTokensWithinMilliseconds` will fit many words on 1 page, while a low value will lead to word-by-word animation.

This function is safe to use in the browser, Node.js and Bun.

note

This API expects the whitespace to be included in the `text` field **before each word. Spaces are used as delimiters, and omitting them will cause the entire text to merge into a single line or page, resulting in poorly formatted captions.**.

```tsx
Create pages from captions

import {createTikTokStyleCaptions, Caption} from '@remotion/captions';

const captions: Caption[] = [
  {
    text: 'Using',
    startMs: 40,
    endMs: 300,
    timestampMs: 200,
    confidence: null,
  },
  {
    text: " Remotion's",
    startMs: 300,
    endMs: 900,
    timestampMs: 440,
    confidence: null,
  },
  {
    text: ' TikTok',
    startMs: 900,
    endMs: 1260,
    timestampMs: 1080,
    confidence: null,
  },
  {
    text: ' template,',
    startMs: 1260,
    endMs: 1950,
    timestampMs: 1600,
    confidence: null,
  },
];

const {pages} = createTikTokStyleCaptions({
  captions,
  combineTokensWithinMilliseconds: 1200,
});

/* pages: [
  {
    text: "Using Remotion's",
    startMs: 40,
    durationMs: 860,
    tokens: [
      {
        text: 'Using',
        fromMs: 40,
        toMs: 300,
      },
      {
        text: " Remotion's",
        fromMs: 300,
        toMs: 900,
      },
    ],
  },
  {
    text: 'TikTok template,',
    startMs: 900,
    durationMs: 1050,
    tokens: [
      {
        text: 'TikTok',
        fromMs: 900,
        toMs: 1260,
      },
      {
        text: ' template,',
        fromMs: 1260,
        toMs: 1950,
      },
    ],
  }
] */Copy
```

## API[​](#api "Direct link to API")

### `captions`[​](#captions "Direct link to captions")

An array of [`Caption`](/docs/captions/caption) objects.

### `combineTokensWithinMilliseconds`[​](#combinetokenswithinmilliseconds "Direct link to combinetokenswithinmilliseconds")

Words that are closer than this value will be combined into a single page.

## Return value[​](#return-value "Direct link to Return value")

An object with the following properties:

### `pages`[​](#pages "Direct link to pages")

An array of `TikTokPage` objects.

A page consists of:

- `text`: The text of the page.
- `startMs`: The start time of the page in milliseconds.
- `durationMs`: The duration of the page in milliseconds (*from v4.0.261*).
- `tokens`: An array of objects, if you want to animate word-per-word:
  - `text`: The text of the token.
  - `fromMs`: The absolute start time of the token in milliseconds.
  - `toMs`: The absolute end time of the token in milliseconds.

## Whitespace sensitivity[​](#whitespace-sensitivity "Direct link to Whitespace sensitivity")

The [`text`](/docs/captions/caption#text) field is whitespace sensitive. You should include spaces in it, ideally before each word.

While rendering, apply the [`white-space: pre`](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space) CSS property to the container of the caption to ensure that the spaces are preserved.

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/captions/src/create-tiktok-style-captions.ts)
- [`@remotion/captions`](/docs/captions/api)
