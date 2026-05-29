---
title: "measureText()"
source: https://www.remotion.dev/docs/layout-utils/measure-text
---

# measureText()

*Part of the [`@remotion/layout-utils`](/docs/layout-utils) package.*

Calculates the width and height of specified text to be used for layout calculations. Only works in the browser, not in Node.js or Bun.

## Example[​](#example "Direct link to Example")

```tsx
import {measureText} from '@remotion/layout-utils';

const text = 'remotion';
const fontFamily = 'Arial';
const fontWeight = '500';
const fontSize = 12;
const letterSpacing = '1px';

measureText({
  text,
  fontFamily,
  fontWeight,
  fontSize,
  letterSpacing,
}); // { height: 14, width: 20 }Copy
```

## API[​](#api "Direct link to API")

This function has a cache. If there are two duplicate arguments inputs, the second one will return the first result without repeating the calculation.

The function takes the following options:

### `text`[​](#text "Direct link to text")

*string*

Any string.

### `fontFamily`[​](#fontfamily "Direct link to fontfamily")

*string*

Same as CSS style `font-family`

### `fontSize`[​](#fontsize "Direct link to fontsize")

*number* / *string*

Same as CSS style `font-size`. Since v4.0.125, strings are allowed too, before only numbers.

### `fontWeight`[​](#fontweight "Direct link to fontweight")

*string*

Same as CSS style `font-weight`

### `letterSpacing`[​](#letterspacing "Direct link to letterspacing")

*string*

Same as CSS style `letter-spacing`.

### `fontVariantNumeric`[v4.0.57](https://github.com/remotion-dev/remotion/releases/v4.0.57)[​](#fontvariantnumeric "Direct link to fontvariantnumeric")

*string*

Same as CSS style `font-variant-numeric`.

### `textTransform`[v4.0.140](https://github.com/remotion-dev/remotion/releases/v4.0.140)[​](#texttransform "Direct link to texttransform")

*string*

Same as CSS style `text-transform`.

### `validateFontIsLoaded?`[v4.0.136](https://github.com/remotion-dev/remotion/releases/v4.0.136)[​](#validatefontisloaded "Direct link to validatefontisloaded")

*boolean*

If set to `true`, will take a second measurement with the fallback font and if it produces the same measurements, it assumes the fallback font was used and will throw an error.

### `additionalStyles?`[v4.0.140](https://github.com/remotion-dev/remotion/releases/v4.0.140)[​](#additionalstyles "Direct link to additionalstyles")

*object*

Additional CSS properties that affect the layout of the text.

## Return value[​](#return-value "Direct link to Return value")

An object with `height` and `width`

## Important considerations[​](#important-considerations "Direct link to Important considerations")

See [Best practices](/docs/layout-utils/best-practices) to ensure you get correct measurements.

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/layout-utils/src/layouts/measure-text.ts)
- [`@remotion/layout-utils`](/docs/layout-utils)
