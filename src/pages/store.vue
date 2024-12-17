<script lang="ts" setup>
import { useCountStore } from '~/store'

const countStore = useCountStore()
</script>

<template>
  <div>
    <div>
      this is about
    </div>
    <span class="text-blue">{{ countStore.count }}</span>
    <button class="border border-orange-500 rounded-lg border-solid px-20" @click="countStore.increment">
      add
    </button>
    <button class="border border-orange-500 rounded-lg border-solid px-20" @click="countStore.decrement">
      sub
    </button>
    <RouterView />
  </div>
</template>
