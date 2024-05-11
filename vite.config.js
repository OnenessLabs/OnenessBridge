import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from "tailwindcss";
import { terser } from "rollup-plugin-terser";
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import mkcert from 'vite-plugin-mkcert'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    mkcert(),
    terser(),
    vue(),
    nodePolyfills({
      globals: {
        Buffer: true, // can also be 'build', 'dev', or false
        global: true,
        process: true,
      },
    })
  ],
  server: {
    port: 9527,
    // host: "0.0.0.0",
    // open: true,
    https: true,
    secure: false,
    proxy: {
      '/api': {
        target: 'https://meson-ethbridge.vercel.app/api',
        changeOrigin: true,
        cookieDomainRewrite: 'localhost'
      },
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["vue", "vue-router", "pinia"],
        }
      }
    },
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      },
      output: {
        comments: true
      }
    },
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss,
      ],
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
})
