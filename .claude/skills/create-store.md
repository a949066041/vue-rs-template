---
name: create-store
description: Create state management store (Pinia or VueUse)
---

# Create Store

This skill helps you create a state management store using either Pinia or VueUse's createGlobalState.

## Usage

```
/create-store <store-name> [--type pinia|vueuse] [--with-actions]
```

## Examples

```
/create-store cart                     # Default: createGlobalState
/create-store user --type pinia        # Pinia store
/create-store settings --with-actions  # With action methods
```

## Option 1: VueUse createGlobalState (Recommended for simple state)

Best for: token storage, simple global state, localStorage persistence.

### Steps

1. **Create store file** (`src/store/<name>.ts`):

```typescript
import { createGlobalState, useLocalStorage } from '@vueuse/core'

export const use<Name>Store = createGlobalState(() => {
  // State (can use refs or useLocalStorage)
  const data = ref<DataType | null>(null)
  const token = useLocalStorage('<name>-token', '')
  const isLoading = ref(false)

  // Computed
  const isAuthenticated = computed(() => !!token.value)

  // Actions
  function setData(newData: DataType) {
    data.value = newData
  }

  function reset() {
    data.value = null
    token.value = ''
  }

  return {
    // State
    data,
    token,
    isLoading,
    // Computed
    isAuthenticated,
    // Actions
    setData,
    reset,
  }
})
```

### Example: Auth Store

```typescript
import { createGlobalState, useLocalStorage } from '@vueuse/core'
import { login as apiLogin, logout as apiLogout, getInfo } from '~/api/module/user.api'
import type { UserInfo } from '~/api/module/user.type'

export const useAuthStore = createGlobalState(() => {
  const token = useLocalStorage('token', '')
  const userInfo = ref<UserInfo | null>(null)
  const isLoading = ref(false)

  const isAuthenticated = computed(() => !!token.value)

  async function login(username: string, password: string) {
    isLoading.value = true
    try {
      const result = await apiLogin({ username, password })
      token.value = result.token
      return result
    }
    finally {
      isLoading.value = false
    }
  }

  async function fetchUserInfo() {
    if (!token.value) return
    isLoading.value = true
    try {
      userInfo.value = await getInfo()
    }
    finally {
      isLoading.value = false
    }
  }

  async function logout() {
    await apiLogout()
    token.value = ''
    userInfo.value = null
  }

  return {
    token,
    userInfo,
    isLoading,
    isAuthenticated,
    login,
    fetchUserInfo,
    logout,
  }
})
```

## Option 2: Pinia Store (Recommended for complex state)

Best for: complex state logic, devtools support, SSR.

### Steps

1. **Create store file** (`src/store/<name>.ts`):

```typescript
import { defineStore } from 'pinia'

interface <Name>State {
  items: Item[]
  selectedId: number | null
  filter: string
}

export const use<Name>Store = defineStore('<name>', {
  state: (): <Name>State => ({
    items: [],
    selectedId: null,
    filter: '',
  }),

  getters: {
    filteredItems: (state) => {
      if (!state.filter) return state.items
      return state.items.filter(item =>
        item.name.toLowerCase().includes(state.filter.toLowerCase())
      )
    },

    selectedItem: (state) => {
      return state.items.find(item => item.id === state.selectedId)
    },
  },

  actions: {
    async fetchItems() {
      // Call API and update state
      const response = await fetch('/api/items')
      this.items = await response.json()
    },

    selectItem(id: number) {
      this.selectedId = id
    },

    setFilter(filter: string) {
      this.filter = filter
    },
  },
})
```

### Setup Store Syntax (Alternative)

```typescript
import { defineStore } from 'pinia'

export const use<Name>Store = defineStore('<name>', () => {
  // State
  const items = ref<Item[]>([])
  const selectedId = ref<number | null>(null)
  const filter = ref('')

  // Getters
  const filteredItems = computed(() => {
    if (!filter.value) return items.value
    return items.value.filter(item =>
      item.name.toLowerCase().includes(filter.value.toLowerCase())
    )
  })

  const selectedItem = computed(() => {
    return items.value.find(item => item.id === selectedId.value)
  })

  // Actions
  async function fetchItems() {
    const response = await fetch('/api/items')
    items.value = await response.json()
  }

  function selectItem(id: number) {
    selectedId.value = id
  }

  return {
    items,
    selectedId,
    filter,
    filteredItems,
    selectedItem,
    fetchItems,
    selectItem,
  }
})
```

## File Structure

```
src/store/
├── auth.ts      # Authentication (createGlobalState)
├── cache.ts     # Token/cache (createGlobalState + useLocalStorage)
├── count.ts     # Simple counter (createGlobalState)
└── <name>.ts    # Your new store
```

## When to Use Which

| Use Case | Recommended |
|----------|-------------|
| Simple global state | `createGlobalState` |
| localStorage persistence | `createGlobalState` + `useLocalStorage` |
| Complex state logic | Pinia `defineStore` |
| Need devtools | Pinia |
| SSR support | Pinia |

## Notes

- Import from `~/store/<name>` in components
- `createGlobalState` is simpler but less feature-rich
- Pinia provides better devtools integration
- Both approaches work with Vue 3 Composition API
