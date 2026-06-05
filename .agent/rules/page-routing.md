# Page & Routing Rules

## File-Based Routing
Routes are auto-generated from `src/pages/` by `vue-router/unplugin`.

## Route Patterns
- `pages/index.vue` → `/`
- `pages/user/[id].vue` → `/user/:id` (dynamic param)
- `pages/(auth)/page.vue` → `/auth/page` (group, parentheses stripped)
- `pages/[...path].vue` → catch-all 404
- `pages/n/value-[[more]]+/index.vue` → `/n/value-:more*` (optional repeatable)

## Layout Pattern
- Layout file: `pages/user.vue` (same name as directory)
- Contains `<RouterView />` to render child routes
- Contains navigation links to child pages

## Creating New Pages
1. Add `.vue` file to `src/pages/`
2. Route types in `src/route-map.d.ts` regenerate automatically at build time
3. Components in `**/components/**` are excluded from route generation

## Typed Routing
- Use `useRoute('/path')` for typed route params
- Use named routes in `<RouterLink>`: `:to="{ name: '/user/[id]', params: { id } }"`
- The `route-map.d.ts` provides full type safety for navigation
