<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute('/user/[id=int]')
</script>

<template>
  <div>
    {{ route.params.id }}
  </div>
</template>
