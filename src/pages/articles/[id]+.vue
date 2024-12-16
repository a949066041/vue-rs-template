<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute('/articles/[id]+')
</script>

<template>
  articles id+ {{ route.params.id }}
</template>
