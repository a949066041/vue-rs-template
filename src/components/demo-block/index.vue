<script lang="ts" setup>
import { useClipboard, useToggle } from '@vueuse/core'

import { codeToHtml } from 'shiki'
import { computed, onMounted, ref, watch } from 'vue'

const props = withDefaults(defineProps<{ src: string, source: string, auth?: boolean }>(), {
  auth: false,
})

const [render, toggleRender] = useToggle()
let AsyncComp: any = null
const contextExample = import.meta.webpackContext('../../', {
  // 是否搜索子目录
  recursive: true,
  regExp: /\.vue$/,
})

const modules = contextExample.keys().reduce((arr, value) => {
  arr[value.replace('./', '')] = contextExample(value)
  return arr
}, {} as Record<string, any>)

onMounted(async () => {
  const mapComponents = modules[`example/${props.src}`]
  if (!mapComponents)
    throw new Error('not found comp')
  AsyncComp = mapComponents.default
  toggleRender(true)
})

const code = computed(() => decodeURIComponent(props.source))
const { copy, isSupported } = useClipboard({ source: code })

const [showCode, toggleShowCode] = useToggle()
const html = ref('')
watch(showCode, async () => {
  if (showCode.value) {
    html.value = await codeToHtml(code.value, {
      lang: 'vue',
      theme: 'vitesse-light',
    })
  }
}, { immediate: true })

function handleCopy() {
  copy(code.value)
}
</script>

<template>
  <div class="mt-6 border border-solid pt-4 px-2 rounded border-slate-200">
    {{ isSupported }}
    <div
      v-if="render" class=" w-full h-[200px] relative"
    >
      <AsyncComp />
    </div>
    <div
      v-if="showCode"
      class="border-t-1px border-t-solid border-slate-200 pt-2 flex justify-end items-center mt-4 overflow-auto"
    >
      <div class="w-full" v-html="html" />
    </div>
    <div
      class="border-t-1px border-t-solid border-slate-200  flex justify-end items-center h-8"
    >
      <div
        title="show source code"
        class="i-carbon-code mx-2 cursor-pointer"
        style="color: #737373"
        @click="toggleShowCode()"
      >
        {{ showCode ? '隐藏代码' : '显示代码' }}
      </div>
      <div
        title="copy source code"
        class="i-carbon-copy-file mx-2 cursor-pointer"
        style="color: #737373"
        @click="handleCopy()"
      >
        复制代码
      </div>
    </div>
  </div>
</template>
