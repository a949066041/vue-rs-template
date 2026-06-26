<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute('/n/value-[[more]]+/')
</script>

<template>
  <div class="text-sm">
    <span class="text-gray-500 dark:text-gray-400">params.more：</span>
    <code class="rounded bg-gray-100 px-1.5 py-0.5 dark:bg-gray-800">{{ route.params.more ?? '(空)' }}</code>
  </div>
</template>
