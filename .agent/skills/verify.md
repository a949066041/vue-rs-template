---
description: Run typecheck and lint to verify code quality
---

# Verify

Run type checking and linting to verify the current code state.

## Steps

1. Run typecheck:
```bash
pnpm typecheck
```

2. Run lint:
```bash
pnpm lint
```

3. Report results:
   - If both pass: confirm code is clean
   - If typecheck fails: show errors and suggest fixes
   - If lint fails: run `pnpm lint:fix` to auto-fix, then report remaining issues

4. If there are errors, help fix them one by one
