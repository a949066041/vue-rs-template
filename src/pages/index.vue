<script lang="ts" setup>
const features = [
  { icon: 'icon-[logos--vue]', title: 'Vue 3 + Rsbuild', desc: '基于 Rspack 的极速构建，<script setup> 组合式 API' },
  { icon: 'icon-[material-symbols--dynamic-feed]', title: '文件路由', desc: 'vue-router/unplugin 自动生成类型安全路由' },
  { icon: 'icon-[logos--vue]', title: 'TanStack Vue Query', desc: '服务端状态管理与无限滚动示例' },
  { icon: 'icon-[logos--pinia]', title: 'Pinia Colada', desc: '轻量查询方案，含 query / mutation 示例' },
  { icon: 'icon-[octicon--cache-24]', title: '全局状态', desc: 'VueUse createGlobalState 单例状态' },
  { icon: 'icon-[material-symbols--lock-outline]', title: '鉴权流程', desc: 'fetch 拦截器 + 路由守卫的登录鉴权' },
]
</script>

<template>
  <div class="mx-auto max-w-3xl space-y-6">
    <div class="flex items-center gap-3">
      <i class="icon-[custom--anq] text-3xl text-blue-500" />
      <i class="icon-[custom--backup] text-3xl text-blue-500" />
      <div>
        <h1 class="text-2xl font-bold">
          Vue RS Template
        </h1>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          一个集成路由、数据请求、状态管理与鉴权的 Vue 3 起手模板
        </p>
      </div>
    </div>

    <div class="grid gap-3 sm:grid-cols-2">
      <div
        v-for="item of features"
        :key="item.title"
        class="rounded-xl border border-gray-200 p-4 transition-colors hover:border-blue-300 dark:border-gray-800 dark:hover:border-blue-500/50"
      >
        <div class="flex items-center gap-2">
          <i :class="item.icon" class="text-xl" />
          <h2 class="font-semibold">
            {{ item.title }}
          </h2>
        </div>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {{ item.desc }}
        </p>
      </div>
    </div>

    <p class="text-sm text-gray-500 dark:text-gray-400">
      使用左侧导航浏览各功能示例。
    </p>
  </div>
</template>
