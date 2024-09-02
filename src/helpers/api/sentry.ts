import * as Sentry from '@sentry/react'
import env from 'helpers/env'

const sentryConfig: Sentry.BrowserOptions = {
  dsn: env.VITE_SENTRY_DSN,
  tracesSampleRate: 1,
  maxValueLength: 1000,
  environment: env.DEV ? 'development' : 'production',
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.browserProfilingIntegration(),
    Sentry.replayIntegration(),
  ],
  sampleRate: 1,
  replaysSessionSampleRate: env.DEV ? 1 : 0.1,
  replaysOnErrorSampleRate: 1,
  debug: env.DEV,
}

export function initSentry() {
  Sentry.init(sentryConfig)
}

export function setSentryUser(tgId: string) {
  Sentry.setUser({ username: tgId })
}

export default Sentry
