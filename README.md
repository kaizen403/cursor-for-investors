# Neuralyn

An IDE for venture capital workflows. Not a chatbot, not another CRM — a workspace where investors source, evaluate, and track deals without tab-switching through six different tools.

The metaphor is literal: deals are repos, notes are files, integrations are extensions, and a command bar (`Ctrl+K`) turns intent into action.

## What's in here

This is a pnpm monorepo with three apps and a shared types package.

```
apps/
  desktop/    Tauri v2 shell wrapping a React + Vite frontend
  server/     Express API with Drizzle ORM over SQLite
  fe/         Next.js marketing landing page
packages/
  shared/     TypeScript types shared across apps
```

**Desktop app** — The actual product. A dark-themed IDE layout with:
- Pipeline view (table and kanban)
- Deal workspaces with notes, memos, timeline, and meeting history
- Company briefs and person profiles
- Thesis editor for encoding investment criteria
- Command palette for quick navigation

**Server** — REST API backing the desktop app. Routes for companies, deals, people, meetings, memos, theses, tasks, funds, pipeline summaries, search, and activity feeds. Auto-migrates and seeds on startup.

**Landing page** — Marketing site with a video hero, scroll-driven animations, feature breakdowns, and a CTA. Built with Framer Motion for page transitions.

## Tech stack

| Layer | What |
|-------|------|
| Desktop shell | Tauri v2 (Rust) |
| Desktop frontend | React 19, Vite 6, TanStack Query, Zustand, Tailwind v4, shadcn/ui |
| Server | Express, Drizzle ORM, better-sqlite3 |
| Landing page | Next.js 16, Framer Motion |
| Monorepo | pnpm workspaces, Turborepo |

## Getting started

You need [pnpm](https://pnpm.io/) (v10+), [Node.js](https://nodejs.org/) (v20+), and [Rust](https://rustup.rs/) (for the Tauri build).

```bash
# install dependencies
pnpm install

# run the server (port 3001)
pnpm --filter @vc-ide/server dev

# run the desktop app (opens Tauri window)
pnpm --filter @vc-ide/desktop dev

# run the landing page (port 3000)
pnpm --filter @vc-ide/fe dev

# or run everything at once
pnpm dev
```

The server creates a local SQLite database (`neuralyn.db`) and seeds it with sample data on first run. No external database setup needed.

## Domain model

The core objects: **Company**, **Deal**, **Person**, **Meeting**, **Memo**, **Thesis**, **Task**, **Fund**. Deals move through stages: `sourced → first_call → diligence → ic → term_sheet → closed | passed`. Each deal links to a company, optionally to a fund and thesis, and collects meetings, memos, tasks, and people along the way.

Types are defined once in `packages/shared/src/types.ts` and used by both the server and desktop app.

## Project structure

```
apps/desktop/
  src/
    components/
      command-bar/     Command palette (Ctrl+K)
      layout/          Sidebar, tab area, bottom panel, status bar
      ui/              shadcn primitives (button, dialog, tabs, etc.)
      workspace/       Deal cards, stage columns, meeting forms
    contexts/          Layout and workspace state providers
    hooks/             React Query hooks for every API resource
    lib/               API client, utility functions
    pages/             Pipeline, deal workspace, company, person, meeting, thesis views
  src-tauri/           Rust backend for the Tauri shell

apps/server/
  src/
    db/                Schema, connection, migrations, seed data
    lib/               Generic CRUD helpers, utilities
    routes/            One file per resource

apps/fe/
  app/
    components/        Navbar, word reveal animation
    sections/          Landing page sections (hero, features, how it works, CTA)
```

## License

Not yet decided. Reach out if you want to use or build on this.
