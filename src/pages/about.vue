<script lang="ts" setup>
import { useCountStore } from '~/store'

const countStore = useCountStore()
</script>

<template>
  <div>
    <RouterLink to="/user">
      123
    </RouterLink>
    <span class="text-blue">{{ countStore.count }}</span>
    <button @click="countStore.increment">
      add
    </button>
    <button @click="countStore.decrement">
      sub
    </button>
  </div>
</template>
