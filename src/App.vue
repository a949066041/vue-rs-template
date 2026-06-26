<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import LangSwitch from '~/components/LangSwitch.vue'
import ThemeMode from '~/components/ThemeMode.vue'

const { t } = useI18n()
const route = useRoute()

const sidebarOpen = ref(false)

// 移动端切换路由后自动关闭抽屉
watch(() => route.fullPath, () => {
  sidebarOpen.value = false
})

const navRoutes = computed(() => [
  { path: '/', title: t('nav.home'), icon: 'icon-[line-md--home]' },
  { path: '/store', title: t('nav.store'), icon: 'icon-[octicon--cache-24]' },
  { path: '/user', title: t('nav.vueQuery'), icon: 'icon-[logos--vue]' },
  { path: '/query', title: t('nav.piniaQuery'), icon: 'icon-[logos--pinia]' },
  { path: '/n', title: t('nav.dynamic'), icon: 'icon-[material-symbols--dynamic-feed]' },
  { path: '/auth', title: t('nav.auth'), icon: 'icon-[material-symbols--lock-outline]' },
  { path: '/nesting', title: t('nav.nesting'), icon: 'icon-[ant-design--layout-outlined]' },
  { path: '/i18n', title: t('nav.i18n'), icon: 'icon-[material-symbols--language]' },
  { path: '/404', title: t('nav.notFound'), icon: 'icon-[tabler--error-404]' },
  { path: '/event/326?test=ps', title: t('nav.event'), icon: 'icon-[material-symbols--bolt-outline]' },
  { path: '/about', title: t('nav.about'), icon: 'icon-[ix--about]' },
])
</script>

<template>
  <div class="h-screen flex bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
    <!-- 移动端抽屉遮罩 -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 z-20 bg-black/40 md:hidden"
      @click="sidebarOpen = false"
    />

    <!-- 侧边栏：md 以上常驻，移动端为抽屉 -->
    <aside
      class="fixed inset-y-0 left-0 z-30 w-[200px] flex-none overflow-y-auto border-r border-gray-200 bg-white py-3 transition-transform duration-200 md:static md:translate-x-0 dark:border-gray-800 dark:bg-gray-900"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <ul class="space-y-1 px-2">
        <li v-for="item of navRoutes" :key="item.path">
          <RouterLink
            :to="item.path"
            class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            active-class="bg-blue-50 font-medium text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
          >
            <i :class="item.icon" />
            {{ item.title }}
          </RouterLink>
        </li>
      </ul>
    </aside>

    <div class="flex flex-1 flex-col overflow-hidden">
      <header class="flex flex-none items-center gap-2 border-b border-gray-200 px-3 py-2 sm:px-4 dark:border-gray-800">
        <button
          type="button"
          class="inline-flex size-8 items-center justify-center rounded-lg border border-gray-200 md:hidden dark:border-gray-800"
          aria-label="menu"
          @click="sidebarOpen = true"
        >
          <i class="icon-[material-symbols--menu]" />
        </button>
        <div class="flex flex-1 items-center justify-end gap-2">
          <LangSwitch />
          <ThemeMode />
        </div>
      </header>
      <main class="flex-1 overflow-auto p-3 sm:p-4">
        <RouterView />
      </main>
    </div>
    <VueQueryDevtools position="top" />
  </div>
</template>
