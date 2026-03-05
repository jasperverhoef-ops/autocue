import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// On GitHub Actions, GITHUB_REPOSITORY is "owner/repo-name".
// We use the repo name as the base path for GitHub Pages.
// Locally it falls back to '/' so `npm run dev` still works.
const base = process.env.GITHUB_REPOSITORY
  ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/`
  : '/'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      base,
      manifest: {
        name: 'Autocue',
        short_name: 'Autocue',
        description: 'Teleprompter app voor ChristenUnie Leeuwarden',
        theme_color: '#111111',
        background_color: '#111111',
        display: 'standalone',
        orientation: 'landscape',
        icons: [
          {
            src: 'icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,woff2}'],
      },
    }),
  ],
  base,
})
