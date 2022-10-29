import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // VitePWA({
    //   // Register SW
    //   registerType: 'autoUpdate',
    //   // Dev mode
    //   devOptions: {
    //     enabled: true
    //   },
    //   // Precache
    //   workbox: {
    //     globPatterns: [
    //       // './index.html',
    //       // '**/*.{js,vue,json,css,html,ico,png,svg}'
    //     ]
    //   },
    // })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})