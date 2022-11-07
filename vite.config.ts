import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      // Register SW
      registerType: 'autoUpdate',
      // Dev mode
      devOptions: {
        enabled: true
      },
      // Precache
      workbox: {
        globPatterns: [
          // './index.html',
          '**/*.{js,vue,json,css,html,ico,png,svg}'
        ]
      },
      // manifest
      manifest: {
        "name": "Lee Shop",
        "short_name": "LeeShop",
        "start_url": "/",
        "display": "standalone",
        "background_color": "#3b82f6",
        "theme_color": "#1e40af",
        "orientation": "portrait-primary",
        "icons": [
          {
            "src": "/src/assets/icons/icon-16x16.png",
            "type": "image/png",
            "sizes": "16x16"
          },
          {
            "src": "/src/assets/icons/icon-72x72.png",
            "type": "image/png",
            "sizes": "72x72"
          },
          {
            "src": "/src/assets/icons/icon-192x192.png",
            "type": "image/png",
            "sizes": "192x192"
          },
          {
            "src": "/src/assets/icons/icon-512x512.png",
            "type": "image/png",
            "sizes": "512x512"
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
