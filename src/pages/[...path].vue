<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div> {{ route.params.pathMatch || route.params.path }} not founds</div>
</template>
