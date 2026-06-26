<script setup lang="ts">
import { useQuery } from '@pinia/colada'
import { fetchUserList } from '~/api'

const { data, isLoading } = useQuery({
  key: ['query-page'],
  query: fetchUserList,
})
</script>

<template>
  <div class="space-y-3">
    <p v-if="isLoading" class="text-sm text-gray-500 dark:text-gray-400">
      loading...
    </p>
    <div v-else class="space-y-2">
      <p class="text-sm text-gray-500 dark:text-gray-400">
        当前列表 {{ data?.users?.length || 0 }} users
      </p>
      <ul class="space-y-1">
        <li
          v-for="user in data?.users || []"
          :key="user.id"
          class="rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-gray-800"
        >
          <span class="text-gray-400">#{{ user.id }}</span>
          {{ user.firstName }} {{ user.lastName }}
        </li>
      </ul>
    </div>
  </div>
</template>
