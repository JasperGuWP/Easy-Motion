---
title: "Contributing to Remotion"
source: https://www.remotion.dev/docs/contributing/
---

# Contributing to Remotion

Issues and pull requests of all sorts are welcome!

For bigger projects, please coordinate with Jonny Burger ([[email protected]](/cdn-cgi/l/email-protection#d3b9bcbdbdaa93a1b6bebca7babcbdfdb7b6a5), [Discord](https://remotion.dev/discord): `@jonnyburger`) to make sure your changes get merged.

Please note that since we charge for Remotion when companies are using it, this is a **commercial project**.  
By sending pull requests, you agree that we can use your code changes in a commercial context.

Furthermore, also note that you **cannot redistribute** this project. Please see [LICENSE.md](https://remotion.dev/license) for what's allowed and what's not.

This project is released with a [Contributor Code of Conduct](https://remotion.dev/coc). By participating in this project you agree to abide by its terms.

## Setup[​](#setup "Direct link to Setup")

[1](#1)

 Remotion uses [`Bun`](https://bun.com) v1.3.3 as the package manager for development in this repository. The version must be at least `1.3.3`.

```tsx
curl -fsSL https://bun.com/install | bash -s "bun-v1.3.3"Copy
```

[2](#2)

 Clone the Remotion repository:

```tsx
git clone --depth=1 https://github.com/remotion-dev/remotion.git && cd remotionCopy
```

note

The full Git history of Remotion is large. To save time and disk space, we recommend adding `--depth=1` to only clone the most recent `main` branch.

[3](#3)

 Install all dependencies:

```tsx
bun iCopy
```

[4](#4)

 Build the project initially:

```tsx
bun run buildCopy
```

[5](#5)

 Rebuild whenever a file changes:

```tsx
bun run watchCopy
```

[6](#6)

 You can start making changes!

## Coming from pnpm[​](#coming-from-pnpm "Direct link to Coming from pnpm")

Before using Bun, we used pnpm as the package manager. If you are coming from pnpm, you need to wipe all node\_modules folders first before you run `bun i`.

```tsx
bun run cleanallCopy
```

## Testing your changes[​](#testing-your-changes "Direct link to Testing your changes")

You can start the Testbed using

```tsx
cd packages/example
bun run devCopy
```

You can render a test video using

```tsx
cd packages/example
bunx remotion renderCopy
```

You can run tests using

```tsx
bun run testCopy
```

in either a subpackage to run tests for that package or in the root to run all tests.

## Running the `@remotion/player` testbed[​](#running-the-remotionplayer-testbed "Direct link to running-the-remotionplayer-testbed")

You can test changes to [@remotion/player](https://remotion.dev/docs/player) by starting the Player testbed:

```tsx
cd packages/player-example
bun run devCopy
```

For information about testing Remotion components, please consult the [Testing Remotion components](/docs/testing) page. Issues and pull requests of all sorts are welcome!

## Running documentation[​](#running-documentation "Direct link to Running documentation")

You can run the Docusaurus server that powers our docs using:

```tsx
cd packages/docs
bun run startCopy
```

## Running the CLI[​](#running-the-cli "Direct link to Running the CLI")

You can test changes to the CLI by moving to `packages/example` directory and using `bunx` to execute the CLI:

```tsx
cd packages/example
# Example - Get available compositions
bunx remotion compositions
# Example - Render command
bunx remotion render ten-frame-tester --output ../../out/video.mp4Copy
```

## Testing Remotion Lambda[​](#testing-remotion-lambda "Direct link to Testing Remotion Lambda")

In `packages/example`, there is a `runlambda.sh` script that will rebuild the code for the Lambda function, remove any deployed Lambda functions, deploy a new one and render a video.  
You need to put you [AWS credentials](/docs/lambda/authentication) in a `.env` file of the `packages/example` directory.

```tsx
cd packages/example
sh ./runlambda.shCopy
```

note

This will delete any Lambda functions in your account!

## Testing Remotion Cloud Run[​](#testing-remotion-cloud-run "Direct link to Testing Remotion Cloud Run")

In `packages/example`, there is a `runcloudrun.sh` script that will rebuild the code for the Cloud Run function, remove any deployed Cloud Run services, deploy a new one and render a video.  
You need to put you [GCP credentials](/docs/cloudrun/generate-env) in a `.env` file of the `packages/example` directory.

```tsx
cd packages/example
sh ./runcloudrun.shCopy
```

note

This will delete any Cloud Run services in your account!

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

If your `bun run build` throws errors, oftentimes it is because of caching issues. You can resolve many of these errors by running

```tsx
bun run cleanCopy
```

in the root directory. Make sure to beforehand kill any `bun run watch` commands, as those might regenerate files as you clean them!

## Developing new transition presentations[​](#developing-new-transition-presentations "Direct link to Developing new transition presentations")

To develop new transition presentations, see [here](/docs/contributing/presentation).

## Developing Rust parts[​](#developing-rust-parts "Direct link to Developing Rust parts")

To develop the Rust parts of Remotion, see [here](/docs/contributing/rust).

## See also[​](#see-also "Direct link to See also")

- [Implementing a new feature](/docs/contributing/feature)
- [Implementing a new option](/docs/contributing/option)
- [Writing documentation](/docs/contributing/docs)
- [Formatting guidelines](/docs/contributing/formatting)
- [Authoring Remotion libraries](/docs/authoring-packages)
