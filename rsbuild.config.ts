import { defineConfig } from '@rsbuild/core'
import { pluginVue } from '@rsbuild/plugin-vue'
import { RspackVirtualModulePlugin } from 'rspack-plugin-virtual-module'
import { createRoutesContext } from 'unplugin-vue-router'
import { resolveOptions } from 'unplugin-vue-router/options'

export default defineConfig({
  plugins: [pluginVue()],
  source: {
    alias: {
      '~': './src',
    },
  },
  tools: {
    async rspack(config, ctx) {
      const { scanPages, generateRoutes } = createRoutesContext(resolveOptions({ }))

      await scanPages()

      if (ctx.isDev) {
        config.plugins?.push(new RspackVirtualModulePlugin({
          'vue-router/auto-routes': generateRoutes(),
        }))
      }
    },
  },
})
