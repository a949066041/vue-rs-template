# Styling Rules

## Tailwind CSS v4
- No `tailwind.config.*` file — v4 uses CSS-based config
- Integrated via `@rsbuild/plugin-tailwindcss` (no PostCSS config)
- Entry point: `src/style/index.css` with `@import "tailwindcss"`
- Class-based dark mode via `@custom-variant dark (&:where(.dark, .dark *))`
- Use Tailwind utility classes directly in templates

## Icons (Iconify)
- Dynamic icon classes via `@iconify/tailwind4`: `class="icon-[maki--arrow]"`
- Custom icons loaded directly from the `svgs/` directory via `from-folder(custom, "./svgs")` (configured inline in `index.css`, no build step)
- Custom icon usage: `class="icon-[custom--anq]"`
- Icon set: `custom` prefix for project-specific icons

## Class Conventions
- Use `class` attribute (not `className`)
- Use Tailwind utility classes — avoid inline styles
- Use `cn()` or template literals for conditional classes if needed
