import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
const __dirname = path.resolve();
import eslintPlugin from '@rollup/plugin-eslint'

export default defineConfig({
  plugins: [react(), eslintPlugin({ include: ['src/**/*.js', 'src/**/*.jsx'] })],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
    ],
  },
})
