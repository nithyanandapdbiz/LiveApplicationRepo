import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// On GitHub Pages, the site is served from /<repo-name>/.
// The CI workflow injects VITE_BASE_PATH; locally it falls back to '/'.
export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
})
