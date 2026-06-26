<script lang="ts" setup>
import { useQuery } from '@pinia/colada'
import { useRoute } from 'vue-router'
import { userByIdQuery } from '~/api'

const route = useRoute('/query/[id=int]')
const { data, asyncStatus } = useQuery(() => userByIdQuery({ id: Number(route.params.id) }))
</script>

<template>
  <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
    <p class="mb-2 text-xs text-gray-400">
      status: {{ asyncStatus }}
    </p>
    <dl v-if="data" class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
      <dt class="text-gray-500 dark:text-gray-400">
        id
      </dt>
      <dd>{{ data.id }}</dd>
      <dt class="text-gray-500 dark:text-gray-400">
        name
      </dt>
      <dd>{{ data.firstName }} {{ data.lastName }}</dd>
      <dt class="text-gray-500 dark:text-gray-400">
        email
      </dt>
      <dd>{{ data.email }}</dd>
    </dl>
  </div>
</template>
