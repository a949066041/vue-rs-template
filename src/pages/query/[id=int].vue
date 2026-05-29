<script lang="ts" setup>
import { useQuery } from '@pinia/colada'
import { useRoute } from 'vue-router'
import { documentByIdQuery } from '~/api'

const route = useRoute('/query/[id=int]')
const { data, asyncStatus } = useQuery(() => documentByIdQuery({ id: route.params.id }))
</script>

<template>
  <div>
    data：{{ asyncStatus }}
    {{ JSON.stringify(data) }}
  </div>
</template>
