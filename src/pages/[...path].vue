<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute('/[...path]')
</script>

<template>
  <div> {{ route.params }} not founds</div>
</template>
