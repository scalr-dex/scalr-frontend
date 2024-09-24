import { defineConfig, loadEnv } from 'vite'
import preact from '@preact/preset-vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { visualizer } from 'rollup-plugin-visualizer'
import { sentryVitePlugin } from '@sentry/vite-plugin'

export default defineConfig(({ mode }) => {
  const env = Object.assign(process.env, loadEnv(mode, process.cwd(), ''))

  const minify = env['MINIFY'] === undefined ? true : Boolean(env['MINIFY'])

  return {
    plugins: [preact(), tsconfigPaths()],
    preview: {
      port: 5173,
    },
    build: {
      sourcemap: true,
      minify,
      rollupOptions: {
        plugins: [
          visualizer({
            gzipSize: true,
            brotliSize: true,
          }),
          sentryVitePlugin({
            org: 'scalr-79',
            project: 'mini-app',
            authToken: String(env['SENTRY_AUTH_TOKEN']),
            reactComponentAnnotation: { enabled: true },
            sourcemaps: { filesToDeleteAfterUpload: '**/*.js.map' },
          }),
        ],
      },
      outDir: 'dist',
    },
  }
})
