import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'admin.html'),
        product_detail: resolve(__dirname, 'product_detail.html'),
        checkout: resolve(__dirname, 'checkout.html'),
      },
    },
  },
});
