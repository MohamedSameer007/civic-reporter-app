import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  build: {
    target: 'esnext',
    outDir: 'dist',        // default output dir Vercel expects
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    open: true,
  },
  // base: '/repo-name/', // uncomment when deploying to sub-path
});
