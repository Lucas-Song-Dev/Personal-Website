# Lucas Song — Portfolio

Personal site and portfolio for **Lucas Song**, a full-stack developer and **Computer Engineering** student at **UBC**. The experience is styled as an SSH terminal: you explore sections by typing commands (or using the command palette), with an ASCII/Three.js background and project cards for deeper work.

**Live site:** [lucassong.site](https://lucassong.site/)

## About this project

- **Next.js 15** (App Router) with **static export** (`output: "export"`) for hosting on GitHub Pages or any static host.
- **Terminal shell UI** with boot sequence, command history, and mapped commands for projects, work, skills, contact, resume, and help.
- **Framer Motion** for transitions; **Tailwind CSS** for layout and theme.
- **Three.js**-powered ASCII text effect in the background (`ASCIIText`).
- **Custom domain** via `public/CNAME` (`lucassong.site`); optional legacy path redirect under `public/Personal-Website/` for old links.

## Tech stack

- React 18, Next.js 15, TypeScript
- Tailwind CSS, shadcn-style UI primitives (Radix)
- Framer Motion, Three.js

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or your machine’s LAN address if you use `-H 0.0.0.0` in the dev script).

## Build and lint

```bash
npm run lint
npm run build
```

Static output is written to `out/`.

## Deploy (GitHub Pages)

The `deploy` script publishes the `out` folder (after `predeploy` runs `build`):

```bash
npm run deploy
```

Ensure repository Pages settings point at the correct branch/folder for your setup.

## Repository

Source for the site lives primarily under `src/app` (routes, layout) and `src/components` (terminal shell, sections, UI).
