import { postEvent } from '@telegram-apps/sdk-react'

export default function () {
  postEvent('web_app_ready')
  postEvent('web_app_set_header_color', { color: '#0e121b' })
  postEvent('web_app_set_background_color', { color: '#0e121b' })
  postEvent('web_app_expand')
  postEvent('web_app_setup_swipe_behavior', { allow_vertical_swipe: false })
}
