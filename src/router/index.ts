import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

// ponytail: rspack 自带 full-reload，handleHotUpdate 在启动时触发 route 替换导致首次点击失效
// 如需保持 HMR 状态保留，用 import.meta.webpackHot?.accept() 替代
