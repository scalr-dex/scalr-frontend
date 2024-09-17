import env from 'helpers/env'
import { EventData } from 'type/WebsocketEvents'
import backendKy from 'helpers/api/backendKy'

export function getWebsocketTicket() {
  return backendKy().get('ticket').json<{ ticket: string }>()
}

function getBetLostFromWsEventData(data: EventData) {
  if (!Array.isArray(data) && data._ === 'l') return data
}

function getBalanceChangeFromWsEventData(data: EventData) {
  if (!Array.isArray(data) && data._ === 'b')
    return { balance: Number(data.b), event: data.e, delta: data.d }
}

function getPriceChangeFromWsEventData(data: EventData) {
  if (Array.isArray(data)) {
    if (data[0]?._ === 'p') return data
  } else if (data._ === 'p') return [data]
}

export function setupWebSocket(ticket: string) {
  const io = (url: string) => new WebSocket(url)
  const url = `${env.VITE_BACKEND_URL.replace('https', 'wss')}/ws?ticket=${ticket}`

  return io(url)
}

export default function ({ data }: { data: string }) {
  const parsed = JSON.parse(data)

  const balance = getBalanceChangeFromWsEventData(parsed)
  if (balance) return { balance }

  const price = getPriceChangeFromWsEventData(parsed)
  if (price) return { price }

  const lost = getBetLostFromWsEventData(parsed)
  if (lost) return { lost }

  return {}
}
