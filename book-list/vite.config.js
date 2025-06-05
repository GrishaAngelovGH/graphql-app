import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({
    babel: {
      plugins: ['@babel/plugin-transform-private-methods']
    }
  })],
  resolve: {
    alias: {
      components: "/src/components",
      queries: "/src/queries",
      mutations: "/src/mutations",
      mocks: "/src/mocks",
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/setup.js'
  }
})
