import { watchEffect } from 'vue'
import { useAuthStore, useCacheStore, useCountStore } from '~/store'
import { setupFetch } from './fetch.setup'

export * from './auth.setup'

function setupApp() {
  setupFetch()
  addCustomeDevtoolsTab()
}

setupApp()

function addCustomeDevtoolsTab() {
  const countStore = useCountStore()
  const authStore = useAuthStore()
  const cacheStore = useCacheStore()

  watchEffect(() => {
    Object.entries(countStore).forEach(([key, value]) => {
      if (typeof value !== 'function') {
        console.warn('count', key, value.value)
      }
    })
    Object.entries(authStore).forEach(([key, value]) => {
      if (typeof value !== 'function') {
        console.warn('auth', key, value.value)
      }
    })

    Object.entries(cacheStore).forEach(([key, value]) => {
      if (typeof value !== 'function') {
        console.warn('cache', key, value.value)
      }
    })
  })
}
