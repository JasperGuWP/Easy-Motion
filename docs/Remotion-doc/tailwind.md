---
title: "TailwindCSS"
source: https://www.remotion.dev/docs/tailwind
---

# TailwindCSS

## Using the CLI[​](#using-the-cli "Direct link to Using the CLI")

The easiest way to get started with Tailwind is by scaffolding a new video using the CLI and selecting a template that supports adding Tailwind automatically.

- npm- bun- pnpm- yarn

```tsx
npx create-video@latestCopy
```

```tsx
pnpm create videoCopy
```

```tsx
bun create videoCopy
```

```tsx
yarn create videoCopy
```

The following templates support scaffolding with TailwindCSS:

- [Blank](/templates/blank)- [Hello World](/templates/hello-world)- [Hello World (JavaScript)](/templates/javascript)- [Audiogram](/templates/audiogram)- [Music Visualization](/templates/music-visualization)- [Prompt to Video](/templates/prompt-to-video)- [Overlay](/templates/overlay)- [Stargazer](/templates/stargazer)- [TikTok](/templates/tiktok)

## Installing Tailwind v4 in existing project[​](#installing-tailwind-v4-in-existing-project "Direct link to Installing Tailwind v4 in existing project")

*from v4.0.256*

1. Install [`@remotion/tailwind-v4`](/docs/tailwind-v4/overview) package and TailwindCSS dependencies.

- npm- yarn- pnpm- bun

```tsx
npm i -D @remotion/tailwind-v4 tailwindcssCopy
```

```tsx
yarn add -D @remotion/tailwind-v4 tailwindcssCopy
```

```tsx
pnpm i -D @remotion/tailwind-v4 tailwindcssCopy
```

```tsx
bun i -D @remotion/tailwind-v4 tailwindcssCopy
```

2. Add the Webpack override from `@remotion/tailwind-v4` to your config file:

```tsx
remotion.config.ts

import {Config} from '@remotion/cli/config';
import {enableTailwind} from '@remotion/tailwind-v4';

Config.overrideWebpackConfig((currentConfiguration) => {
  return enableTailwind(currentConfiguration);
});Copy
```

3. If you use the [`bundle()` or `deploySite()` Node.JS API, add the Webpack override to it as well](/docs/webpack#when-using-bundle-and-deploysite).
4. Create a file `src/index.css` with the following content:

```tsx
src/index.css

@import 'tailwindcss';Copy
```

5. Import the stylesheet in your `src/Root.tsx` file. Add to the top of the file:

```tsx
src/Root.tsx

import './index.css';Copy
```

6. Ensure your `package.json` does not have `"sideEffects": false` set. If it has, declare that CSS files have a side effect:

```tsx
package.json

{
// Only if `"sideEffects": false` exists in your package.json.
-  "sideEffects": false
+  "sideEffects": ["*.css"]
}Copy
```

7. Start using TailwindCSS! You can verify that it's working by adding `className="bg-red-900"` to any element.

## Installing Tailwind v3 in existing project[​](#installing-tailwind-v3-in-existing-project "Direct link to Installing Tailwind v3 in existing project")

*from v3.3.95, see [instructions for older versions](https://github.com/remotion-dev/remotion/blob/88a5d8d17f50d6ab2b8a408556118d15a3686343/packages/docs/docs/tailwind.md)*

1. Install [`@remotion/tailwind`](/docs/tailwind/tailwind) package and TailwindCSS dependencies.

- npm- yarn- pnpm- bun

```tsx
npm i -D @remotion/tailwindCopy
```

```tsx
yarn add -D @remotion/tailwindCopy
```

```tsx
pnpm i -D @remotion/tailwindCopy
```

```tsx
bun i -D @remotion/tailwindCopy
```

2. Add the Webpack override from `@remotion/tailwind` to your config file:

```tsx
remotion.config.ts

import {Config} from '@remotion/cli/config';
import {enableTailwind} from '@remotion/tailwind';

Config.overrideWebpackConfig((currentConfiguration) => {
  return enableTailwind(currentConfiguration);
});Copy
```

note

Prior to `v3.3.39`, the option was called `Config.Bundling.overrideWebpackConfig()`.

3. If you use the [`bundle()` or `deploySite()` Node.JS API, add the Webpack override to it as well](/docs/webpack#when-using-bundle-and-deploysite).
4. Create a file `src/style.css` with the following content:

```tsx
src/style.css

@tailwind base;
@tailwind components;
@tailwind utilities;Copy
```

5. Import the stylesheet in your `src/Root.tsx` file. Add to the top of the file:

```tsx
src/Root.tsx

import './style.css';Copy
```

6. Add a `tailwind.config.js` file to the root of your project:

```tsx
tailwind.config.js

/* eslint-env node */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};Copy
```

7. Ensure your `package.json` does not have `"sideEffects": false` set. If it has, declare that CSS files have a side effect:

```tsx
package.json

{
// Only if `"sideEffects": false` exists in your package.json.
-  "sideEffects": false
+  "sideEffects": ["*.css"]
}Copy
```

8. Start using TailwindCSS! You can verify that it's working by adding `className="bg-red-900"` to any element.

note

Your package manager might show a peer dependency warning. You can safely ignore it or add `strict-peer-dependencies=false` to your `.npmrc` to suppress it.

## See also[​](#see-also "Direct link to See also")

- [TailwindCSS v2 (legacy)](/docs/tailwind-legacy)
