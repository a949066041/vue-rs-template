<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
</script>

<template>
  <VueQueryDevtools />
  <div class="flex flex-wrap space-x-3xl">
    <RouterLink to="/">
      Home
    </RouterLink>
    <RouterLink to="/user">
      user
    </RouterLink>
    <RouterLink :to="{ name: '/user/create.[id]', params: { id: 2 } }">
      user create
    </RouterLink>
    <RouterLink to="/about">
      about
    </RouterLink>
    <RouterLink :to="{ name: '/test-[aId]', params: { aId: '123' } }">
      test user Id -> 123
    </RouterLink>
    <RouterLink :to="{ name: '/test-[...arr]', params: { arr: 1333 } }">
      test user arr
    </RouterLink>
    <RouterLink :to="{ name: '/articles/', params: { arr: 1333 } }">
      articles
    </RouterLink>
    <RouterLink :to="{ name: '/articles/[id]', params: { id: 1 } }">
      articles 1
    </RouterLink>
    <RouterLink :to="{ name: '/articles/[id]+', params: { id: [1, 3, 4, '5'] } }">
      articles arr
    </RouterLink>
    <RouterLink :to="{ name: '/n-[[n]]/', params: { n: 1 } }">
      /n-[[n]]/
    </RouterLink>
    <RouterLink :to="{ name: '/n-[[n]]/[[more]]+/', params: { n: 1, more: [1, 2, 3] } }">
      /n-[[n]]/[[more]]+/
    </RouterLink>
    <RouterLink :to="{ name: '/n-[[n]]/[[more]]+/[final]', params: { final: 'test' } }">
      /n-[[n]]/[[more]]+/[final]
    </RouterLink>
  </div>
  <router-view />
</template>
