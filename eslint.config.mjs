import antfu from '@antfu/eslint-config'
import unusedImports from 'eslint-plugin-unused-imports'

export default antfu({
  unocss: false,
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
    // ...globs
  ],
}, {
  plugins: {
    'unused-imports': unusedImports,
  },
  rules: {
    'node/prefer-global/process': 'off',
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'warn',
    'import/first': 'off',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
})
