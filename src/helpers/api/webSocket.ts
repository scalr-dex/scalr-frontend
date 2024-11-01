import env from 'helpers/env'
import { EventData } from 'type/WebsocketEvents'
import backendKy from 'helpers/api/backendKy'

export function getWebsocketTicket() {
  return backendKy().get('ticket').json<{ ticket: string }>()
}

function getBalanceChangeFromWsEventData(data: EventData) {
  if (!Array.isArray(data) && data._ === 'b')
    return { balance: Number(data.b), event: data.e, delta: data.d }
}

function getBetFromWsEventData(data: EventData) {
  if (!Array.isArray(data) && data._ === 'g')
    return { amount: data.a, time: data.c, direction: data.d }
}

function getPriceChangeFromWsEventData(data: EventData) {
  if (Array.isArray(data)) {
    if (data[0]?._ === 'p') return data
  } else if (data._ === 'p') return [data]
}

function getClaimFromWsEventData(data: EventData) {
  if (!Array.isArray(data) && data._ === 'c') return { amount: data.a }
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

  const bet = getBetFromWsEventData(parsed)
  if (bet) return { bet }

  const price = getPriceChangeFromWsEventData(parsed)
  if (price) return { price }

  const claim = getClaimFromWsEventData(parsed)
  if (claim) return { claim }

  return {}
}
