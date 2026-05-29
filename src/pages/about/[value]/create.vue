<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute('/about/[value]/create')
</script>

<template>
  <div>Hello "/about/[value]/"! {{ route.params.value }} create</div>
</template>
