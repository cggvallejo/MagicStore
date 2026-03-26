import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        berakah: resolve(__dirname, 'berakah.html'),
        magicworld: resolve(__dirname, 'magicworld.html'),
        product_detail: resolve(__dirname, 'product_detail.html'),
        checkout: resolve(__dirname, 'checkout.html'),
      },
    },
  },
});
