import { createWebHistory } from 'vue-router'
import { handleHotUpdate, resolver } from 'vue-router/auto-resolver'
import { experimental_createRouter as createRouter } from 'vue-router/experimental'

export const router = createRouter({
  history: createWebHistory(),
  resolver,
})

if (import.meta.webpackHot) {
  handleHotUpdate(router)
}
