import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path, { resolve } from 'path'
import dts from 'vite-plugin-dts'
import VitePluginStyleInject from 'vite-plugin-style-inject'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), dts(), VitePluginStyleInject()],
  build: {
    cssCodeSplit: true,
    emptyOutDir: true,
    lib: {
      entry: path.resolve(__dirname, "src/main.ts"),
      name: 'calendar-engine',
      formats: ['es'],
      fileName: (format) => `engine.${format}.js`
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue"
        }
      },
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})
