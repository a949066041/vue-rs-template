<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute('/event/326')
</script>

<template>
  <div class="space-y-2">
    <h1 class="text-lg font-semibold">
      Event 326
    </h1>
    <p class="text-sm text-gray-500 dark:text-gray-400">
      query 参数：<code class="rounded bg-gray-100 px-1.5 py-0.5 dark:bg-gray-800">{{ JSON.stringify(route.query) }}</code>
    </p>
  </div>
</template>
