import { addCustomTab } from '@vue/devtools-api'
import { h } from 'vue'
import CountState from '~/pages/store.vue'
import { useAuthStore, useCountStore } from '~/store'
import { setupFetch } from './fetch.setup'

function setupApp() {
  setupFetch()
  addCustomeDevtoolsTab()
}

setupApp()

function addCustomeDevtoolsTab() {
  const countStore = useCountStore()
  addCustomTab({
    name: 'plugin-count',
    title: 'Plugin Count',
    icon: 'baseline-exposure-plus-1',
    // SFC view
    view: {
      type: 'vnode',
      vnode: h('div', ['hello world', h('div', `1 ${countStore.count.value}`)]),
    },
    category: 'app',
  })
}
