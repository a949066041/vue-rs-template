<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { fetchUser } from '~/api'

const route = useRoute('/user/create.[id=int]')
const id = computed(() => Number(route.params.id))
const { data } = useQuery({
  queryKey: ['user-create', id],
  queryFn: () => fetchUser(id.value),
})
</script>

<template>
  <div>
    data：
    {{ JSON.stringify(data) }}
  </div>
</template>
