---
name: check-code
description: Run code quality checks (lint, typecheck, build)
---

# Check Code Quality

This skill runs code quality checks for the Vue project.

## Usage

```
/check-code [--fix] [--all]
```

## Options

- `--fix` - Auto-fix lint issues
- `--all` - Run all checks (lint + typecheck + build)

## Checks Available

### 1. ESLint Check

```bash
# Check only
pnpm lint

# Auto-fix
pnpm lint:fix
```

ESLint config uses `@antfu/eslint-config` with:
- 2-space indent, single quotes
- `unused-imports/no-unused-imports` warning
- Unused vars with `_` prefix are allowed

### 2. TypeScript Check

```bash
pnpm typecheck
```

This runs `vue-tsc --noEmit` to check:
- Type errors in `.vue` files
- Type errors in `.ts` files
- Missing type definitions

### 3. Production Build

```bash
pnpm build
```

This verifies:
- No build errors
- All imports resolve
- All dependencies installed

### 4. Dev Server Test

```bash
pnpm dev
```

Start dev server to verify:
- No runtime errors
- Hot reload works
- Pages load correctly

## Common Issues and Fixes

### ESLint Issues

```bash
# Auto-fix most issues
pnpm lint:fix

# Check specific file
npx eslint src/pages/about.vue
```

Common fixes:
- Use single quotes instead of double
- Add missing semicolons (if configured)
- Remove unused imports
- Fix indentation (2 spaces)

### TypeScript Issues

```bash
# Check specific error
pnpm typecheck 2>&1 | head -20
```

Common fixes:
- Add missing type annotations
- Import types with `import type`
- Add `.vue` file type declarations
- Check `tsconfig.json` paths

### Build Issues

```bash
# Clean and rebuild
rm -rf dist node_modules/.cache
pnpm install
pnpm build
```

Common fixes:
- Install missing dependencies
- Fix import paths
- Update outdated packages

## Workflow

1. **Before commit**: Run `pnpm lint` and `pnpm typecheck`
2. **Before push**: Run `pnpm build` to verify production build
3. **CI/CD**: All checks should pass

## Integration with Git

Add to `.husky/pre-commit`:

```bash
#!/bin/sh
pnpm lint
pnpm typecheck
```

## Notes

- Always run checks before committing
- Use `--fix` flag to auto-fix simple issues
- Build errors are critical - fix immediately
- Type errors may not prevent build but should be fixed
