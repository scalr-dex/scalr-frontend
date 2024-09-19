import * as Sentry from '@sentry/react'
import env from 'helpers/env'

const sentryConfig: Sentry.BrowserOptions = {
  dsn: env.VITE_SENTRY_DSN,
  environment: env.DEV ? 'development' : 'production',
  debug: true,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.browserProfilingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1,
  maxValueLength: 1000,
  sampleRate: 1,
  profilesSampleRate: 1,
  // Only works with sentry.io, GlitchClip doesn't support it
  replaysSessionSampleRate: 1,
  replaysOnErrorSampleRate: 1,
}

export function initSentry() {
  Sentry.init(sentryConfig)
}

export function setSentryUser(tgId: string) {
  Sentry.setUser({ username: tgId })
}

export default Sentry
