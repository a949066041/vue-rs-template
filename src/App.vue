<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'

const routes = [
  { path: '/', title: '首页', icon: 'icon-[line-md--home]' },
  { path: '/store', title: 'pinia 缓存', icon: 'icon-[octicon--cache-24]' },
  { path: '/user', title: 'vue query', icon: 'icon-[logos--vue]' },
  { path: '/n', title: '动态路由', icon: 'icon-[material-symbols--dynamic-feed]' },
  { path: '/nesting/', title: '嵌套路由', icon: 'icon-[ant-design--layout-outlined]' },
  { path: '/404', title: 'not found page', icon: 'icon-[tabler--error-404]' },
  { path: '/about', title: '关于', icon: 'icon-[ix--about]' },
]
</script>

<template>
  <div className=" flex h-screen dark:bg-black/75 bg-white/85 dark:text-white">
    <ul className=" w-[200px] flex-none border-r-2 border-dashed border-blue-300 h-full">
      <li v-for="item of routes" :key="item.path" class="h-10 p-2 leading-10">
        <RouterLink :to="item.path" class="flex items-center" active-class=" text-red-400 font-bold">
          <i class="mr-2" :class="[item.icon]" />
          {{ item.title }}
        </RouterLink>
      </li>
    </ul>
    <div className="  flex-1 py-2 px-3">
      <header className=" text-right">
        <span className=" justify-end">
          <ThemeMode />
        </span>
      </header>
      <router-view />
    </div>
    <VueQueryDevtools />
  </div>
</template>
