<script setup lang="ts">
import { useQuery } from '@pinia/colada'
import { fetchUserList } from '~/api'

const { data, isLoading } = useQuery({
  key: ['query-page'],
  query: fetchUserList,
})
</script>

<template>
  <div class="flex flex-col overflow-hidden h-[80%]">
    <p v-if="isLoading">
      loading...
    </p>
    <div v-else class="flex-1 overflow-auto">
      <p>当前列表 {{ data?.users?.length || 0 }} users</p>
      <blockquote v-for="user in data?.users || []" :key="user.id">
        {{ user.id }} - {{ user.firstName }} {{ user.lastName }}
      </blockquote>
    </div>
  </div>
</template>
