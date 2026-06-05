# Vue RS Template Skills

This directory contains skills for common tasks in the Vue RS Template project.

## Available Skills

| Skill | Description | Usage |
|-------|-------------|-------|
| `create-page` | Create new page with file-based routing | `/create-page <path>` |
| `create-api` | Create API module with fetch client | `/create-api <module>` |
| `create-store` | Create state management store | `/create-store <name>` |
| `check-code` | Run code quality checks | `/check-code [--fix]` |
| `add-route-guard` | Add route guards for auth | `/add-route-guard <path>` |

## Quick Start

### Create a New Page

```bash
/create-page about
/create-page users/[id]
/create-page dashboard/(admin)
```

### Create API Module

```bash
/create-api product --with-query
/create-api order --with-mutations
```

### Create Store

```bash
/create-store cart --type pinia
/create-store settings --type vueuse
```

### Check Code Quality

```bash
/check-code           # Run lint + typecheck
/check-code --fix     # Auto-fix lint issues
/check-code --all     # Run all checks including build
```

### Add Route Guard

```bash
/add-route-guard dashboard --auth
/add-route-guard admin --auth --role admin
```

## Project Structure

```
src/
├── pages/           # File-based routes
├── api/
│   ├── fetch/       # Fetch client
│   └── module/      # API modules
├── store/           # State management
├── setup/           # App initialization
└── utils/           # Utilities
```

## Common Commands

```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm lint         # Run ESLint
pnpm lint:fix     # Auto-fix lint
pnpm typecheck    # TypeScript check
```

## Notes

- Routes are auto-generated from `src/pages/` directory
- Use `~/` path alias for `src/`
- ESLint uses `@antfu/eslint-config` (2-space indent, single quotes)
- State management: `createGlobalState` (simple) or Pinia (complex)
- API layer uses fetch client with optional Zod validation
