---
title: "Starting the Studio"
source: https://www.remotion.dev/docs/studio/
---

# Starting the Studio

Using the Remotion Studio, you can preview your video, and if a server is connected, even render the video.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

The Remotion CLI is required for this guide.  
Most templates have it out of the box, but you can install it by running the following command in your terminal:

- npm- pnpm- yarn- bun

```tsx
npm i @remotion/cliCopy
```

```tsx
pnpm i @remotion/cliCopy
```

```tsx
yarn add @remotion/cliCopy
```

```tsx
bun i @remotion/cliCopy
```

## Launching the Studio[​](#launching-the-studio "Direct link to Launching the Studio")

You can start the Remotion Studio by running the following command in your terminal:

- Regular templates- Next.js and React Router 7 templates

```tsx
npm startCopy
```

```tsx
npm run remotionCopy
```

This is a shorthand for the [`studio`](/docs/cli/studio) command of the [Remotion CLI](/docs/cli):

```tsx
npx remotion studioCopy
```

See the available [options here](/docs/cli/studio).

A server will be started on port `3000` (or a higher port if it isn't available) and the Remotion Studio should open in the browser.
