# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture Overview

This is a **dual-application monorepo** for Cafetería Ébenezer:

1. **Backend** (root): Node.js/Express REST API (`server.js`, `src/`)
2. **Frontend** (subfolder): Next.js 16 app (`cafeteria-ebenezer/`)

The two are deployed separately — the backend serves as an Express API, and the Next.js frontend deploys to Vercel. In development they run concurrently.

### Backend Structure (`src/`)

```
server.js              — Entry point; creates Express app, wires middleware + routes
api/index.js           — Vercel serverless adapter (re-exports createApp())
src/config.js          — Central config (port, env, limits, DB options)
src/db/index.js        — PostgreSQL pool via node-postgres; supports DATABASE_URL or individual env vars
src/routes/            — pedidos.js, resenas.js, health.js
src/middleware/        — security.js (CORS, headers, requestId, logger), rateLimiter.js, validation.js, auth.js, errorHandler.js
src/validators/        — Joi schemas for pedido, resena, and state updates
src/utils/             — logger.js, requestId.js, safeCompare.js, db.js
```

All API responses follow the envelope: `{ error: boolean, message?: string, data?: any, total?: number }`.

Administrative endpoints (GET all pedidos, PATCH/DELETE, GET all resenas) require an `X-API-Key` header validated in `src/middleware/auth.js`.

### Frontend Structure (`cafeteria-ebenezer/app/`)

```
app/layout.tsx                  — Root layout: InfoStrip, WhatsAppButton, JSON-LD schema
app/page.tsx                    — Redirects → /inicio
app/(pages)/layout.tsx          — Shared layout for page routes (Navigation, Footer)
app/(pages)/inicio/page.tsx     — Landing/home page
app/(pages)/menu/page.tsx
app/(pages)/nosotros/page.tsx
app/(pages)/resenas/page.tsx    — Reviews with form (POST /api/resenas)
app/(pages)/contacto/page.tsx
app/(pages)/galeria/page.tsx
app/components/shared/          — Navigation.tsx, Footer.tsx
app/components/                 — SplashScreen.tsx, WhatsAppButton.tsx, InfoStrip.tsx
```

Uses Next.js App Router with route groups. Tailwind CSS v4. TypeScript.

## Development Commands

### Run both backend + frontend concurrently
```bash
npm run dev
```

### Backend only (port 3000)
```bash
npm run dev:api
```

### Frontend only (Next.js dev server, from root)
```bash
npm run dev:client
```

### Build frontend for production
```bash
npm run build:client
```

### Run tests (Jest, backend only)
```bash
npm test
```

### Run a single test file
```bash
npx jest src/__tests__/auth.middleware.test.js
```

### Lint
```bash
npm run lint          # backend (eslint root)
cd cafeteria-ebenezer && npm run lint   # frontend
```

### Format
```bash
npm run format        # prettier --write .
```

## Environment Variables

Backend requires these env vars (or `DATABASE_URL` for Postgres):
- `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`
- `DATABASE_URL` (takes precedence over individual vars)
- `DB_SSL=true` or `PGSSLMODE=require` (SSL auto-enabled in production/Vercel)
- `API_KEY` — used by auth middleware for admin endpoints
- `PORT` — defaults from `src/config.js`

Frontend:
- `NEXT_PUBLIC_BASE_URL` — canonical URL for metadata/OG tags (defaults to `https://cafeteria-ebenezer.vercel.app`)

## Deployment

- **Vercel**: `vercel-build` script runs `build:client`. `api/index.js` is the serverless entry point for the backend.
- The `cafeteria-ebenezer/` Next.js subfolder is what gets built and deployed to Vercel as the frontend.
- Static fallback frontend (`public/index.html`) is served by Express in development.
