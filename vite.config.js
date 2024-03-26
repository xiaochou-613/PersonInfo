import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    sourcemap: true,
    assetsDir: 'static',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            const arr = id.toString().split('node_modules/')[1].split('/')
            switch (arr[0]) {
              case '@vueuse':
              case 'animate.css':
              case 'animejs':
              case 'axios':
              case 'element-plus':
              case 'pinia':
              case 'sass':
              case 'three':
              case 'vanta':
              case 'vue':
              case 'vue-router':
              case 'vuetify':
                return '_' + arr[0]
              default:
                return '__vendor'
            }
          }
        },
        chunkFileNames: 'static/js1/[name]-[hash].js',
        entryFileNames: 'static/js2/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
      },
      brotliSize: true, // 开启统计 Brotli 压缩后的文件大小
      target: 'esnext',
      minify: 'esbuild'
    }
  },
  server: {
    fs: {
      strict: false // 解决在使用 fs 模块时出现的警告
    }
  }
})
