<script lang="ts" setup>
const secondNestingList = [
  { name: '/nesting/nesting2/test2' as const, title: '第二层嵌套-1' },
  { name: '/nesting/nesting2/test3' as const, title: '第二层嵌套-2' },
]
</script>

<template>
  <div class="mt-3 space-y-3 border-t border-gray-200 pt-3 dark:border-gray-800">
    <p class="text-xs text-gray-400">
      第二层
    </p>
    <div class="flex flex-wrap gap-2">
      <RouterLink
        v-for="item of secondNestingList"
        :key="item.name"
        :to="{ name: item.name }"
        class="rounded-lg border border-gray-200 px-3 py-1 text-sm transition-colors hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-gray-800"
        active-class="border-blue-400 text-blue-600 dark:text-blue-400"
      >
        {{ item.title }}
      </RouterLink>
    </div>
    <RouterView />
  </div>
</template>
