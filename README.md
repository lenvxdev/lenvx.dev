# lenvx.dev

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06b6d4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square&logo=vercel)](https://lenvx.dev)
[![License](https://img.shields.io/badge/License-AGPL%20v3-blue?style=flat-square)](LICENSE)

Personal portfolio and blog of **lenvx**, a developer and producer from Lithuania.

Built to be fast, minimal, and clean. No fluff.

---

## What's inside

- **Home** - bio, skills, FAQ, contact
- **Blog** - MDX-powered posts with table of contents, reading time, and fuzzy search
- **About** - a bit more detail about me
- **Status** - live server metrics and Minecraft server status
- **Settings** - toggle performance mode, dark mode animation, and marquee

## Stack

- [Next.js 16](https://nextjs.org) with App Router and Turbopack
- [TypeScript](https://www.typescriptlang.org) - strict, everything typed
- [Tailwind CSS v4](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion) - animations
- [MDX](https://mdxjs.com) via `next-mdx-remote-client` - blog posts
- [Jotai](https://jotai.org) - atom-based state for settings
- [Fuse.js](https://fusejs.io) - fuzzy search on the blog
- [Lenis](https://lenis.darkroom.engineering) - smooth scrolling
- [rehype-pretty-code](https://rehype-pretty-code.netlify.app) + Shiki - syntax highlighting
- [Vercel Analytics](https://vercel.com/analytics) - privacy-friendly analytics

## Running locally

```bash
git clone https://github.com/lenvxdev/lenvx.dev.git
cd lenvx.dev
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Writing a post

Create a `.mdx` file in the `posts/` directory with this frontmatter:

```mdx
---
title: Your Post Title
description: A short summary.
createdAt: "2026-04-10"
updatedAt: "2026-04-10"
tags: ["tag1", "tag2"]
---

Your content here.
```

That's it, it shows up on `/blog` automatically.

## Forking

You're welcome to fork this and use it as a base for your own portfolio. I only ask one thing:

**Please keep a credit somewhere.** A link back to [lenvx.dev](https://lenvx.dev) or a mention in your README is more than enough. It's a small thing that means a lot.

## License

[GNU Affero General Public License v3.0](LICENSE) - if you use, modify, or deploy this, you must open source your version under the same license and credit the original.
