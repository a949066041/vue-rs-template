<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/store'

const router = useRouter()
const { userInfo, logoutUser } = useAuthStore()

async function handleLogout() {
  await logoutUser()
  router.push('/auth')
}
</script>

<template>
  <div class="max-w-md space-y-4 rounded-xl border border-gray-200 p-6 dark:border-gray-800">
    <h1 class="text-lg font-semibold">
      受保护页面
    </h1>
    <dl v-if="userInfo" class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
      <dt class="text-gray-500 dark:text-gray-400">
        id
      </dt>
      <dd>{{ userInfo.id }}</dd>
      <dt class="text-gray-500 dark:text-gray-400">
        name
      </dt>
      <dd>{{ userInfo.firstName }} {{ userInfo.lastName }}</dd>
      <dt class="text-gray-500 dark:text-gray-400">
        email
      </dt>
      <dd>{{ userInfo.email }}</dd>
    </dl>
    <button
      type="button"
      class="rounded-lg border border-red-400 px-4 py-1 text-sm text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-500/10"
      @click="handleLogout"
    >
      退出登录
    </button>
  </div>
</template>
