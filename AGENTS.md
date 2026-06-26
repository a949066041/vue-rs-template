# AGENTS.md

This file provides guidance to AI agents when working with code in this repository.

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

**Vue 3 SPA** built with **Rsbuild** (Rspack-based, not Vite/Webpack).

### Build & Bundling

- `rsbuild.config.ts` — main build config using `@rsbuild/plugin-vue` and `@rsbuild/plugin-tailwindcss`
- `config.ts` (project root) — app-level config (`appConfig.title`)
- `vue-router/unplugin` (as an Rspack plugin) provides file-based routing with auto-generated route types in `src/route-map.d.ts`
- Components in `**/components/**` are excluded from route generation
- `APP_TITLE`, `APP_VERSION`, and env vars are injected via `source.define`

### Path Aliases

- `~/*` → `./src/*`
- `~~/*` → `./*`

### Bootstrap Sequence (`src/index.ts` → `src/bootstrap.ts`)

1. Create Vue app, install Pinia
2. Run `setupFetch()` — patch `window.fetch` with interceptors
3. Run `authSetup(router)` — install route guard
4. Install Pinia Colada (gcTime 5min), Vue Query (staleTime Infinity), router
5. Mount after `router.isReady()`

### Routing (File-Based)

Routes are auto-generated from `src/pages/`. Patterns:
- `pages/index.vue` → `/`
- `pages/user/[id].vue` → `/user/:id` (dynamic param)
- `pages/(auth)/page.vue` → group, parentheses stripped from URL
- `pages/[...path].vue` → catch-all 404
- Layout files (e.g., `user.vue`) contain `<RouterView />` to render child routes

New pages are created by adding `.vue` files to `src/pages/`. The route types in `src/route-map.d.ts` regenerate automatically at build/dev time.

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

- **Tailwind CSS v4** via `@rsbuild/plugin-tailwindcss` (no `tailwind.config.*` — v4 uses CSS-based config)
- CSS entry: `src/style/index.css` with `@import "tailwindcss"` and a class-based `dark` variant
- **Iconify** dynamic icon classes via `@iconify/tailwind4`. Custom icons are loaded directly from the `svgs/` directory using `from-folder(custom, "./svgs")` — no build step required
- Custom icon usage: `class="icon-[custom--anq]"`; library icons: `class="icon-[line-md--home]"`

### Internationalization (i18n)

- **vue-i18n** (Composition API, `legacy: false`) configured in `src/i18n/`
- Locale messages live in `src/i18n/locales/<code>.ts`; datetime/number formats in `src/i18n/index.ts`
- Current locale is persisted to localStorage (`app-locale`) via VueUse; switch with `setLocale()`
- Language switcher: `src/components/LangSwitch.vue` (in the app header). Demo page: `src/pages/i18n.vue`
- Bundler feature flags (`__VUE_I18N_FULL_INSTALL__`, etc.) are defined in `rsbuild.config.ts`

### Auth

Token-based auth stored in localStorage via `useTokenStore`. Route guard in `src/setup/auth.setup.ts` protects authenticated routes. Fetch interceptor in `src/setup/fetch.setup.ts` attaches the Bearer token and handles 401.

## Conventions

- **Package manager:** pnpm, Node >=22
- **Linting:** ESLint with `@antfu/eslint-config` — 2-space indent, single quotes, unused imports warned
- **Formatting:** ESLint handles formatting (Prettier is disabled)
- **TypeScript:** Strict mode, ESNext target, Bundler module resolution. `vue-tsc` for type-checking. Volar plugin `vue-router/volar/sfc-typed-router` enabled in tsconfig for typed route support
- **Utilities:** `es-toolkit` (not lodash), `dayjs` for dates, `zod` for runtime validation
- **Demo API:** `https://dummyjson.com` — used for all API examples and the auth flow
