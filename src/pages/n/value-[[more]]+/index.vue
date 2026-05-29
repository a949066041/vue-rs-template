<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute('/n/value-[[more]]+/')
</script>

<template>
  <div>{{ route.params.more }}</div>
</template>
