---
title: "enableScss()"
source: https://www.remotion.dev/docs/enable-scss/enable-scss
---

# enableScss()

*available from v4.0.162*

A function that modifies the default Webpack configuration to make the necessary changes to support SASS/SCSS.

```tsx
remotion.config.ts

import { Config } from "@remotion/cli/config";
import { enableScss } from "@remotion/enable-scss";

Config.overrideWebpackConfig((currentConfiguration) => {
  return enableScss(currentConfiguration);
});Copy
```

If you want to make other configuration changes, you can do so by doing them reducer-style:

```tsx
remotion.config.ts

import { Config } from "@remotion/cli/config";
import { enableScss } from "@remotion/enable-scss";

Config.overrideWebpackConfig((currentConfiguration) => {
  return enableScss({
    ...currentConfiguration,
    // Make other changes
  });
});Copy
```

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/enable-scss/src/enable-scss.ts)
