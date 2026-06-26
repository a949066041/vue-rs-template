<script setup lang="ts">
import { useMutation } from '@pinia/colada'
import { fetchUser } from '~/api'

const { mutateAsync, data, asyncStatus } = useMutation({
  key: ['user-action'],
  mutation: fetchUser,
})
</script>

<template>
  <div class="space-y-3">
    <button
      type="button"
      class="rounded-lg border border-blue-400 px-4 py-1 text-sm text-blue-500 transition-colors hover:bg-blue-50 disabled:opacity-50 dark:hover:bg-blue-500/10"
      :disabled="asyncStatus === 'loading'"
      @click="mutateAsync(1)"
    >
      {{ asyncStatus === 'loading' ? '请求中...' : '获取用户 #1' }}
    </button>
    <pre v-if="data" class="overflow-auto rounded-lg border border-gray-200 p-3 text-xs dark:border-gray-800">{{ data }}</pre>
  </div>
</template>
