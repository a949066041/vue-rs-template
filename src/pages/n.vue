<script lang="ts" setup>
import type { RouteLocationRaw } from 'vue-router'

const routeLinks: { title: string, to: RouteLocationRaw }[] = [
  { title: '首页', to: { name: '/n', params: {} } },
  { title: '动态可选数组', to: { name: '/n/value-[[more]]+/', params: { more: ['more1', 'more2', 'more3'] } } },
  { title: '动态可选数组(空)', to: { name: '/n/value-[[more]]+/', params: {} } },
]
</script>

<template>
  <div class="space-y-4">
    <h1 class="text-lg font-semibold">
      动态路由
    </h1>
    <div class="flex flex-wrap gap-2">
      <RouterLink
        v-for="item of routeLinks"
        :key="item.title"
        :to="item.to"
        class="rounded-lg border border-gray-200 px-3 py-1 text-sm transition-colors hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-gray-800"
        active-class="border-blue-400 text-blue-600 dark:text-blue-400"
      >
        {{ item.title }}
      </RouterLink>
    </div>
    <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
      <RouterView />
    </div>
  </div>
</template>
