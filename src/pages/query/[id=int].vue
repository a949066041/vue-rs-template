<script lang="ts" setup>
import { useQuery } from '@pinia/colada'
import { useRoute } from 'vue-router'
import { userByIdQuery } from '~/api'

const route = useRoute('/query/[id=int]')
const { data, asyncStatus } = useQuery(() => userByIdQuery({ id: Number(route.params.id) }))
</script>

<template>
  <div>
    data：{{ asyncStatus }}
    {{ JSON.stringify(data) }}
  </div>
</template>
