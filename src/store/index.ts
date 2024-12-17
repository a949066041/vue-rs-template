import { QueryClient } from '@tanstack/vue-query'

export * from './count.store'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
})
