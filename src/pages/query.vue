<script lang="ts" setup>
import { useQuery } from '@pinia/colada'
import { PiniaColadaDevtools } from '@pinia/colada-devtools'
import { fetchUserList } from '~/api'

const { data, isLoading } = useQuery({
  key: ['user-list'],
  query: fetchUserList,
})
</script>

<template>
  <div class=" overflow-hidden flex flex-col h-screen">
    <RouterLink :to="{ name: '/query/page' }">
      pager
    </RouterLink>
    <ul v-if="!isLoading" class="w-1/3 rounded-lg bg-green-300 px-2">
      <li v-for=" item of data?.users" :key="item.id">
        <RouterLink :to="{ name: '/query/[id]', params: { id: item.id } }">
          {{ `${item.firstName} ${item.lastName}` }} <span class="icon-[maki--arrow] ml-2" />
        </RouterLink>
      </li>
    </ul>
    <div v-else>
      loading...
    </div>
    <div class=" flex-1 overflow-auto">
      <RouterView />
    </div>
    <PiniaColadaDevtools />
  </div>
</template>
