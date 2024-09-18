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
    minify:
      import.meta.env['MINIFY'] !== undefined
        ? import.meta.env['MINIFY']
        : true,
    sourcemap: true,
    rollupOptions: {
      plugins: [
        visualizer({
          gzipSize: true,
          brotliSize: true,
        }),
        sentryVitePlugin({
          org: 'scalr-15',
          project: 'scalr-mini-app',
          authToken: import.meta.env['SENTRY_AUTH_TOKEN'],
        }),
      ],
    },
    outDir: 'dist',
  },
})
