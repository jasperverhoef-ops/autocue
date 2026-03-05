import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// On GitHub Actions, GITHUB_REPOSITORY is "owner/repo-name".
// We use the repo name as the base path for GitHub Pages.
// Locally it falls back to '/' so `npm run dev` still works.
const base = process.env.GITHUB_REPOSITORY
  ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/`
  : '/'

export default defineConfig({
  plugins: [react()],
  base,
})
