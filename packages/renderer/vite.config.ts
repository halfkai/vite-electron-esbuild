import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    root: 'packages/renderer',
    base: './',
    plugins: [react()],
    server: {
      port: 5000
    },
    build: {
      outDir: resolve('dist/renderer'),
      emptyOutDir: true
    }
  }
})
