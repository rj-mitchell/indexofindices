import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Relative asset paths so the built site works at a domain root or under a sub-path (e.g. GitHub Pages)
  base: './',
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
})
