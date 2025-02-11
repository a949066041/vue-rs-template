import { defineConfig } from '@rsbuild/core'
import { pluginVue } from '@rsbuild/plugin-vue'
import RspackVueRouterPlugin from './vue-router-rspack'

export default defineConfig({
  plugins: [pluginVue()],
  source: {
    alias: {
      '~': './src',
    },
  },
  tools: {
    rspack: {
      plugins: [new RspackVueRouterPlugin()],
    },
  },
})
