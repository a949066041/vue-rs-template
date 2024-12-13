<script lang="ts" setup>
import { useCountStore } from '~/store'

const countStore = useCountStore()
</script>

<template>
  <div>
    <span class="text-blue">{{ countStore.count }}</span>
    <button @click="countStore.increment">
      add
    </button>
    <button @click="countStore.decrement">
      sub
    </button>
  </div>
</template>
