import { openTelegramLink, openLink } from '@telegram-apps/sdk-react'

export default function (url: string) {
  url.includes('t.me') ? openTelegramLink(url) : openLink(url)
}
