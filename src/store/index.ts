import { QueryClient } from '@tanstack/vue-query'

export * from './test.store'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
})
