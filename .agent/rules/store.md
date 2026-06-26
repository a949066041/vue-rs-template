# Store Rules

## Global State Pattern
- Use `createGlobalState` from `@vueuse/core` — NOT Pinia's `defineStore`
- Pinia is installed only because `@pinia/colada` requires it
- Composable naming: `use<Name>Store()` (e.g., `useAuthStore`, `useTokenStore`)

## File Structure
- One store per file in `src/store/`
- File naming: `<name>.store.ts`
- Re-export all stores from `src/store/index.ts`

## Store Template
```ts
import { createGlobalState } from '@vueuse/core'
import { ref } from 'vue'

export const useExampleStore = createGlobalState(() => {
  // State with ref()
  const count = ref(0)

  // Actions as plain functions
  function increment() {
    count.value++
  }

  return { count, increment }
})
```

## Conventions
- Use `ref()` for reactive state
- Use `useLocalStorage` from VueUse for persisted state
- Return an object with state refs and action functions
- Keep stores focused — one responsibility per store
- Access other stores by calling their composable: `const { token } = useTokenStore()`
