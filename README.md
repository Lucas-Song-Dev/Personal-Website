# Lucas Song — Portfolio

Personal site and portfolio for Lucas Song, a full-stack developer and Computer Engineering student at the University of British Columbia. The site presents professional experience, projects, technical skills, and contact details.

**Live site:** [lucassong.site](https://lucassong.site/)

## Overview

The interface is an SSH-style terminal. Visitors open sections by typing commands or using the command palette. An ASCII background sits behind the shell, and selected projects expand into a longer write-up.

- **Next.js 15** (App Router) with static export (`output: "export"`) for GitHub Pages or any static host.
- **Terminal shell** with a boot sequence, command history, and commands for projects, work, skills, contact, resume, and help.
- **Framer Motion** for transitions and **Tailwind CSS** for layout and theme.
- **Three.js** ASCII text effect in the background (`ASCIIText`).
- **Idle session reset:** if the tab stays active with no interaction for two minutes, the session prints a connection-reset message and reruns the boot sequence. Append `?idleKickMs=15000` to preview a shorter timeout (allowed range: `5000`–`600000` ms).
- **Custom domain** via `public/CNAME` (`lucassong.site`), with a legacy path under `public/Personal-Website/` for older links.

## Tech stack

- React 18, Next.js 15, TypeScript
- Tailwind CSS and shadcn-style UI primitives (Radix)
- Framer Motion, Three.js

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build and lint

```bash
npm run lint
npm run build
```

Static output is written to `out/`.

## Deploy (GitHub Pages)

The `deploy` script publishes the `out` folder after `predeploy` runs the production build:

```bash
npm run deploy
```

Point the repository Pages settings at the branch and folder used by that script.

## Repository layout

Application routes and layout live in `src/app`. The terminal shell, page sections, and UI components live in `src/components`. Experience, skills, and project content are defined alongside those sections and in `src/data/projects.ts`.
