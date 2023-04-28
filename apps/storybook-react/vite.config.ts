import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: 'app',
  server: {
    open: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './app/src'),
    },
  },
});
