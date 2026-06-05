---
name: add-route-guard
description: Add route guards for authentication and authorization
---

# Add Route Guard

This skill helps you add route guards for authentication and authorization.

## Usage

```
/add-route-guard <page-path> [--auth] [--role <role>]
```

## Examples

```
/add-route-guard dashboard --auth              # Require authentication
/add-route-guard admin --auth --role admin     # Require specific role
/add-route-guard settings --auth               # Require login
```

## Auth Guard Implementation

### Option 1: Using Route Meta (Recommended)

1. **Add meta to page** (`src/pages/<path>.vue`):

```vue
<script setup lang="ts">
definePage({
  meta: {
    requiresAuth: true,
    role: 'admin', // Optional: specific role required
  },
})
</script>

<template>
  <div>Protected Page</div>
</template>
```

2. **Guard is already implemented** in `src/setup/auth.setup.ts`:

```typescript
router.beforeEach(async (to) => {
  const { isAuthenticated, userInfo, fetchUserInfo } = useAuthStore()

  // Check if route requires auth
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    return { name: '/auth' }
  }

  // Fetch user info if not loaded
  if (isAuthenticated.value && !userInfo.value) {
    await fetchUserInfo()
  }

  // Check role if specified
  if (to.meta.role && userInfo.value?.role !== to.meta.role) {
    return { name: '/' } // Redirect to home
  }
})
```

### Option 2: Inline Guard in Page

```vue
<script setup lang="ts">
import { useAuthStore } from '~/store/auth'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { isAuthenticated, userInfo } = useAuthStore()

onMounted(() => {
  if (!isAuthenticated.value) {
    router.replace('/auth')
  }
  else if (userInfo.value?.role !== 'admin') {
    router.replace('/')
  }
})
</script>
```

### Option 3: Layout Guard

Create a protected layout:

```vue
<!-- src/pages/(protected).vue -->
<script setup lang="ts">
import { useAuthStore } from '~/store/auth'
import { watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { isAuthenticated } = useAuthStore()

watch(isAuthenticated, (val) => {
  if (!val) {
    router.replace('/auth')
  }
}, { immediate: true })
</script>

<template>
  <div v-if="isAuthenticated">
    <RouterView />
  </div>
</template>
```

Then use the layout:

```
src/pages/(protected)/dashboard.vue
src/pages/(protected)/settings.vue
```

## Route Meta Types

Add type definitions in `src/typed-router.d.ts`:

```typescript
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    role?: 'admin' | 'user' | 'guest'
    title?: string
  }
}
```

## Auth Store Usage

```typescript
import { useAuthStore } from '~/store/auth'

const { isAuthenticated, userInfo, login, logout } = useAuthStore()

// Check auth status
if (isAuthenticated.value) {
  console.log('User is logged in')
}

// Check user role
if (userInfo.value?.role === 'admin') {
  console.log('User is admin')
}
```

## Common Patterns

### Public-Only Pages (Guest Guard)

```vue
<!-- src/pages/auth.vue -->
<script setup lang="ts">
definePage({
  meta: {
    requiresGuest: true, // Only for non-authenticated users
  },
})
</script>
```

Add to auth guard:

```typescript
if (to.meta.requiresGuest && isAuthenticated.value) {
  return { name: '/' }
}
```

### Role-Based Access

```vue
<script setup lang="ts">
definePage({
  meta: {
    requiresAuth: true,
    roles: ['admin', 'editor'], // Multiple roles allowed
  },
})
</script>
```

Guard:

```typescript
if (to.meta.roles?.length) {
  const userRole = userInfo.value?.role
  if (!userRole || !to.meta.roles.includes(userRole)) {
    return { name: '/' }
  }
}
```

## Notes

- Auth guard is already set up in `src/setup/auth.setup.ts`
- Use `definePage()` macro for route meta
- Token is stored in localStorage via `useCacheStore`
- 401 responses auto-logout via fetch interceptor
