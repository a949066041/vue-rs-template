import { defineConfig } from '@rsbuild/core'
import { pluginVue } from '@rsbuild/plugin-vue'
import rspackPluginVueRouter from 'unplugin-vue-router'

export default defineConfig({
  plugins: [pluginVue()],
  source: {
    alias: {
      '~': './src',
    },
  },
  tools: {
    rspack(config) {
      config.plugins?.push(
        rspackPluginVueRouter.rspack(),
      )
    },
  },
})
