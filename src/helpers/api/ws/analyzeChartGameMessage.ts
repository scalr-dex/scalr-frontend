import { writeAtom } from 'helpers/atoms/atomStore'
import priceHistoryAtom, { dataMaxLength } from 'helpers/atoms/priceHistoryAtom'
import UserAtom, { userBetAtom } from 'helpers/atoms/UserAtom'
import balanceChangeToast from 'helpers/sendToast'
import { EventData, EventDataPriceChangeSingle } from 'type/WebsocketEvents'
import addBetPoint from 'helpers/chart/addBetPoint'

function getBetLostFromWsEventData(data: EventData) {
  if (Array.isArray(data) || data._ !== 'l') return

  balanceChangeToast(data.l, true)
  writeAtom(userBetAtom, null)
  return true
}

function getBalanceChangeFromWsEventData(data: EventData) {
  if (Array.isArray(data) || data._ !== 'b') return

  const balance = { new: Number(data.b), event: data.e, delta: data.d }

  writeAtom(UserAtom, (prev) =>
    prev ? { ...prev, balance: balance.new } : null
  )

  if (balance.event === 'BetWon') {
    balanceChangeToast(balance.delta, false)
    writeAtom(userBetAtom, null)
  }
  return true
}

function getBetFromWsEventData(data: EventData) {
  if (Array.isArray(data) || data._ !== 'g') return

  const bet = {
    amount: data.a,
    time: data.c,
    direction: data.d,
  }

  // include bet in chart data to keep it smooth
  writeAtom(priceHistoryAtom, (prev) =>
    addBetPoint({ prev, direction: bet.direction })
  )
  return true
}

function getPriceChangeFromWsEventData(data: EventData) {
  let price: EventDataPriceChangeSingle[] = []

  if (Array.isArray(data)) {
    if (data[0]?._ === 'p') price = data
  } else if (data._ === 'p') price = [data]
  else return

  const processedPrice = price.map((data) => ({
    name: String(data.t),
    value: [data.t * 1000, Number(data.p) / 10000],
  }))
  writeAtom(priceHistoryAtom, (prev) =>
    [...prev, ...processedPrice].slice(-dataMaxLength)
  )
  return true
}

function getClaimFromWsEventData(data: EventData) {
  if (Array.isArray(data) || data._ !== 'c') return

  writeAtom(UserAtom, (prev) =>
    prev ? { ...prev, canClaimAmount: data.a } : null
  )
  return true
}

export default function (parsed: EventData) {
  if (getPriceChangeFromWsEventData(parsed)) return true
  if (getBalanceChangeFromWsEventData(parsed)) return true
  if (getBetFromWsEventData(parsed)) return true

  if (getBetLostFromWsEventData(parsed)) return true
  if (getClaimFromWsEventData(parsed)) return true
}
