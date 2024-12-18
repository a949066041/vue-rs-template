import { VueQueryPlugin } from '@tanstack/vue-query'
import { createPinia } from 'pinia'
import { DataLoaderPlugin } from 'unplugin-vue-router/data-loaders'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import { routes } from 'vue-router/auto-routes'
import App from './App.vue'
import { queryClient } from './store'
import './style/index.css'

function bootstrap() {
  const router = createRouter({
    history: createWebHistory(),
    routes: routes || [],
  })

  const app = createApp(App)
  const pinia = createPinia()

  app.use(VueQueryPlugin, {
    queryClient,
    enableDevtoolsV6Plugin: true,
  })

  app.use(DataLoaderPlugin, { router })
  app.use(router)
  app.use(pinia)
  app.mount('#root')
}

bootstrap()
