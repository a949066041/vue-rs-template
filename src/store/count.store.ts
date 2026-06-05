import { createGlobalState } from '@vueuse/core'
import { ref } from 'vue'

// 示例 store，用于演示 createGlobalState 用法
export const useCountStore = createGlobalState(() => {
  const count = ref(0)

  function increment() {
    count.value++
  }

  function decrement() {
    count.value--
  }

  return {
    count,
    increment,
    decrement,
  }
})
