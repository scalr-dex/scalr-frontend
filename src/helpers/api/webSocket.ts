import {
  EventDataBetLost,
  EventDataPriceChange,
  EventData,
} from 'type/WebsocketEvents'

export function getBetLostFromWsEventData(
  data: EventData
): EventDataBetLost | undefined {
  if (!Array.isArray(data) && data._ === 'l') return data
}

export function getBetWinFromWsEventData(data: EventData) {
  const dataBalanceChange = getBalanceChangeFromWsEventData(data)
  if (dataBalanceChange && ['BetWon'].includes(dataBalanceChange.e)) return true

  return false
}

export function getBalanceChangeFromWsEventData(data: EventData) {
  if (!Array.isArray(data) && data._ === 'b') return data
}

export function getPriceChangeFromWsEventData(
  data: EventData
): EventDataPriceChange | undefined {
  if (Array.isArray(data) && data[0]._ === 'p') return data
  else if (!Array.isArray(data) && data._ === 'p') return data
}

export default function ({ data }: { data: EventData }) {
  console.log(data)
  return
  //   return { balance: getBalanceChangeFromWsEventData(data).b }
}
