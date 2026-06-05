# Vue Component Rules

## Script Block
- Always use `<script lang="ts" setup>` (lang before setup)
- Never use `defineComponent` or Options API
- Use `~/` path alias for src-root imports
- Place TypeScript logic in `<script>`, not in template expressions
- Use `import type` for type-only imports

## Template Block
- Never write TypeScript expressions in templates (no `as`, type assertions, or complex generics)
- Use `class` for Tailwind classes (not `className`)
- Use `<RouterLink>` and `<RouterView>` (auto-imported, no import statement needed)
- Use named routes with `:to="{ name: '/path', params: { id } }"` for typed navigation
- Keep template expressions simple: variables, computed props, and function calls only

## Component Organization
- Components in `src/pages/**/components/**` are excluded from route generation
- Layout files (same name as directory) contain `<RouterView />` for child routes
- Extract complex logic to composables or stores, not inline in templates

## Type Safety
- Use `useRoute('/path')` with the route path for fully typed route params
- Use computed properties to derive values from route params
- Avoid `any` — use proper types or `unknown` with type guards
