<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { fetchUser } from '~/api'

const route = useRoute()
const paramsId = computed(() => +route.params.id)
const { data } = useQuery({
  queryKey: ['user-list', paramsId],
  queryFn: () => fetchUser(paramsId.value),
})
</script>

<template>
  <div>
    data：
    {{ JSON.stringify(data) }}
  </div>
</template>
