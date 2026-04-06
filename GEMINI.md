# lenvx-dev (lenvx.dev)

Personal portfolio and blog of **lenvx**, a 15-year-old developer and producer. This project is built using modern, lightweight, and high-performance technologies.

## Project Overview

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management:** [Jotai](https://jotai.org/) (Atomic state)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Content:** MDX (stored in `posts/`, rendered with `next-mdx-remote-client`)
- **Backend/DB:** [PocketBase](https://pocketbase.io/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/)
- **Analytics:** (None)

## Architecture

- **`src/app/`**: Next.js App Router structure.
- **`src/components/`**: Reusable React components.
  - `src/components/ui/`: Low-level UI primitives (Radix UI wrappers).
- **`src/lib/`**: Core logic, utilities, and types.
  - `src/lib/atoms/`: Jotai atoms for global state (Performance mode, etc.).
  - `src/lib/fs/`: File-system operations (reading MDX posts).
  - `src/lib/pocketbase.ts`: PocketBase client initialization.
- **`posts/`**: MDX files for blog content.
- **`public/`**: Static assets (favicons, etc.).
- **`src/assets/`**: Internal assets like images (PFPs, banners).

## Building and Running

This project uses `pnpm` as its primary package manager.

- **Development:** `pnpm dev` (runs `next dev --turbopack`)
- **Build:** `pnpm build` (runs `next build`)
- **Start:** `pnpm start` (runs `next start`)
- **Linting:** `pnpm lint` (runs `next lint`)
- **Typegen:** `pnpm cf-typegen` (generates Cloudflare Env types)

## Development Conventions

- **Server Components:** Prefer Server Components by default. Use `"use client"` only when interactivity (hooks, event listeners) is required.
- **Atomic State:** Use Jotai atoms for shared client-side state.
- **Styling:** Use Tailwind CSS 4 utility classes. Prefer CSS variables for themes where appropriate.
- **MDX:** Blog posts should be added to the `posts/` directory as `.mdx` files with appropriate frontmatter (title, description, date, tags).
- **Security:** Strict CSP headers are configured in `next.config.ts`.
- **Accessibility:** Ensure components are accessible by utilizing Radix UI primitives.

## Testing

There is currently no formal testing suite (Jest/Vitest) configured. Manual verification and `next lint` are used.

## Deployment

The project is configured for deployment with Cloudflare (reference to `wrangler` and `cf-typegen` in `package.json`).
