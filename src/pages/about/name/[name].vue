<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute('/about/name/[name]')
</script>

<template>
  <div> Hello "/about/name/[name]"! {{ route.params.name }}</div>
</template>
