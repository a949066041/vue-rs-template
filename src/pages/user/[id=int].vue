<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute('/user/[id=int]')

console.error(Number(route.params.id))
</script>

<template>
  <div>
    test
    {{ route.params.id }}
  </div>
</template>
