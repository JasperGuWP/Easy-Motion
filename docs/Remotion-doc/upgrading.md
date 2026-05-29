---
title: "Upgrading Remotion"
source: https://www.remotion.dev/docs/upgrading
---

# Upgrading Remotion

The easiest way to do this is to run the following command in the root of your project:

- npx- pnpm- yarn- bunx

```tsx
npx remotion upgradeCopy
```

```tsx
pnpm exec remotion upgradeCopy
```

```tsx
yarn remotion upgradeCopy
```

```tsx
bunx remotion upgradeCopy
```

note

You need the `@remotion/cli` package installed for this.

## Manually upgrading Remotion[​](#manually-upgrading-remotion "Direct link to Manually upgrading Remotion")

[1](#1)

 Edit the version number of all `@remotion/*` packages and
`remotion` in your `package.json` for all packages. The current version is 4.0.469
.

[2](#2)

 Delete the `^` in front of the version number in your
`package.json` in order to force the exact version you specified.

[3](#3)

 Run the install command of your package manager:

- npm- pnpm- yarn- bun

```tsx
npm iCopy
```

```tsx
pnpm iCopy
```

```tsx
yarnCopy
```

```tsx
bun iCopy
```

## Breaking changes[​](#breaking-changes "Direct link to Breaking changes")

Remotion follows semantic versioning.  
This means if the first number of the version is the same, you can upgrade and your code is backwards-compatible.

Example: If you are on 4.0.0, you can upgrade to 4.1.100 without changing your code.  
However, to upgrade to 5.0, you will need to follow the [migration guide](/docs/5-0-migration).

Exceptions to the breaking change rule are APIs that are marked as experimental.

## Changelog[​](#changelog "Direct link to Changelog")

Visit [remotion.dev/changelog](https://remotion.dev/changelog) to see a list of all changes.

## Stable versions[​](#stable-versions "Direct link to Stable versions")

We maintain a repo with the latest stable version of Remotion for customers who need a higher level of stability.  
Customers may get access to the repo on the [remotion.pro](https://remotion.pro) portal.
