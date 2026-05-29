---
title: "getAvailableEmoji()"
source: https://www.remotion.dev/docs/animated-emoji/get-available-emoji
---

# getAvailableEmoji()

*available from v4.0.187*

Gets a list of available emoji that you can use with [`<AnimatedEmoji>`](/docs/animated-emoji/animated-emoji).

```tsx
get-emoji.ts

import {getAvailableEmojis} from "@remotion/animated-emoji";

const emojiList = getAvailableEmojis();

console.log(emojiList);Copy
```

## Return value[​](#return-value "Direct link to Return value")

An array of objects with the following properties:

### `name`[​](#name "Direct link to name")

The name of the emoji. You can pass the name to the [`emoji`](/docs/animated-emoji/animated-emoji#emoji) prop.

### `categories`[​](#categories "Direct link to categories")

An array of categories that the emoji belongs to.

### `tags`[​](#tags "Direct link to tags")

An array of tags that the emoji has.

### `durationInSeconds`[​](#durationinseconds "Direct link to durationinseconds")

The duration of the emoji in seconds.

### `codepoint`[​](#codepoint "Direct link to codepoint")

The Unicode codepoint of the emoji.

## See also[​](#see-also "Direct link to See also")

- [`<AnimatedEmoji>`](/docs/animated-emoji/animated-emoji)
