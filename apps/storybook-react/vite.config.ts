import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  root: 'app',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
  },
  server: {
    open: true,
    port: 5005,
  },
  preview: {
    port: 5005,
  },
  clearScreen: false,
  optimizeDeps: {
    exclude: ['@tldraw/assets'],
  },
  plugins: [
    react(),
    tsconfigPaths(),
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint ./ --ext .ts,.tsx',
      },
    }),
  ],
});
