<script lang="ts" setup>
<<<<<<< HEAD
import type { RouteLocationRaw } from 'vue-router'

const routeLinks: { title: string, to: RouteLocationRaw }[] = [
  { title: '首页', to: { name: '/n', params: {} } },
  { title: '动态可选数组', to: { name: '/n/value-[[more]]+/', params: { more: ['more1', 'more2', 'more3'] } } },
  { title: '动态可选数组(空)', to: { name: '/n/value-[[more]]+/', params: {} } },
=======
const routes = [
  { name: '/n' as const, title: '首页', params: {} },
  { name: '/n/value-[[more]]+/' as const, title: '动态可选数组', params: { more: ['more1', 'more2', 'more3'] } },
  { name: '/n/value-[[more]]+/' as const, title: '动态可选数组(空)', params: {} },
>>>>>>> 41bccda4c28974293d667d7e695d44bb6aba2559
]
</script>

<template>
  <div>
    root n
    <div class=" flex space-x-2">
      <RouterLink v-for="item of routeLinks" :key="item.title" :to="item.to">
        {{ item.title }}
      </RouterLink>
    </div>
    <RouterView />
  </div>
</template>
