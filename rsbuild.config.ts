import { defineConfig } from '@rsbuild/core'
import { pluginVue } from '@rsbuild/plugin-vue'
// @ts-expect-error ignore rspack vue router
import { rspack as VueRouter } from 'unplugin-vue-router'

export default defineConfig({
  plugins: [pluginVue()],
  source: {
    alias: {
      '~': './src',
    },
  },
  tools: {
    rspack: {
      plugins: [VueRouter()],
    },
  },
})
