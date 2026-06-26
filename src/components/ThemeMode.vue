<script lang="ts" setup>
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <button
    type="button"
    class="inline-flex size-8 items-center justify-center border border-blue-300 rounded-lg"
    :title="isDark ? '切换到浅色模式' : '切换到深色模式'"
    @click="() => toggleDark()"
  >
    <i :class="isDark ? 'icon-[material-symbols--dark-mode]' : 'icon-[material-symbols--light-mode]'" />
  </button>
</template>
