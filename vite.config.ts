import { defineConfig } from 'vite'
import adonisjs from '@adonisjs/vite/client'

export default defineConfig({
  plugins: [
    adonisjs({
      entrypoints: ['resources/css/app.css', 'resources/js/app.js'],
      reload: ['resources/views/**/*.edge'],
    }),
  ],
  server: {
    // Indispensable pour Docker : écoute sur toutes les interfaces
    host: '0.0.0.0', 
    // Autorise ton domaine
    allowedHosts: ['dev-sol.laxacube.ch'],
    // Pour que le rafraîchissement automatique (HMR) fonctionne via ton URL
    hmr: {
      host: 'dev-sol.laxacube.ch',
    },
  },
})