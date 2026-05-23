import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves this repo at /reunion-ally-mvp/. Keep dev at /.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/reunion-ally-mvp/' : '/',
  plugins: [react()],
}))
