# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Vue 3 + Rsbuild template with file-based routing, multiple state management demos (Pinia, Vue Query, Pinia Colada), and Zod-validated API requests. Uses DummyJSON as mock API backend.

## Common Commands

```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm preview      # Preview production build locally
pnpm lint         # Run ESLint
pnpm lint:fix     # Auto-fix lint issues
pnpm typecheck    # TypeScript type checking (vue-tsc --noEmit)
```

## Architecture

### Entry Flow
`src/index.ts` → `src/bootstrap.ts` → creates Vue app, registers Pinia, auth setup, Pinia Colada, Vue Query, and router in that order.

### File-Based Routing
Uses `vue-router` experimental auto-resolver with `vue-router/unplugin` Rspack plugin. Routes are derived from `src/pages/` directory structure. Route type definitions auto-generated to `src/route-map.d.ts`.

**Route conventions:**
- `[param]` - dynamic segment (e.g., `[id]`)
- `[param=int]` - typed dynamic segment with custom parser (defined in `rsbuild.config.ts`)
- `[...path]` - catch-all 404
- `(group)` - pathless group for layout/auth wrappers
- `[[param]]+` - optional repeatable segment

### State Management (three approaches demonstrated)
1. **`createGlobalState` from @vueuse/core** - Used for `useCacheStore` (token persistence via `useLocalStorage`) and `useAuthStore` (login/logout/info)
2. **@tanstack/vue-query** - `queryOptions`/`infiniteQueryOptions` pattern in `src/api/module/user.api.ts`
3. **@pinia/colada** - `defineQueryOptions` pattern, alternative to Vue Query

### API Layer
- `src/api/fetch/client.ts` - Thin fetch wrapper with get/post/delete methods, optional Zod schema validation in dev mode
- `src/api/fetch/patch.ts` - Interceptor system for request/response transforms
- `src/setup/fetch.setup.ts` - Registers auth interceptor (Bearer token injection) and 401 response handler
- API modules in `src/api/module/` export both raw fetch functions and query option objects

### Auth Flow
- Token stored in localStorage via `useCacheStore`
- `src/setup/auth.setup.ts` registers `beforeEach` guard: unauthenticated users redirected to `/auth`, authenticated users without `userInfo` trigger `infoUser()` fetch
- `src/setup/fetch.setup.ts` auto-injects `Authorization` header and handles 401 logout

### Path Aliases
`~/` maps to `src/` (standard Rsbuild convention).

## Code Style

ESLint config uses `@antfu/eslint-config` with:
- 2-space indent, single quotes
- `unused-imports/no-unused-imports` warning
- Unused vars with `_` prefix are allowed
