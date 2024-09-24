import GoogleAnalytics from 'react-ga4'
import env from 'helpers/env'
import TrackerEvents from 'type/TrackerEvents'
import { track as trackAmplitude } from '@amplitude/analytics-browser'

export function initAnalytics() {
  GoogleAnalytics.initialize(env.VITE_ANALYTICS_KEY)
}

export function track(action: TrackerEvents, value?: number, label?: string) {
  trackAmplitude(action, { value, label })
  GoogleAnalytics.event({
    action: TrackerEvents[action],
    category: 'user-interaction',
    ...(value && { value }),
    ...(label && { label }),
  })
}

export function trackNavigation(route: string) {
  GoogleAnalytics.send({
    hitType: 'pageview',
    page: route,
  })
}
