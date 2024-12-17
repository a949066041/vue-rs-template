<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query'
import { userQueryListOptions } from '~/api'

const { data, isLoading } = useQuery(userQueryListOptions)
</script>

<template>
  <div class="space-x-3">
    <ul v-if="!isLoading" class="w-1/3 rounded-lg bg-green-300 px-2">
      <li v-for=" item of data?.users" :key="item.id" @click="$router.push({ name: '/user/[id]' })">
        <RouterLink :to="{ name: '/user/[id]', params: { id: item.id } }">
          {{ `${item.firstName} ${item.lastName}` }} <span class="icon-[maki--arrow] ml-2" />
        </RouterLink>
      </li>
    </ul>
    <template v-else>
      loading...
    </template>
    <RouterView />
  </div>
</template>
