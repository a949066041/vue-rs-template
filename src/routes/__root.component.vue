<script setup lang="ts">
import {
  Link,
  Outlet,
  useRouterState,
} from '@tanstack/vue-router'
import { TanStackRouterDevtools } from '@tanstack/vue-router-devtools'

const _state = useRouterState()
</script>

<template>
  <Link
    to="/"
    :active-props="{ class: 'font-bold' }"
    :active-options="{ exact: true }"
  >
    Home
  </Link>
  <Link
    to="/home"
    :active-props="{ class: 'font-bold' }"
    :active-options="{ exact: true }"
  >
    Home
  </Link>
  <Outlet />
  <TanStackRouterDevtools position="bottom-right" />
</template>
