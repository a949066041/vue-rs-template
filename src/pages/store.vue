<script lang="ts" setup>
import { useCountStore } from '~/store'

const { count, increment, decrement } = useCountStore()
</script>

<template>
  <div class="space-y-3">
    <h1 class="font-bold">
      createGlobalState 全局状态示例
    </h1>
    <p>
      当前计数：<span class="text-blue-500">{{ count }}</span>
    </p>
    <div class="space-x-2">
      <button class="border border-orange-500 rounded-lg px-4 py-1" @click="increment">
        +1
      </button>
      <button class="border border-orange-500 rounded-lg px-4 py-1" @click="decrement">
        -1
      </button>
    </div>
    <p class="text-sm text-gray-500">
      切换到其他页面再返回，计数会保持不变（全局单例状态）。
    </p>
  </div>
</template>
