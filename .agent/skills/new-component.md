---
description: Create a new Vue component following project conventions
---

# New Component

Create a new Vue component in the appropriate location.

## Arguments
- `$ARGUMENTS` — Component path (e.g., `Button`, `user/UserCard`, `common/Modal`)

## Steps

1. Determine the location:
   - Page-specific: `src/pages/<page>/components/<Name>.vue`
   - Shared: `src/components/<Name>.vue`

2. Create the component file:
```vue
<script lang="ts" setup>
// Define props with defineProps
// defineProps<{ ... }>()

// Define emits with defineEmits if needed
// defineEmits<{ ... }>()
</script>

<template>
  <div>
    <!-- component content -->
  </div>
</template>
```

3. Run `pnpm typecheck` to verify

## Notes
- Components in `**/components/**` are excluded from route generation
- Use `defineProps` and `defineEmits` for component API
- Use `~/` path alias for imports
- Use Tailwind utility classes for styling
