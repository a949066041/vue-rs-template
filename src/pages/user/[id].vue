<script lang="ts">
import { defineBasicLoader } from 'unplugin-vue-router/data-loaders/basic'

async function getUserById(id: string) {
  const res = await fetch(`https://dummyjson.com/users/${id}`)
  return res.json()
}

const useUserData = defineBasicLoader(
  (to, { signal }) => {
    console.log(to, signal)
    return getUserById('1')
  },
  {
    // used for SSR only
    key: 'user-data',
  },
)
</script>

<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute('/user/[id]')

const data = useUserData()
</script>

<template>
  <div>user id page{{ route.params.id }}</div>
</template>
