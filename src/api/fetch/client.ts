import { useLocalStorage } from '@vueuse/core'
import Request, { createFetchClient } from '@yy-web/request'
import { useTokenStore } from '~/store'

const client = createFetchClient({
  baseURL: '/api',
  interceptors: {
    request(config) {
      const { token } = useTokenStore()
      if (token.value) {
        return {
          ...config,
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        }
      }
      return config
    },
  },
})

const localStore = useLocalStorage<Record<string, unknown>>('app-request-store', {})

export default Request(client, {
  cancelRepeat: true,
  maxConcurrentNum: 10,
  getStore: (key: string) => {
    return localStore.value[key]
  },
  setStore: (key: string, value: unknown) => {
    localStore.value[key] = value
  },
  hasStore: (key: string) => {
    return localStore.value[key] !== undefined
  },
})
