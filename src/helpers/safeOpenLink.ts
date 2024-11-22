import { openTelegramLink, openLink } from '@telegram-apps/sdk-react'

export function openUserChat(username?: string) {
  if (!username) return
  openTelegramLink('https://t.me/' + username)
}

export default function safeOpenLink(url: string) {
  url.includes('t.me') ? openTelegramLink(url) : openLink(url)
}
