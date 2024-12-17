<script lang="ts" setup>
const routes = [
  { name: '/n/', title: '首页', params: {} },
  { name: '/n/value-[[more]]+/', title: '动态可选数组', params: { more: ["more1", "more2", 'more3'] } },
  { name: '/n/value-[[more]]+/', title: '动态可选数组(空)', params: {} },
]
</script>

<template>
  <div>
    root n
    <div class=" flex space-x-2">
      <RouterLink v-for=" item of routes" :key="item.title" :to="{ name: item.name, params: item.params }">{{ item.title }}</RouterLink>
    </div>
    <RouterView />
  </div>
</template>
