<script lang="ts" setup>
const firstNestingList = [
  { name: '/nesting/' as const, title: 'nesting' },
  { name: '/nesting/nesting2/test2' as const, title: '第二层嵌套' },
]
</script>

<template>
  <div class="space-y-4">
    <h1 class="text-lg font-semibold">
      嵌套路由
    </h1>
    <div class="space-y-3 rounded-lg border border-gray-200 p-4 dark:border-gray-800">
      <p class="text-xs text-gray-400">
        第一层
      </p>
      <div class="flex flex-wrap gap-2">
        <RouterLink
          v-for="item of firstNestingList"
          :key="item.name"
          :to="item.name"
          class="rounded-lg border border-gray-200 px-3 py-1 text-sm transition-colors hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-gray-800"
          active-class="border-blue-400 text-blue-600 dark:text-blue-400"
        >
          {{ item.title }}
        </RouterLink>
      </div>
      <RouterView />
    </div>
  </div>
</template>
