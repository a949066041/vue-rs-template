---
description: Create a new global store using createGlobalState
---

# New Store

Create a new global store in `src/store/` using `createGlobalState` from VueUse.

## Arguments
- `$ARGUMENTS` — Store name (e.g., `theme`, `notification`, `cart`)

## Steps

1. Create store file `src/store/<name>.store.ts`:
```ts
import { createGlobalState } from '@vueuse/core'

export const use<Name>Store = createGlobalState(() => {
  // State
  const state = ref<Type>(initialValue)

  // Actions
  function doSomething() {
    // implementation
  }

  return { state, doSomething }
})
```

2. Re-export from `src/store/index.ts`:
```ts
export * from './<name>.store'
```

3. Run `pnpm typecheck` to verify

## Notes
- Use `ref()` for reactive state
- Use `useLocalStorage` for persisted state
- Access other stores via their composable: `const { token } = useTokenStore()`
- Do NOT use Pinia's `defineStore`
