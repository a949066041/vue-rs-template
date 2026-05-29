import { PiniaColada } from '@pinia/colada'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { authSetup, setupFetch } from './setup'
import { pinia, queryClient } from './store'

export function bootstrap() {
  const app = createApp(App)

  // 注册 Pinia
  app.use(pinia)

  // 设置 fetch 拦截器
  setupFetch()

  // 设置路由守卫
  authSetup(router, app)

  // 注册 Pinia Colada
  app.use(PiniaColada, {
    queryOptions: {
      gcTime: 300_000,
    },
  })

  // 注册 Vue Query
  app.use(VueQueryPlugin, {
    queryClient,
    enableDevtoolsV6Plugin: import.meta.env.DEV,
  })

  // 注册路由
  app.use(router)

  // 等待路由准备就绪后挂载
  router.isReady().then(
    () => app.mount('#root'),
    (error) => {
      console.error('Router initialization failed:', error)
      // 即使路由初始化失败也尝试挂载应用
      app.mount('#root')
    },
  )
}
