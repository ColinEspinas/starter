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
})
