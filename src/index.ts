import { PiniaColada } from '@pinia/colada'
import { VueQueryPlugin } from '@tanstack/vue-query'
import NProgress from 'nprogress'
import { createApp } from 'vue'
import { createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import { createFixedResolver, experimental_createRouter, normalizeRouteRecord } from 'vue-router/experimental'
import App from './App.vue'
import { authSetup } from './setup'
import { pinia, queryClient } from './store'
import './style/index.css'
import './style/nprogress.css'

NProgress.configure({ showSpinner: false })

function bootstrap() {
  const normalizedRoutes = routes.map(route => normalizeRouteRecord(route as any))
  const resolver = createFixedResolver(normalizedRoutes as any) as any
  const router = experimental_createRouter({
    history: createWebHistory(),
    resolver,
  }) as any

  router.beforeEach(() => {
    NProgress.start()
  })

  router.afterEach(() => {
    NProgress.done()
  })

  authSetup(router)

  const app = createApp(App)
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

  app.use(router)
  router.isReady().then(() => {
    app.mount('#root')
  })
}

bootstrap()
