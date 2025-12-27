import vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
import { version } from './package.json' with { type: 'json' }

const APP_TITLE = 'template vue vite'

export default defineConfig({
  plugins: [
    vue(),
    VueRouter(),
  ],
  define: {
    APP_TITLE: JSON.stringify(APP_TITLE),
    APP_VERSION: JSON.stringify(version),
  },
  resolve: {
    alias: {
      '~': '/src',
      '~~': '/',
    },
  },
})
