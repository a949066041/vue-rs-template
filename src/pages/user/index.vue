<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query'
import { ref } from 'vue'

interface IUserEntity {
  id: number
  firstName: string
  lastName: string
}

const value = ref(1)

async function fetchUserAction(): Promise<{ users: IUserEntity[] }> {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const res = await fetch('https://dummyjson.com/users/')
      resolve(res.json())
      value.value++
    }, 3000)
  })
}

const { isLoading, data = { users: [] } } = useQuery({
  queryKey: ['fetchUser'],
  queryFn: fetchUserAction,
})
</script>

<template>
  <div>
    {{ value }}
    <RouterLink to="/">
      123
    </RouterLink>
    {{ isLoading && 'loading...' }}
    <ul>
      <li v-for="item of data?.users" :key="item.id">
        firstName: {{ item.firstName }} -- lastName: {{ item.lastName }}
      </li>
    </ul>
  </div>
</template>
