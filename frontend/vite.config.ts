import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/cpf': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/cnpj-alfanumerico': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/cnpj-numerico': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
})
