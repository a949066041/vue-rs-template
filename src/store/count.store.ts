import { createGlobalState } from '@vueuse/core'
import { ref } from 'vue'

export const useCountStore = createGlobalState(() => {
  const count = ref(1)

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
