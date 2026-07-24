import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves at /reunion-ally-mvp/ so production builds need that base.
// Dev server stays at / for convenience.
// For Vercel: set VITE_BASE=/ in the Vercel environment variables.
export default defineConfig(({ command }) => ({
  base: process.env.VITE_BASE ?? (command === 'build' ? '/reunion-ally-mvp/' : '/'),
  plugins: [react()],
}))
