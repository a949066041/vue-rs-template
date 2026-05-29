import type { App } from 'vue'
import type { Router } from 'vue-router'
import type { EXPERIMENTAL_Router } from 'vue-router/experimental'
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore, useCacheStore } from '~/store'

export function authSetup(router: Router | EXPERIMENTAL_Router, app: App) {
  /* experimental start  */
  app.component('RouterLink', RouterLink)
  app.component('RouterView', RouterView)
  /* experimental  */

  router.beforeEach(async (to) => {
    const { token } = useCacheStore()
    const { userInfo, infoUser } = useAuthStore()
    if (to.name === '/(auth)/page') {
      if (!token.value) {
        return '/auth'
      }
      if (!userInfo.value) {
        await infoUser()
      }
    }
  })
}
