import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: [
    'dist',
    '**/dist/**',
    '.output',
    '**/.output/**',
    'node-modules',
    '**/node-modules/**',
  ],
  rules: {
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 3,
      },
      multiline: {
        max: 1,
      },
    }],
  },
})
