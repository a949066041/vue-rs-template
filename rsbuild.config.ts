import { defineConfig, loadEnv } from '@rsbuild/core'
import { pluginMdx } from '@rsbuild/plugin-mdx'
import { pluginVue } from '@rsbuild/plugin-vue'
// @ts-expect-error error rspack
import { rspack as VueRouter } from 'vue-router/unplugin'
import { version } from './package.json' with { type: 'json' }
import { pluginDemoMdOptions } from './scripts/remark'

const APP_TITLE = 'template vue rs'

const { publicVars } = loadEnv()

export default defineConfig({
  plugins: [
    pluginVue(),
    pluginMdx(pluginDemoMdOptions),
  ],
  source: {
    define: {
      APP_TITLE: JSON.stringify(APP_TITLE),
      APP_VERSION: JSON.stringify(version),
      ...publicVars,
    },
  },
  html: {
    title: APP_TITLE,
    tags: [
      {
        tag: 'script',
        attrs: {
          src: 'https://cdn.evgnet.com/beacon/q5568l55556tzib3w3n3n3d089563846/test/scripts/evergage.min.js',
        },
      },
    ],
  },
  performance: {
    buildCache: false,
    removeConsole: false,
  },
  tools: {
    rspack: {
      plugins: [
        VueRouter({
          dts: 'src/route-map.d.ts',
          exclude: ['**/components/**/*'],
        }),
      ],
    },
  },
})
