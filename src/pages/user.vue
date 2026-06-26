<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query'
import { userListQueryOptions } from '~/api'

const { data, isLoading } = useQuery(userListQueryOptions)
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center gap-3">
      <h1 class="text-lg font-semibold">
        TanStack Vue Query
      </h1>
      <RouterLink
        :to="{ name: '/user/page' }"
        class="text-sm text-blue-500 hover:underline"
      >
        无限滚动示例 →
      </RouterLink>
    </div>

    <div class="flex flex-wrap gap-6">
      <ul v-if="!isLoading" class="w-full flex-none space-y-1 rounded-lg border border-gray-200 p-2 sm:w-60 dark:border-gray-800">
        <li v-for="item of data?.users" :key="item.id">
          <RouterLink
            :to="{ name: '/user/[id=int]', params: { id: item.id } }"
            class="flex items-center justify-between rounded-md px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
            active-class="bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
          >
            {{ `${item.firstName} ${item.lastName}` }}
            <i class="icon-[maki--arrow]" />
          </RouterLink>
        </li>
      </ul>
      <p v-else class="text-sm text-gray-500 dark:text-gray-400">
        loading...
      </p>

      <div class="flex-1">
        <RouterView />
      </div>
    </div>
  </div>
</template>
