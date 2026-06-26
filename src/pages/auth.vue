<script lang="ts" setup>
import type { UserLoginParams } from '~/api'
import { useMutation } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/store'

const { loginUser } = useAuthStore()
const router = useRouter()
const { mutateAsync, isPending, error } = useMutation({
  mutationKey: ['login'],
  mutationFn: (params: UserLoginParams) => loginUser(params),
})

async function handleSubmitLogin(evt: Event) {
  const data = new FormData(evt.target as HTMLFormElement)
  const username = data.get('username') as string
  const password = data.get('password') as string

  await mutateAsync({ username, password })
  router.push({ name: '/(auth)/page' })
}
</script>

<template>
  <div class="mx-auto max-w-sm space-y-4 rounded-xl border border-gray-200 p-6 dark:border-gray-800">
    <div>
      <h1 class="text-lg font-semibold">
        登录
      </h1>
      <p class="text-xs text-gray-500 dark:text-gray-400">
        测试账号：emilys / emilyspass
      </p>
    </div>
    <form class="space-y-3" @submit.prevent="handleSubmitLogin">
      <div class="space-y-1">
        <label for="username" class="block text-sm text-gray-500 dark:text-gray-400">用户名</label>
        <input
          id="username"
          name="username"
          type="text"
          value="emilys"
          required
          class="w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-blue-400 dark:border-gray-700"
        >
      </div>
      <div class="space-y-1">
        <label for="password" class="block text-sm text-gray-500 dark:text-gray-400">密码</label>
        <input
          id="password"
          name="password"
          type="password"
          value="emilyspass"
          required
          class="w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-blue-400 dark:border-gray-700"
        >
      </div>
      <p v-if="error" class="text-sm text-red-500">
        {{ error.message }}
      </p>
      <button
        type="submit"
        class="w-full rounded-lg bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-600 disabled:opacity-50"
        :disabled="isPending"
      >
        {{ isPending ? '登录中...' : '登录' }}
      </button>
    </form>
  </div>
</template>
