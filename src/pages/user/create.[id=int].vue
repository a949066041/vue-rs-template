<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query'
import { useRoute } from 'vue-router'
import { fetchUser } from '~/api'

const route = useRoute('/user/create.[id=int]')
const { data } = useQuery({
  queryKey: ['user-list', () => route.params.id],
  queryFn: () => fetchUser(Number(route.params.id)),
})
</script>

<template>
  <div>
    data：
    {{ JSON.stringify(data) }}
  </div>
</template>
