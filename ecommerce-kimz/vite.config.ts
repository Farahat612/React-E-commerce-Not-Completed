import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'), //
      '@routes': path.resolve(__dirname, './src/routes'), //
      '@components': path.resolve(__dirname, './src/components'), //
      '@pages': path.resolve(__dirname, './src/pages'), //
      '@hooks': path.resolve(__dirname, './src/hooks'), //
      '@store': path.resolve(__dirname, './src/store'), //
      '@layouts': path.resolve(__dirname, './src/layouts'), //
      '@services': path.resolve(__dirname, './src/services'), //
      '@styles': path.resolve(__dirname, './src/styles'), //
      '@utils': path.resolve(__dirname, './src/utils'), //
      '@custopmTypes': path.resolve(__dirname, './src/custopmTypes'), //
      '@context': path.resolve(__dirname, './src/context'),
    },
  },
  plugins: [react(), svgr()],
})
