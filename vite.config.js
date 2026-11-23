import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuration de Vite (outil de build et serveur de développement)
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // Masque les avertissements de dépréciation venant du code Sass de Bootstrap
        quietDeps: true,
        silenceDeprecations: ['import', 'global-builtin', 'color-functions', 'if-function'],
      },
    },
  },
});
