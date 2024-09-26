import antfu from '@antfu/eslint-config'

export default antfu({
  unocss: true,
  vue: true,

  // Enable stylistic formatting rules
  // stylistic: true,

  // Or customize the stylistic rules
  stylistic: {
    indent: 2, // 4, or 'tab'
    quotes: 'single', // or 'double'
  },
  typescript: true,

  // Disable jsonc and yaml support
  jsonc: true,
  yaml: false,

  // `.eslintignore` is no longer supported in Flat config, use `ignores` instead
  ignores: [
    '**/fixtures',
    'env.d.ts',
    // ...globs
  ],
})
