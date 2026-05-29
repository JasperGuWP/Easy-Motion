---
title: "loadFont()v4.0.165"
source: https://www.remotion.dev/docs/fonts-api/load-font
---

# loadFont()[v4.0.165](https://github.com/remotion-dev/remotion/releases/v4.0.165)

*Part of the [`@remotion/fonts`](/docs/fonts) package*

Load a local font for use in Remotion.  
Automatically blocks the render until the font is ready.

## Usage[​](#usage "Direct link to Usage")

```tsx
MyComp.tsx

import { loadFont } from "@remotion/fonts";
import { AbsoluteFill, staticFile } from "remotion";

loadFont({
  family: "Bangers",
  url: staticFile("bangers.ttf"),
}).then(() => console.log("Font loaded!"));

export const GoogleFontsExample: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        fontFamily: "Bangers",
      }}
    >
      <h1>Local Font</h1>
    </AbsoluteFill>
  );
};Copy
```

## Options[​](#options "Direct link to Options")

### family[​](#family "Direct link to family")

Give the family a name.  
You can then reference that name in your CSS using `fontFamily`.

### url[​](#url "Direct link to url")

Where to load the font from. Can be a local file using [`staticFile()`](/docs/staticfile) or a URL.

### format?[​](#format "Direct link to format?")

Defines the format of the font file. By default gets derived from the file extension of the URL.  
Override with one of the following values explicitly: `woff2`, `woff`, `opentype`, `truetype`.

### ascentOverride?[​](#ascentoverride "Direct link to ascentOverride?")

Defines the ascent metric for the font.

### descentOverride?[​](#descentoverride "Direct link to descentOverride?")

Defines the descent metric for the font.

### display?[​](#display "Direct link to display?")

Equivalent to the CSS [`font-display`](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display) property.  
Determines how a font face is displayed based on whether and when it is downloaded and ready to use.

### featureSettings?[​](#featuresettings "Direct link to featureSettings?")

Equivalent to the CSS [`font-feature-settings`](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-feature-settings) property.
Allows control over advanced typographic features in OpenType fonts.

### lineGapOverride?[​](#linegapoverride "Direct link to lineGapOverride?")

Defines the line gap metric for the font.

### stretch?[​](#stretch "Direct link to stretch?")

Equivalent to the CSS [`font-stretch`](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-stretch) property.
Specify what kind of stretch the loaded font has.

### style?[​](#style "Direct link to style?")

Equivalent to the CSS [`font-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-style) property.
Specify what kind of style the loaded font has.

### weight?[​](#weight "Direct link to weight?")

Equivalent to the CSS [`font-weight`](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-weight) property.
Specify what kind of weight the loaded font has.

### unicodeRange?[​](#unicoderange "Direct link to unicodeRange?")

The range of Unicode code points to be used from the font.

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/fonts/src/load-font.ts)
- [Fonts](/docs/fonts)
