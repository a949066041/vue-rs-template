<script lang="ts" setup>
import type { RouteLocationRaw } from 'vue-router'

const links: { title: string, to: RouteLocationRaw }[] = [
  { title: 'about 详情 (int 参数)', to: '/about/1' },
  { title: 'about name', to: '/about/name' },
  { title: 'about name 详情', to: { name: '/about/name/[name]', params: { name: 'test' } } },
  { title: 'about $value', to: { name: '/about/[value]/', params: { value: 'value' } } },
  { title: 'about $value create', to: { name: '/about/[value]/create', params: { value: 'value2' } } },
]
</script>

<template>
  <div class="space-y-4">
    <h1 class="text-lg font-semibold">
      关于 / 路由匹配示例
    </h1>
    <ul class="space-y-1">
      <li v-for="item of links" :key="item.title">
        <RouterLink
          :to="item.to"
          class="text-sm text-blue-500 hover:underline"
        >
          {{ item.title }}
        </RouterLink>
      </li>
    </ul>
  </div>
</template>
