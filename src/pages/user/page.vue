<script setup lang="ts">
import { useInfiniteQuery } from '@tanstack/vue-query'
import { computed } from 'vue'
import { fetchUserPager } from '~/api'

const {
  status,
  data,
  error,
  isFetching,
  isFetchingNextPage,
  isFetchingPreviousPage,
  fetchNextPage,
  fetchPreviousPage,
  hasNextPage,
  hasPreviousPage,
} = useInfiniteQuery({
  queryKey: ['user-page'],
  queryFn: async (data) => {
    const response = await fetchUserPager({ pageParam: data.pageParam })
    return response
  },
  initialPageParam: 1,
  getNextPageParam: (lastPage, allPages, lastPageParam) => {
    return allPages.map(item => item.users.flat()).flat().length >= lastPage.total ? undefined : (lastPageParam! + 1)
  },
})

const renderData = computed(() => {
  return data.value?.pages.map(item => item.users).flat()
})
</script>

<template>
  <div class="flex flex-col h-[400px] overflow-hidden">
    <h1>Infinite Loading</h1>
    <p v-if="status === 'pending'">
      loading...
    </p>
    <p v-else-if="status === 'error'">
      {{ error?.message }}
    </p>
    <div v-else class=" flex-1 overflow-auto">
      <button type="button" :disabled="!hasPreviousPage || isFetchingPreviousPage" @click="() => fetchPreviousPage()">
        {{ isFetchingPreviousPage
          ? 'Loading more...'
          : hasPreviousPage
            ? 'Load Older'
            : 'Nothing more to load' }}
      </button>
      <ul>
        <li v-for="item of renderData" :key="item.id" :style="{ background: `hsla(${item.id * 30}, 60%, 80%, 1)` }">
          {{ item.id }}
        </li>
        <li @click="() => fetchNextPage()">
          {{ isFetchingNextPage ? 'Loading more...' : (hasNextPage ? 'next' : 'last') }}
        </li>
      </ul>
      <div>
        {{ isFetching && !isFetchingNextPage
          ? 'Background Updating...'
          : null }}
      </div>
    </div>
  </div>
</template>
