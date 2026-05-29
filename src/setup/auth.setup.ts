import type { App } from 'vue'
import type { Router } from 'vue-router'
import type { EXPERIMENTAL_Router } from 'vue-router/experimental'
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore, useTokenStore } from '~/store'

// 路由名称常量，基于文件路由约定
const AUTH_ROUTE_NAME = '/(auth)/page'
const LOGIN_ROUTE = '/auth'

export function authSetup(router: Router | EXPERIMENTAL_Router, app: App) {
  // 实验性 API：手动注册路由组件
  app.component('RouterLink', RouterLink)
  app.component('RouterView', RouterView)

  router.beforeEach(async (to) => {
    const { token } = useTokenStore()
    const { userInfo, infoUser } = useAuthStore()

    if (to.name === AUTH_ROUTE_NAME) {
      if (!token.value) {
        return LOGIN_ROUTE
      }
      if (!userInfo.value) {
        try {
          await infoUser()
        }
        catch {
          // 获取用户信息失败，跳转登录页
          return LOGIN_ROUTE
        }
      }
    }
  })
}
