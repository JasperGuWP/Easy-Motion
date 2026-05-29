---
title: "Installing Remotion in an existing project"
source: https://www.remotion.dev/docs/brownfield
---

# Installing Remotion in an existing project

Remotion can be installed into existing projects, such as [Next.JS](https://nextjs.org/), [React Router](https://reactrouter.com/), [Vite](https://vitejs.dev/guide/) or [Create React App](https://create-react-app.dev/), as well as server-only projects that run on Node.JS. Get started by adding the following packages:

- npm- bun- pnpm- yarn

```tsx
npm i --save-exact [email protected] @remotion/[email protected]
```

This assumes you are currently using v4.0.469 of Remotion.  
Also update `remotion` and all `` `@remotion/*` `` packages to the same version.  
Remove all `^` character in front of the version numbers of it as it can lead to a version conflict.

```tsx
pnpm i [email protected] @remotion/[email protected]
```

This assumes you are currently using v4.0.469 of Remotion.  
Also update `remotion` and all `` `@remotion/*` `` packages to the same version.  
Remove all `^` character in front of the version numbers of it as it can lead to a version conflict.

```tsx
bun i [email protected] @remotion/[email protected]
```

This assumes you are currently using v4.0.469 of Remotion.  
Also update `remotion` and all `` `@remotion/*` `` packages to the same version.  
Remove all `^` character in front of the version numbers of it as it can lead to a version conflict.

```tsx
yarn --exact add [email protected] @remotion/[email protected]
```

This assumes you are currently using v4.0.469 of Remotion.  
Also update `remotion` and all `` `@remotion/*` `` packages to the same version.  
Remove all `^` character in front of the version numbers of it as it can lead to a version conflict.

- If you'd like to embed a Remotion video in your existing React app, install [`@remotion/player`](/docs/player/installation) as well.
- If you'd like to render a video using the Node.JS APIs, install [`@remotion/renderer`](/docs/renderer) as well.
- If you'd like to trigger a render on Remotion Lambda, install [`@remotion/lambda`](/docs/lambda/setup) as well.

## Setting up the folder structure[​](#setting-up-the-folder-structure "Direct link to Setting up the folder structure")

Create a new folder for the Remotion files. It can be anywhere and assume any name, in this example we name it `remotion` and put it in the root of our project. Inside the folder you created, create 3 files:

```tsx
remotion/Composition.tsx

export const MyComposition = () => {
  return null;
};Copy
```

```tsx
remotion/Root.tsx

import React from 'react';
import {Composition} from 'remotion';
import {MyComposition} from './Composition';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Empty"
        component={MyComposition}
        durationInFrames={60}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};Copy
```

```tsx
remotion/index.ts

import { registerRoot } from "remotion";
import { RemotionRoot } from "./Root";

registerRoot(RemotionRoot);Copy
```

The file that calls [`registerRoot()`](/docs/register-root) is now your Remotion [**entry point**](/docs/terminology/entry-point).

note

Watch out for import aliases in your `tsconfig.json` that will resolve `import {...} from "remotion"` to the `remotion` folder. We recommend to not use `paths` without a prefix.

## Starting the Studio[​](#starting-the-studio "Direct link to Starting the Studio")

Start the Remotion Studio using the following command:

```tsx
npx remotion studio remotion/index.tsCopy
```

Replace `remotion/index.ts` with your entrypoint if necessary.

## Render a video[​](#render-a-video "Direct link to Render a video")

Render our a video using

```tsx
npx remotion render remotion/index.ts MyComp out.mp4Copy
```

Replace the entrypoint, composition name and output filename with the values that correspond to your usecase.

## Install the ESLint Plugin[​](#install-the-eslint-plugin "Direct link to Install the ESLint Plugin")

Remotion has an ESLint plugin that warns about improper usage of Remotion APIs. To add it to your existing project, install it:

- npm- yarn- pnpm

```tsx
npm i -D @remotion/eslint-pluginCopy
```

```tsx
yarn add -D @remotion/eslint-pluginCopy
```

```tsx
pnpm i -D @remotion/eslint-pluginCopy
```

This snippet will enable the recommended rules only for the Remotion files:

```tsx
.eslintrc

{
  "plugins": ["@remotion"],
  "overrides": [
    {
      "files": ["remotion/*.{ts,tsx}"],
      "extends": ["plugin:@remotion/recommended"]
    }
  ]
}Copy
```

## Embed a Remotion video into your React app[​](#embed-a-remotion-video-into-your-react-app "Direct link to Embed a Remotion video into your React app")

You can use the `<Player>` component to display a Remotion video in your React project. Read the [separate page](/docs/player/integration) about it for instructions.
