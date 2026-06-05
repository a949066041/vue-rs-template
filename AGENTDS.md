# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server (rsbuild dev)
pnpm build        # Production build (rsbuild build)
pnpm preview      # Preview production build
pnpm typecheck    # Type-check with vue-tsc --noEmit
pnpm lint         # Lint with ESLint
pnpm lint:fix     # Auto-fix lint issues
```

No test framework is configured.

## Architecture

**Vue 3 SPA** built with **Rsbuild** (Rspack-based, not Vite/Webpack). Deployed to Vercel.

### Build & Bundling

- `rsbuild.config.ts` — main build config using `@rsbuild/plugin-vue`
- `config.ts` (project root) — app-level config (`appConfig.title`)
- `vue-router/unplugin` (as an Rspack plugin) provides file-based routing with auto-generated route types in `src/route-map.d.ts`
- Components in `**/components/**` are excluded from route generation
- `APP_TITLE`, `APP_VERSION`, and env vars are injected via `source.define`

### Path Aliases

- `~/*` → `./src/*`
- `~~/*` → `./*`

### Bootstrap Sequence (`src/index.ts`)

1. Create router with `createWebHistory` and auto-generated `routes` from `vue-router/auto-routes`
2. Run `authSetup(router)` — install route guard before creating app
3. Create Vue app, install Pinia, Pinia Colada (gcTime 5min), Vue Query (staleTime Infinity), router
4. Mount after `router.isReady()`

### Routing (File-Based)

Routes are auto-generated from `src/pages/`. Patterns:
- `pages/index.vue` → `/`
- `pages/user/[id].vue` → `/user/:id` (dynamic param)
- `pages/(auth)/page.vue` → `/auth/page` (group, parentheses stripped from URL)
- `pages/[...path].vue` → catch-all 404
- Layout files (e.g., `user.vue`) contain `<RouterView />` to render child routes

New pages are created by adding `.vue` files to `src/pages/`. The route types in `src/route-map.d.ts` regenerate automatically at build time.

### State Management

Two data-fetching systems coexist:

1. **Pinia Colada** (`@pinia/colada`) — used in `query.vue` pages with `defineQueryOptions` / `useQuery`
2. **TanStack Vue Query** (`@tanstack/vue-query`) — used in `user.vue` pages with `queryOptions` / `useQuery` / `useMutation`

Simple global state uses `createGlobalState` from `@vueuse/core` (not Pinia's `defineStore`). See `src/store/`.

### API Layer

- `src/api/fetch/patch.ts` — patches `window.fetch` with request/response interceptors (auth token injection, 401 handling)
- `src/api/fetch/client.ts` — provides `get`, `post`, `delete` with optional Zod schema validation in dev mode
- `src/api/module/` — domain-specific API modules (types + fetch functions + query option factories)
- Uses native `fetch` (no axios). Base URL: `https://dummyjson.com`

### Styling

- **Tailwind CSS v4** via `@tailwindcss/postcss` (no `tailwind.config.*` — v4 uses CSS-based config)
- CSS entry: `src/style/index.css` with `@import "tailwindcss"` and `@plugin './plugins.ts'`
- **Iconify** dynamic icon classes via `@iconify/tailwind`. Custom icons built from `svgs/` directory (run automatically on `pnpm install`)

### Auth

Token-based auth stored in localStorage via `useCacheStore`. Route guard in `src/setup/auth.setup.ts` protects authenticated routes. Fetch interceptor in `src/setup/fetch.setup.ts` attaches Bearer token and handles 401.

## Conventions

- **Package manager:** pnpm (>=11.5.1), Node >=22
- **Linting:** ESLint 10 with `@antfu/eslint-config` — 2-space indent, single quotes, unused imports warned
- **Formatting:** ESLint handles formatting (Prettier is disabled). Auto-fix on save in VS Code
- **TypeScript:** Strict mode, ESNext target, Bundler module resolution. `vue-tsc` for type-checking. Volar plugin `vue-router/volar/sfc-typed-router` enabled in tsconfig for typed route support
- **Utilities:** `es-toolkit` (not lodash), `dayjs` for dates, `zod` for runtime validation
- **Demo API:** `https://dummyjson.com` — used for all API examples and auth flow
