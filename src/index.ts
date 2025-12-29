import { PiniaColada } from '@pinia/colada'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { createRouter, RouterProvider } from '@tanstack/vue-router'
import { createApp, h } from 'vue'
import { routeTree } from './routeTree.gen'
import { pinia, queryClient } from './store'
import './style/index.css'

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultStaleTime: 5000,
  scrollRestoration: true,
})

// Register things for typesafety
declare module '@tanstack/vue-router' {
  interface Register {
    router: typeof router
  }
}

function bootstrap() {
  const app = createApp({
    setup() {
      return () => h(RouterProvider, { router })
    },
  })

  app.use(pinia)
  app.use(PiniaColada, {
    queryOptions: {
      gcTime: 300_000,
    },
  })

  app.use(VueQueryPlugin, {
    queryClient,
    enableDevtoolsV6Plugin: true,
  })

  app.mount('#root')
}

bootstrap()
