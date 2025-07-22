import { QueryClient } from '@tanstack/vue-query'

import { createPinia } from 'pinia'

export const pinia = createPinia()

export * from './auth.store'
export * from './cache.store'
export * from './count.store'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
})
