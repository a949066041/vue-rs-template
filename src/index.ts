import { VueQueryPlugin } from '@tanstack/vue-query'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

import App from './App.vue'

import './style/index.css'

function bootstrap() {
  console.log(routes)
  const router = createRouter({
    history: createWebHistory(),
    routes,
  })
  const app = createApp(App)
  const pinia = createPinia()

  app.use(VueQueryPlugin)
  app.use(router)
  app.use(pinia)
  app.mount('#root')
}

bootstrap()
