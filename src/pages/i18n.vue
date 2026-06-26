<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, d, n, locale } = useI18n()

const name = ref('Emily')
const count = ref(2)
const now = new Date()
</script>

<template>
  <div class="max-w-xl space-y-5">
    <div>
      <h1 class="text-lg font-semibold">
        {{ t('i18n.title') }}
      </h1>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {{ t('i18n.intro') }}
      </p>
    </div>

    <dl class="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3 text-sm">
      <dt class="text-gray-500 dark:text-gray-400">
        {{ t('i18n.currentLocale') }}
      </dt>
      <dd>
        <code class="rounded bg-gray-100 px-1.5 py-0.5 dark:bg-gray-800">{{ locale }}</code>
      </dd>

      <dt class="text-gray-500 dark:text-gray-400">
        {{ t('i18n.nameLabel') }}
      </dt>
      <dd class="flex items-center gap-3">
        <input
          v-model="name"
          class="w-32 rounded-lg border border-gray-300 bg-transparent px-2 py-1 outline-none focus:border-blue-400 dark:border-gray-700"
        >
        <span>{{ t('i18n.greeting', { name }) }}</span>
      </dd>

      <dt class="text-gray-500 dark:text-gray-400">
        {{ t('i18n.countLabel') }}
      </dt>
      <dd class="flex items-center gap-3">
        <input
          v-model.number="count"
          type="number"
          min="0"
          class="w-20 rounded-lg border border-gray-300 bg-transparent px-2 py-1 outline-none focus:border-blue-400 dark:border-gray-700"
        >
        <span>{{ t('i18n.apples', count, { named: { count } }) }}</span>
      </dd>

      <dt class="text-gray-500 dark:text-gray-400">
        {{ t('i18n.money') }}
      </dt>
      <dd>{{ n(1234.5, 'currency') }}</dd>

      <dt class="text-gray-500 dark:text-gray-400">
        {{ t('i18n.now') }}
      </dt>
      <dd>{{ d(now, 'long') }}</dd>
    </dl>
  </div>
</template>
