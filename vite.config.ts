import { defineConfig } from 'vite'
import path from 'node:path'
import electron from 'vite-plugin-electron/simple'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import commonjs from '@rollup/plugin-commonjs'

export default defineConfig({
  plugins: [
    react(),
    electron({
      main: {
        entry: 'electron/main.ts',
        vite: {
          build: {
            rollupOptions: {
              external: ['better-sqlite3'], // 🚀 exclude native addon
            },
          },
          plugins: [
            commonjs({
              dynamicRequireTargets: [
                'node_modules/better-sqlite3/**', // 🚀 allow dynamic require
              ],
            }),
          ],
        },
      },
      preload: {
        input: path.join(__dirname, 'electron/preload.ts'),
      },
      renderer: process.env.NODE_ENV === 'test' ? undefined : {},
    }),
    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/better-sqlite3/build/Release/better_sqlite3.node',
          dest: '.', // 🚀 copy next to dist-electron/main.js
        },
      ],
    }),
  ],
})
