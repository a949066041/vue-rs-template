import { createWebHistory } from 'vue-router'
import { handleHotUpdate, resolver } from 'vue-router/auto-resolver'
import { experimental_createRouter as createRouter } from 'vue-router/experimental'

// 使用实验性 API 支持文件系统路由自动解析
export const router = createRouter({
  history: createWebHistory(),
  resolver,
})

// Vite HMR 支持
if (import.meta.webpackHot) {
  handleHotUpdate(router)
}
