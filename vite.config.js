import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: './', // Garante que os caminhos sejam relativos para a Vercel
  build: {
    cssCodeSplit: false, // Força o CSS em um único arquivo para evitar quebras
    assetsInlineLimit: 100000, // Embutir imagens pequenas para performance
  }
})
