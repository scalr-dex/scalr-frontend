import env from 'helpers/env'
import { EventData } from 'type/WebsocketEvents'

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
  const io = (url: URL) => new WebSocket(url)
  const url = new URL(`${env.VITE_BACKEND_URL.replace('https', 'wss')}/ws`)
  url.searchParams.set('ticket', ticket)

  return io(url)
}

export default function ({ data }: { data: string }) {
  const parsed = JSON.parse(data)

  return {
    balance: getBalanceChangeFromWsEventData(parsed),
    price: getPriceChangeFromWsEventData(parsed),
    lost: getBetLostFromWsEventData(parsed),
  }
}
