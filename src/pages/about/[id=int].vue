<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute('/about/[id=int]')
</script>

<template>
  <div>about - {{ route.params.id }}</div>
</template>
