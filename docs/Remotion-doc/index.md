---
title: "Creating a new project"
source: https://www.remotion.dev/docs/
---

# Creating a new project

## Coding Agent Prompt[​](#coding-agent-prompt "Direct link to Coding Agent Prompt")

Paste into a coding agent, such as Claude Code, Codex or OpenCode:

> Ensure Node.js is installed.  
> Install Remotion Skills: `npx -y skills@latest add remotion-dev/skills -g -y`  
> Then use them to create a video.

## From the command line[​](#from-the-command-line "Direct link to From the command line")

```tsx
npx create-video@latest --yes --blank my-video
cd my-video
npm i
npx remotion skills add
npm run devCopy
```

Creates a video in the `my-video` directory, with TailwindCSS, blank template and [Agent Skills](/docs/ai/skills).

Planning to prompt a video using a coding agent?  
Click [here](/docs/ai/coding-agents) for more detailed beginner instructions.

## Wizard[​](#wizard "Direct link to Wizard")

Customize the creation of a Remotion project by selecting a specific [template](/templates), enable or disable Tailwind and Agent Skills.

- npm- bun- pnpm- yarn

```tsx
Use npm as the package manager

npx create-video@latestCopy
```

```tsx
Use pnpm as the package manager

pnpm create videoCopy
```

```tsx
Use Yarn as the package manager

yarn create videoCopy
```

```tsx
Use Bun as the package manager and runtime

bun create videoCopy
```

note

Bun as a runtime is mostly supported. [Read more here](/docs/bun).

Choose the [template](/templates) that is most suitable for you.  
For your first project, we recommend the [Hello World](/templates/hello-world) template.

- Regular templates- Next.js + React Router 7

After the project has been scaffolded, we recommend to open the project in your text editor and starting the [Remotion Studio](/docs/studio):

```tsx
npm run devCopy
```

After the project has been scaffolded, we recommend to open the project in your text editor and starting the app:

```tsx
npm run devCopy
```

To start the [Remotion Studio](/docs/studio):

```tsx
npm run remotionCopy
```

## System requirements[​](#system-requirements "Direct link to System requirements")

To use Remotion, you need at least [Node](https://nodejs.org/en/download/) 16 or [Bun](https://bun.sh) 1.0.3.
🍎 macOS 15 (Sequoia) or later is required. [Older versions are not supported.](https://github.com/remotion-dev/remotion/issues/7027)  
🐧 [Linux distros need at least version 2.35 of Libc.](https://github.com/remotion-dev/remotion/issues/2439)  
They also need to [install some additional packages](/docs/miscellaneous/linux-dependencies).  
Alpine Linux and nixOS are unsupported.

## Installation in existing projects[​](#installation-in-existing-projects "Direct link to Installation in existing projects")

Want to install Remotion in an existing project? Go here instead: [Installation in existing projects](/docs/brownfield)
