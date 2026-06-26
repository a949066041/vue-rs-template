<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { userQueryOptions } from '~/api'

const route = useRoute('/user/[id=int]')
const id = computed(() => Number(route.params.id))
const { data, isLoading } = useQuery(userQueryOptions(id))
</script>

<template>
  <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
    <p v-if="isLoading" class="text-sm text-gray-500 dark:text-gray-400">
      loading...
    </p>
    <dl v-else-if="data" class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
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
