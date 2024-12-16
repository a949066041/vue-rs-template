<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute('/test-[...arr]')
</script>

<template>
  <div>test {{ route.params.arr }}</div>
</template>
