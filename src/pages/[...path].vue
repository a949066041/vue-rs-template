<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute('/[...path]')
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-3 py-16 text-center">
    <i class="icon-[tabler--error-404] text-6xl text-gray-300 dark:text-gray-700" />
    <p class="text-sm text-gray-500 dark:text-gray-400">
      页面不存在：<code class="rounded bg-gray-100 px-1.5 py-0.5 dark:bg-gray-800">/{{ route.params.path }}</code>
    </p>
    <RouterLink to="/" class="text-sm text-blue-500 hover:underline">
      返回首页
    </RouterLink>
  </div>
</template>
