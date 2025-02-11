<script lang="ts" setup>
import { useCountStore } from '~/store'

const { count, increment, decrement } = useCountStore()

function handleTestValue() {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve('wait 3s')
    }, 3000)
  })
}

async function hanldeAddCountValue() {
  await handleTestValue()
  count.value++
}
</script>

<template>
  <div>
    <div>
      this is about
    </div>
    <span class="text-blue">{{ count }}</span>
    <button v-if="count" class="border border-orange-500 rounded-lg border-solid px-20" @click="increment">
      add
    </button>
    <button class="border border-orange-500 rounded-lg border-solid px-20" @click="decrement">
      sub 1
    </button>
    <button @click="hanldeAddCountValue">
      change state
    </button>
    <h1>list</h1>
    <ul>
      <li v-for="item of count" :key="item">
        {{ item }}
      </li>
    </ul>
    <RouterView />
  </div>
</template>
