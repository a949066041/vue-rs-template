<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute('/user/create.[id]')
</script>

<template>
  <div>
    {{ route.params.id }}
  </div>
</template>
