import { defineConfig, Plugin } from 'vite'
import preact from '@preact/preset-vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { visualizer } from 'rollup-plugin-visualizer'
import { sentryVitePlugin } from '@sentry/vite-plugin'

export default defineConfig({
  plugins: [preact(), tsconfigPaths()],
  preview: {
    port: 5173,
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      plugins: [
        visualizer({
          gzipSize: true,
          brotliSize: true,
        }),
        sentryVitePlugin({
          org: 'scalr-79',
          project: 'mini-app',
          authToken: process.env['SENTRY_AUTH_TOKEN'] as string,
        }),
      ],
    },
    outDir: 'dist',
  },
})
