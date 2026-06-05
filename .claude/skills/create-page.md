---
name: create-page
description: Create a new page with file-based routing
---

# Create New Page

This skill helps you create a new page in the Vue project using file-based routing.

## Usage

```
/create-page <page-path> [--layout <layout-name>]
```

## Examples

```
/create-page about                    # Creates src/pages/about.vue -> /about
/create-page users/[id]              # Creates src/pages/users/[id].vue -> /users/:id
/create-page dashboard/(admin)       # Creates pathless group for admin layout
/create-page docs/[...path]          # Creates catch-all route for 404
```

## Steps

1. **Determine the file path** based on the route path:
   - `/about` -> `src/pages/about.vue`
   - `/users/:id` -> `src/pages/users/[id].vue`
   - `/users/:id=int` -> `src/pages/users/[id=int].vue` (typed param)
   - Catch-all 404 -> `src/pages/[...path].vue`

2. **Create the Vue component** with this template:

```vue
<script setup lang="ts">
// Page meta (optional)
definePage({
  meta: {
    title: 'Page Title',
    requiresAuth: false, // Set to true if authentication required
  },
})
</script>

<template>
  <div>
    <h1>Page Title</h1>
  </div>
</template>
```

3. **For layout groups**, create a layout component:

```vue
<!-- src/pages/dashboard/(admin).vue -->
<script setup lang="ts">
</script>

<template>
  <div class="admin-layout">
    <aside>Admin Sidebar</aside>
    <main>
      <RouterView />
    </main>
  </div>
</template>
```

## Route Conventions

| Convention | Example | Description |
|------------|---------|-------------|
| `[param]` | `[id]` | Dynamic segment |
| `[param=int]` | `[id=int]` | Typed dynamic segment |
| `[...path]` | `[...path]` | Catch-all route |
| `(group)` | `(admin)` | Pathless layout group |
| `[[param]]+` | `[[slug]]+` | Optional repeatable segment |

## Notes

- Routes are automatically generated from `src/pages/` directory
- Type definitions are auto-generated to `src/route-map.d.ts`
- Use `definePage()` macro for route meta (requires unplugin-vue-router)
