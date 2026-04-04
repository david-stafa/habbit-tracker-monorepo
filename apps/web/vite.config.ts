import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
  ],
  // need to resolve for ~ defined in tsconfig.app.json
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
  envDir: path.resolve(__dirname, '../..'),
})
