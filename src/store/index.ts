import { QueryClient } from '@tanstack/vue-query'

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
