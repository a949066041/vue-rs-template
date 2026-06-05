<script lang="ts" setup>
<<<<<<< HEAD
const secondNestingList = [{ name: '/nesting/nesting2/test2', title: '第二层嵌套-1' }, { name: '/nesting/nesting2/test3', title: '第二层嵌套-2' }] as const
=======
const secondNestingList = [{ name: '/nesting/nesting2/test2' as const, title: '第二层嵌套-1' }, { name: '/nesting/nesting2/test3' as const, title: '第二层嵌套-2' }]
>>>>>>> 41bccda4c28974293d667d7e695d44bb6aba2559
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
