<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute('/[...path]')
</script>

<template>
  <div> {{ route.params.path }} not founds</div>
</template>
