import { VueQueryPlugin } from '@tanstack/vue-query'
import { DataLoaderPlugin } from 'unplugin-vue-router/data-loaders'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import { routes } from 'vue-router/auto-routes'
import App from './App.vue'
import { authSetup } from './setup'
import { queryClient } from './store'
import './style/index.css'

function bootstrap() {
  const router = createRouter({
    history: createWebHistory(),
    routes: routes || [],
  })

  authSetup(router)

  const app = createApp(App)

  app.use(VueQueryPlugin, {
    queryClient,
    enableDevtoolsV6Plugin: true,
  })

  app.use(DataLoaderPlugin, { router })
  app.use(router)
  router.isReady().then(() => {
    app.mount('#root')
  })
}

bootstrap()
