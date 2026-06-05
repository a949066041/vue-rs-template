---
description: Create a new page with proper file-based routing structure
---

# New Page

Create a new Vue page file in `src/pages/` following project conventions.

## Arguments
- `$ARGUMENTS` — Page path (e.g., `dashboard`, `user/settings`, `admin/[id]`)

## Steps

1. Determine the file path from the argument:
   - `dashboard` → `src/pages/dashboard.vue`
   - `user/settings` → `src/pages/user/settings.vue`
   - `admin/[id]` → `src/pages/admin/[id].vue`

2. If the path has a parent layout (e.g., `user/settings` has `user.vue`), check if the layout file exists and has `<RouterView />`

3. Create the page file with this template:
```vue
<script lang="ts" setup>
// page logic
</script>

<template>
  <div>
    <!-- page content -->
  </div>
</template>
```

4. Run `pnpm typecheck` to verify the new page compiles correctly

5. Remind the user that route types in `src/route-map.d.ts` will regenerate on next build/dev
