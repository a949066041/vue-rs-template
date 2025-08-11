import type { ILoginUserParams, LoginRes } from '~/api'
import { createGlobalState } from '@vueuse/core'
import { omit } from 'es-toolkit'
import { ref } from 'vue'
import { loginUser as loginUserAction, userMeQueryOptions } from '~/api'
import { queryClient } from '.'
import { useCacheStore } from './cache.store'

export const useAuthStore = createGlobalState(() => {
  const userInfo = ref<Omit<LoginRes, 'accessToken'>>(undefined!)
  const { setToken, removeToken } = useCacheStore()

  async function loginUser(params: ILoginUserParams) {
    const res = await loginUserAction(params)
    userInfo.value = omit(res, ['accessToken'])
    setToken(res.accessToken)
  }

  async function logoutUser() {
    userInfo.value = undefined!
    removeToken()
  }

  async function infoUser() {
    const data = await queryClient.ensureQueryData(userMeQueryOptions())
    userInfo.value = data
  }

  return {
    userInfo,
    loginUser,
    logoutUser,
    infoUser,
  }
})
