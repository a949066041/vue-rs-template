<script lang="ts" setup>
import { useQuery } from '@pinia/colada'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { documentByIdQuery } from '~/api'

const route = useRoute('/query/[id]')
const paramsId = computed(() => +route.params.id)
const { data, asyncStatus } = useQuery(documentByIdQuery, () => ({ id: paramsId.value }))
</script>

<template>
  <div>
    data：{{ asyncStatus }}
    {{ JSON.stringify(data) }}
  </div>
</template>
