import { defineConfig } from 'vite'
import react        from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api/contact': {
        target: 'https://playground.4geeks.com',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/api\/contact/, '/contact')
      }
    }
  },
  build: {
    outDir: 'dist'
  }
})
