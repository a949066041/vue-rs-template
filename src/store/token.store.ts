import { createGlobalState, useLocalStorage } from '@vueuse/core'

export const useTokenStore = createGlobalState(() => {
  const tokenState = useLocalStorage('app-token', '')

  function setToken(token: string) {
    tokenState.value = token
  }

  function removeToken() {
    tokenState.value = ''
  }

  return {
    token: tokenState,
    setToken,
    removeToken,
  }
})
