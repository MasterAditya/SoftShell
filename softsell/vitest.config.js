import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        '.eslintrc.js',
        'vite.config.js',
        'vitest.config.js',
        'postcss.config.js',
        'tailwind.config.js',
      ],
    },
  },
})
