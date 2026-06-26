import { defineConfig, loadEnv } from '@rsbuild/core'
import { pluginTailwindcss } from '@rsbuild/plugin-tailwindcss'
import { pluginVue } from '@rsbuild/plugin-vue'
// @ts-expect-error error rspack
import { rspack as VueRouter } from 'vue-router/unplugin'
import { appConfig } from './config'
import { version } from './package.json' with { type: 'json' }

const { publicVars } = loadEnv()

export default defineConfig({
  plugins: [
    pluginVue(),
    pluginTailwindcss(),
  ],
  source: {
    define: {
      APP_TITLE: JSON.stringify(appConfig.title),
      APP_VERSION: JSON.stringify(version),
      // vue-i18n 打包特性开关（移除告警 / 摇树未用代码）
      __VUE_I18N_FULL_INSTALL__: 'true',
      __VUE_I18N_LEGACY_API__: 'false',
      __INTLIFY_PROD_DEVTOOLS__: 'false',
      ...publicVars,
    },
  },
  html: {
    title: appConfig.title,
  },
  performance: {
    buildCache: true,
    removeConsole: true,
  },
  tools: {
    rspack: {
      plugins: [
        VueRouter({
          dts: 'src/route-map.d.ts',
          exclude: ['**/components/**/*'],
          paramsParser: {
            int: (value: string) => {
              const num = Number(value)
              if (Number.isNaN(num))
                return
              return num
            },
          },
        }),
      ],
    },
  },
})
