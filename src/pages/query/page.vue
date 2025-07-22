<script setup lang="ts">
import type { IUserEntity } from '~/api'
import { useInfiniteQuery } from '@pinia/colada'
import { onWatcherCleanup, useTemplateRef, watch } from 'vue'
import { fetchUserPager } from '~/api'

const loadMoreEl = useTemplateRef('load-more')

const {
  state: userList,
  loadMore,
  asyncStatus,
} = useInfiniteQuery({
  key: ['user-page'],
  query: async ({ nextPage }) => nextPage !== null ? fetchUserPager({ pageParam: nextPage || 0 }) : null,
  initialPage: {
    data: new Set<IUserEntity>(),
    nextPage: 1 as number | null,
  },
  merge(pages, newUser) {
    if (!newUser)
      return pages
    const data = new Set([...pages.data, ...newUser.users.map(d => d)])
    return {
      data,
      nextPage: data.size >= newUser.total ? null : (pages.nextPage! + 1),
    }
  },
})

watch(loadMoreEl, (el) => {
  if (el) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          loadMore()
        }
      },
      {
        rootMargin: '300px',
        threshold: [0],
      },
    )
    observer.observe(el)
    onWatcherCleanup(() => {
      observer.disconnect()
    })
  }
})
</script>

<template>
  <div class="flex flex-col overflow-hidden h-[80%]">
    <button :disabled="asyncStatus === 'loading'" @click="loadMore()">
      Load more (or scroll down)
    </button>
    <div class=" flex-1 overflow-auto">
      <template v-if="userList?.data">
        <p>加载了数组 {{ userList.data.data.size }} users</p>

        <blockquote v-for="(user, index) in userList.data.data" :key="index">
          {{ user.id }}
        </blockquote>
      </template>
      <p v-if="userList.data.nextPage" ref="load-more" class=" cursor-pointer">
        加载更多
      </p>
    </div>
  </div>
</template>
