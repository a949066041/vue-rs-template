<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute('/about/name/[name]')
</script>

<template>
  <div class="text-sm">
    <span class="text-gray-500 dark:text-gray-400">about name：</span>
    <code class="rounded bg-gray-100 px-1.5 py-0.5 dark:bg-gray-800">{{ route.params.name }}</code>
  </div>
</template>
