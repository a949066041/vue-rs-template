<script lang="ts" setup>
import DemoBlock from '~/components/demo-block/index.vue'
import HelloMd from '~/components/hello.mdx'
</script>

<template>
  <div>
    <HelloMd :components="{ DemoBlock }" />
  </div>
</template>
