<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query'
import { useRoute } from 'vue-router'

const route = useRoute('/user/[id]')

async function getUserById(id: string) {
  const res = await fetch(`https://dummyjson.com/users/${id}`)
  return res.json()
}

const { isLoading, data } = useQuery({
  queryKey: ['queryUser', route.params.id],
  queryFn: () => getUserById(route.params.id),
})
</script>

<template>
  <div @click="$router.go(-1)">
    <div v-if="isLoading">
      loading...
    </div>
    <div v-else>
      user id page{{ JSON.stringify(data) }}
    </div>
  </div>
</template>
