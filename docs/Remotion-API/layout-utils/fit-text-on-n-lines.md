---
title: "fitTextOnNLines()"
source: https://www.remotion.dev/docs/layout-utils/fit-text-on-n-lines
---

# fitTextOnNLines()

*Part of the [`@remotion/layout-utils`](/docs/layout-utils) package. Available from v4.0.313*

Calculates the `fontSize` needed to fit a text into a given width while respecting a maximum number of lines. Optionally, you can specify a maximum font size, and see how the text is split into lines.

```tsx
FitTextOnNLines.tsx

import {fitTextOnNLines} from '@remotion/layout-utils';

const text = 'Hello World';
const width = 100;
const maxLines = 2;
const fontFamily = 'Arial';
const fontWeight = 'bold';

const {fontSize, lines} = fitTextOnNLines({
  text,
  maxBoxWidth: width,
  maxLines,
  fontFamily: fontFamily,
  fontWeight: fontWeight,
  textTransform: 'uppercase',
  maxFontSize: 80,
});

// Example markup:
<div
  style={{
    fontSize,
    width,
    fontFamily,
    fontWeight,
    textTransform: 'uppercase',
  }}
>
  {text}
</div>;Copy
```

## API[​](#api "Direct link to API")

Accepts an object with the following properties:

### `text`[​](#text "Direct link to text")

*string*

The text to fit.

### `maxBoxWidth`[​](#maxboxwidth "Direct link to maxboxwidth")

*number*

The maximum width the text should fit into.

info

In the default Remotion stylesheet, borders shrink the container due to `box-sizing: border-box`.  
Subtract any borders, or use `outline` instead of `border`.

### `maxLines`[​](#maxlines "Direct link to maxlines")

*number*

The maximum number of lines the text should be distributed across.

### `fontFamily`[​](#fontfamily "Direct link to fontfamily")

*string*

The `font-family` CSS property you are going to assign to the text.

info

The font needs to be loaded before this API is being called.  
If you use [`@remotion/google-fonts`](/docs/google-fonts), wait until [`waitUntilDone()`](/docs/google-fonts/load-font#waituntildone) resolves first.

### `fontWeight?`[​](#fontweight "Direct link to fontweight")

*string | number*

Pass this option if you are going to assign a `font-weight` CSS property to the text.

### `letterSpacing?`[​](#letterspacing "Direct link to letterspacing")

*string*

Pass this option if you are going to assign a `letter-spacing` CSS property to the text.

### `fontVariantNumeric?`[​](#fontvariantnumeric "Direct link to fontvariantnumeric")

*string*

Pass this option if you are going to assign a `font-variant-numeric` CSS property to the text.

### `textTransform`[​](#texttransform "Direct link to texttransform")

*string*

Same as CSS style `text-transform`.

### `validateFontIsLoaded?`[​](#validatefontisloaded "Direct link to validatefontisloaded")

*boolean*

If set to `true`, will take a second measurement with the fallback font and if it produces the same measurements, it assumes the fallback font was used and will throw an error.

### `additionalStyles?`[​](#additionalstyles "Direct link to additionalstyles")

*object*

Additional CSS properties that affect the layout of the text.

### `maxFontSize?`[​](#maxfontsize "Direct link to maxfontsize")

*number*

The maximum font size (in pixels) that the text is allowed to reach. If not specified, defaults to 2000.

## Return value[​](#return-value "Direct link to Return value")

An object with the following properties:

### `fontSize`[​](#fontsize "Direct link to fontsize")

*number*

The calculated font size in pixels. Assign this to the `style` prop of your text element.

### `lines`[​](#lines "Direct link to lines")

*string[]*

An array of strings, each representing a line of text at the calculated font size. Useful for rendering or debugging how the text is split.

## Example[​](#example "Direct link to Example")

```tsx
import {fitTextOnNLines} from '@remotion/layout-utils';
import React from 'react';
import {AbsoluteFill} from 'remotion';

const boxWidth = 600;
const maxLines = 2;
// Must be loaded before calling fitTextOnNLines()
const fontFamily = 'Helvetica';
const fontWeight = 'bold';

export const FitTextOnNLines: React.FC<{text: string}> = ({text}) => {
  const {fontSize, lines} = fitTextOnNLines({
    fontFamily,
    text,
    maxBoxWidth: boxWidth,
    maxLines,
    fontWeight,
    maxFontSize: 80,
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}
    >
      <div
        style={{
          width: boxWidth,
          outline: '1px dashed rgba(0, 0, 0, 0.5)',
          height: 100,
          fontSize,
          fontWeight,
          fontFamily,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};Copy
```

Notes:

- A maximum font size of `80` was specified to prevent the text from becoming too large.
- The `fontFamily` and `fontWeight` were passed to the `div` element to ensure that the text is rendered with the same font as the one used by `fitTextOnNLines()`.
- The `outline` CSS property was used instead of `border`.  
  This is because in Remotion, the border is inside by default and shrinks the container, due to `box-sizing: border-box` being in the default stylesheet.
- The `lines` property in the return value shows how the text is split into lines at the calculated font size. This can be useful for rendering or debugging.
- The `maxFontSize` property allows you to limit the font size if you don't want the text to become too large.

## Important considerations[​](#important-considerations "Direct link to Important considerations")

See [Best practices](/docs/layout-utils/best-practices) to ensure you get correct measurements.

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/layout-utils/src/layouts/fit-text-on-n-lines.ts)
- [`@remotion/layout-utils`](/docs/layout-utils)
