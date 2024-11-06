import { defineConfig, loadEnv, Plugin } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { visualizer } from 'rollup-plugin-visualizer'
import { sentryVitePlugin } from '@sentry/vite-plugin'
import { v4 } from 'uuid'

export default defineConfig(({ mode }) => {
  const env = Object.assign(process.env, loadEnv(mode, process.cwd(), ''))

  const minify = env['MINIFY'] === undefined ? true : Boolean(env['MINIFY'])

  return {
    plugins: [tsconfigPaths()],
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
            org: 'scalr',
            url: env['SENTRY_URL'],
            project: 'mini-app',
            release: {
              name: v4(),

              uploadLegacySourcemaps: [
                {
                  paths: ['dist/assets'],
                  urlPrefix: '~/assets',
                },
              ],
            },
            authToken: env['SENTRY_AUTH_TOKEN'],
            reactComponentAnnotation: { enabled: true },
            sourcemaps: { filesToDeleteAfterUpload: '**/*.js.map' },
          }),
        ],
      },
      outDir: 'dist',
    },
  }
})
