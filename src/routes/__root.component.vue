<script setup lang="ts">
import {
  HeadContent,
  Outlet,
  useRouterState,
} from '@tanstack/vue-router'
import { TanStackRouterDevtools } from '@tanstack/vue-router-devtools'

const _state = useRouterState()
</script>

<template>
  <HeadContent />
  this is ok
  <Outlet />
  <TanStackRouterDevtools position="bottom-right" />
</template>
