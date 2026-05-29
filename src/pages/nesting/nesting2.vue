<script lang="ts" setup>
const secondNestingList = [{ name: '/nesting/nesting2/test2' as const, title: '第二层嵌套-1' }, { name: '/nesting/nesting2/test3' as const, title: '第二层嵌套-2' }]
</script>

<template>
  <div>
    <ul class="flex space-x-2">
      <RouterLink v-for=" item of secondNestingList" :key="item.name" :to="{ name: item.name }" active-class=" text-red-500">
        {{ item.title }}
      </RouterLink>
    </ul>
    <RouterView />
  </div>
</template>
