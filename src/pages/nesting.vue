<script lang="ts" setup>
const firstNestingList = [{ name: '/nesting/', title: 'nesting' }, { name: '/nesting/nesting2/test2', title: '第二层嵌套' }]
</script>

<template>
  <div class="p-2">
    <div class="border-b">第一层嵌套路由</div>
    <ul className="flex space-x-2">
      <RouterLink v-for=" item of firstNestingList" :key="item.name" :to="{ name: item.name }" active-class=" text-red-500">
        {{ item.title }}
      </RouterLink>
    </ul>
    <RouterView />
  </div>
</template>