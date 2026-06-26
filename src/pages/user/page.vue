<script setup lang="ts">
import { useInfiniteQuery } from '@tanstack/vue-query'
import { userPagerQueryOptions } from '~/api'

const {
  status,
  data,
  error,
  isFetching,
  isFetchingNextPage,
  fetchNextPage,
  hasNextPage,
} = useInfiniteQuery(userPagerQueryOptions)
</script>

<template>
  <div class="space-y-3">
    <h1 class="text-lg font-semibold">
      无限滚动加载
    </h1>
    <p v-if="status === 'pending'" class="text-sm text-gray-500 dark:text-gray-400">
      loading...
    </p>
    <p v-else-if="status === 'error'" class="text-sm text-red-500">
      {{ error?.message }}
    </p>
    <div v-else class="space-y-3">
      <ul class="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        <li
          v-for="item of data?.pages"
          :key="item.id"
          class="rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-gray-800"
        >
          <span class="text-gray-400">#{{ item.id }}</span>
          {{ item.firstName }} {{ item.lastName }}
        </li>
      </ul>
      <button
        type="button"
        class="rounded-lg border border-blue-400 px-4 py-1 text-sm text-blue-500 transition-colors hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-blue-500/10"
        :disabled="!hasNextPage || isFetchingNextPage"
        @click="() => fetchNextPage()"
      >
        {{ isFetchingNextPage ? '加载中...' : (hasNextPage ? '加载更多' : '没有更多了') }}
      </button>
      <p v-if="isFetching && !isFetchingNextPage" class="text-xs text-gray-400">
        Background Updating...
      </p>
    </div>
  </div>
</template>
