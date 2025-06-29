import { defineConfig } from '@rsbuild/core'
import { pluginMdx } from '@rsbuild/plugin-mdx'
import { pluginVue } from '@rsbuild/plugin-vue'
import { version } from './package.json' with { type: 'json' }
import { pluginDemoMdOptions } from './scripts/remark'
import RspackVueRouterPlugin from './vue-router-rspack'

const APP_TITLE = 'template vue rs'

export default defineConfig({
  plugins: [
    pluginVue(),
    pluginMdx(pluginDemoMdOptions),
  ],
  source: {
    define: {
      APP_TITLE: JSON.stringify(APP_TITLE),
      APP_VERSION: JSON.stringify(version),
    },
  },
  html: {
    favicon: './src/assets/icon/app-icon.png',
    title: APP_TITLE,
  },
  performance: {
    buildCache: process.env.NODE_ENV === 'development',
  },
  tools: {
    rspack: {
      plugins: [new RspackVueRouterPlugin()],
    },
  },
})
