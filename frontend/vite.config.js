import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    /* Inline only very small assets (under 4KB) to reduce HTTP requests
       without bloating the JS bundle, but never images. A responsive
       variant inlined as a base64 data URI ships to every visitor inside
       the JS, defeating the point of letting <picture> choose one file. */
    assetsInlineLimit(filePath) {
      if (/\.(avif|webp|jpe?g|png|gif|svg)$/i.test(filePath)) return false;
      return undefined; // everything else keeps the 4KB default
    },
    rollupOptions: {
      output: {
        /* Split vendor libraries into a separate chunk so they are cached
           independently from your app code. On repeat visits, only the
           small app chunk needs re-downloading. */
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('motion')) {
              return 'motion';
            }
            return 'vendor';
          }
        },
      },
    },
  },
})
