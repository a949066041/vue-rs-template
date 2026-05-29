<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute('/about/[value]/')
</script>

<template>
  <div>Hello "/about/[value]/"! {{ route.params.value }}</div>
</template>
