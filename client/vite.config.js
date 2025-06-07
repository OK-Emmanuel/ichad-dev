import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react-phone-number-input'],
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3900', // forward requests to the backend
    },
  },
})
