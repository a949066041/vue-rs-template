# Styling Rules

## Tailwind CSS v4
- No `tailwind.config.*` file — v4 uses CSS-based config
- Entry point: `src/style/index.css` with `@import "tailwindcss"`
- Plugin config in `src/style/plugins.ts`
- Use Tailwind utility classes directly in templates

## Icons (Iconify)
- Dynamic icon classes via `@iconify/tailwind`: `class="icon-[maki--arrow]"`
- Custom icons from `svgs/` directory, built to `src/assets/custom.json` on `pnpm install`
- Custom icon usage: `class="icon-[custom--anq]"`
- Icon set: `custom` prefix for project-specific icons

## Class Conventions
- Use `class` attribute (not `className`)
- Use Tailwind utility classes — avoid inline styles
- Use `cn()` or template literals for conditional classes if needed
