import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: resolve('dist-ssr'),
    // minify: 'esbuild',
    // cssMinify: true,
    // cssCodeSplit: true,
  },
});
