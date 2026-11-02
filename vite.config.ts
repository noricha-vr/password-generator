import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Vite 7 と同じブラウザ対応範囲を維持する。
  build: { target: ['chrome107', 'edge107', 'firefox104', 'safari16'] },
})
