import type { LoginRes, UserLoginParams } from '~/api'
import { createGlobalState } from '@vueuse/core'
import { omit } from 'es-toolkit'
import { ref } from 'vue'
import { loginUser as loginUserApi, userMeQueryOptions } from '~/api'
import { queryClient } from '.'
import { useTokenStore } from './token.store'

export const useAuthStore = createGlobalState(() => {
  const userInfo = ref<Omit<LoginRes, 'accessToken'> | null>(null)
  const { setToken, removeToken } = useTokenStore()

  async function loginUser(params: UserLoginParams) {
    const res = await loginUserApi(params)
    userInfo.value = omit(res, ['accessToken'])
    setToken(res.accessToken)
  }

  async function logoutUser() {
    userInfo.value = null
    removeToken()
    // 清除查询缓存，防止注销后返回前用户数据
    queryClient.clear()
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
