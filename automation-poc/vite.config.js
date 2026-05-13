import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

// Generates a _headers file in dist/ for Netlify / Cloudflare Pages.
// GitHub Pages ignores this file but the headers are pre-wired for migration.
function headersPlugin() {
  return {
    name: 'generate-_headers',
    closeBundle() {
      const policy = [
        "default-src 'self'",
        "script-src 'self'",
        "style-src 'self' https://fonts.googleapis.com",
        "font-src https://fonts.gstatic.com",
        "img-src 'self' data: https: blob:",
        "connect-src 'self' https://fakestoreapi.com https:",
        "object-src 'none'",
        "base-uri 'self'",
        "frame-ancestors 'none'",
      ].join('; ')

      const content = `/*\n  Content-Security-Policy: ${policy}\n  X-Frame-Options: DENY\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Permissions-Policy: geolocation=(), microphone=(), camera=()\n  Strict-Transport-Security: max-age=31536000; includeSubDomains\n`

      const outDir = path.resolve('dist')
      if (fs.existsSync(outDir)) {
        fs.writeFileSync(path.join(outDir, '_headers'), content)
      }
    },
  }
}

export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [react(), headersPlugin()],
  server: {
    port: 3000,
    open: true
  }
})
