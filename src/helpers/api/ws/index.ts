import env from 'helpers/env'
import backendKy from 'helpers/api/backendKy'

export function getWebsocketTicket() {
  return backendKy().get('ticket').json<{ ticket: string }>()
}

export function setupWebSocket(ticket: string) {
  const io = (url: string) => new WebSocket(url)
  const url = `${env.VITE_BACKEND_URL.replace('https', 'wss')}/ws?ticket=${ticket}`

  return io(url)
}
