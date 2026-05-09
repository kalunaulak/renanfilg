import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// CONFIGURAÇÃO STANDARD PARA VERCEL
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    target: 'esnext',
    outDir: 'dist',
  },
})
