import antfu from '@antfu/eslint-config'
import unusedImports from 'eslint-plugin-unused-imports'

export default antfu({
  unocss: false,
  vue: true,
  stylistic: {
    indent: 2,
    quotes: 'single',
  },
  typescript: true,
  jsonc: true,
  yaml: false,
  ignores: [
    '**/fixtures',
    '**/dist/**',
    '**/node_modules/**',
    'packages/*/template/**',
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
}, {
  // 脚手架 CLI 需要直接输出到终端
  files: ['packages/**/*.mjs'],
  rules: {
    'no-console': 'off',
  },
})
