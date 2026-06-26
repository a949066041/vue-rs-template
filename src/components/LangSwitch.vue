<script lang="ts" setup>
import type { LocaleCode } from '~/i18n'
import { useI18n } from 'vue-i18n'
import { setLocale, SUPPORT_LOCALES } from '~/i18n'

const { locale } = useI18n()

function onChange(evt: Event) {
  setLocale((evt.target as HTMLSelectElement).value as LocaleCode)
}
</script>

<template>
  <select
    :value="locale"
    class="h-8 rounded-lg border border-blue-300 bg-transparent px-2 text-sm outline-none dark:bg-gray-900"
    @change="onChange"
  >
    <option v-for="item of SUPPORT_LOCALES" :key="item.code" :value="item.code">
      {{ item.label }}
    </option>
  </select>
</template>
