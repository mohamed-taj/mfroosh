# Fusion Starter

A production-ready full‑stack React + Express starter template with TypeScript, Vite, TailwindCSS, and modern tooling — built for fast iteration and easy deployment. Ideal for single-page apps (React Router v6 SPA mode) that need a small integrated backend for API routes.

---

## 🚀 Key features

- React 18 + TypeScript + Vite
- Integrated Express server (hot-reload in dev)
- TailwindCSS 3 + utility-first UI
- Radix UI components + Lucide icons
- Shared types between client and server
- Simple example API routes (e.g. `/api/ping`, `/api/demo`)
- Vitest for unit tests

---

## 🧭 Project structure

- client/ — React SPA (pages, components, UI primitives, locales)
- server/ — Express server and route handlers
- shared/ — Shared TypeScript types used by both client & server
- netlify/ — Netlify functions (if deploying there)

Key files:
- `client/App.tsx` — app entry & routing
- `client/global.css` — Tailwind theme
- `server/index.ts` — Express server setup
- `shared/api.ts` — example shared interfaces

---

## ⚙️ Development

Prerequisites: Node.js (LTS recommended) and pnpm

Install dependencies:

```bash
pnpm install
```

Start dev server (client + server):

```bash
pnpm dev
```

Build for production:

```bash
pnpm build
```

Run production server:

```bash
pnpm start
```

Type check and tests:

```bash
pnpm typecheck
pnpm test
```

---

## ✍️ Adding features

- Add routes to `server/routes/` and register them in `server/index.ts`.
- Add pages in `client/pages/` and wire them in `client/App.tsx`.
- Keep shared interfaces in `shared/` and import them with path aliases (`@shared/*`).

---

## 📝 Notes & tips

- Prefer `pnpm` for package management.
- Keep secrets out of repo; server-only logic belongs in `server/` or serverless functions.

---

## 🤝 Contributing

PRs welcome — please run tests and typechecks before opening a PR.

---

Licensed under MIT. Feel free to customize this template for your project.
