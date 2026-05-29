import { PiniaColada } from '@pinia/colada'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { authSetup } from './setup'
import { pinia, queryClient } from './store'

export function bootstrap() {
  const app = createApp(App)
  app.use(pinia)

  authSetup(router, app)

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
