<script lang="ts" setup>
import type { ILoginUserParams } from '~/api'
import { useMutation } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/store'

const { loginUser } = useAuthStore()
const router = useRouter()
const { mutateAsync, isPending } = useMutation({
  mutationKey: ['login'],
  mutationFn: (params: ILoginUserParams) => loginUser({
    ...params,
    username: 'emilys',
    password: 'emilyspass',
  }),
})

async function handleSubmitLogin(evt: unknown) {
  const data = new FormData((evt as HTMLFormElement).currentTarget)
  const username = data.get('username') as string
  const password = data.get('password') as string

  await mutateAsync({ username, password })
  router.push({ name: '/(auth)/page' })
}
</script>

<template>
  <div>
    login page
    <form class=" mt-2 border-t" @submit.prevent="handleSubmitLogin">
      <div>
        <label htmlFor="username">username：</label>
        <input name="username" class=" border" type="text" required>
      </div>
      <div>
        <label htmlFor="password">password：</label>
        <input name="password" class=" border" type="text" required>
      </div>
      <button class=" px-2 border-red-400 border ml-2" type="submit" :disabled="isPending">
        {{
          isPending ? 'login...' : 'login'
        }}
      </button>
    </form>
  </div>
</template>
