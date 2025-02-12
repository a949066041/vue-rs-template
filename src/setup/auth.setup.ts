import type { Router } from 'vue-router'
import { useAuthStore, useCacheStore } from '~/store'

export function authSetup(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const { token } = useCacheStore()
    const { userInfo, infoUser } = useAuthStore()
    if (to.name === '/(auth)/page') {
      if (!token.value) {
        next({ name: '/auth' })
        return
      }
      if (!userInfo.value) {
        await infoUser()
      }
      next()
      return
    }
    next()
  })
}
