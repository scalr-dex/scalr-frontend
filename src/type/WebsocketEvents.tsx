export type EventData =
  | EventDataPriceChange
  | EventDataBalanceChange
  | EventDataBetLost

export type EventDataPriceChangeSingle = {
  _: 'p'
  p: string
  t: number
  r: boolean
}

export type EventDataPriceChangeInitial = Array<EventDataPriceChangeSingle>

export type EventDataPriceChange =
  | EventDataPriceChangeSingle
  | EventDataPriceChangeInitial

export type EventDataBalanceChange = {
  _: 'b'
  b: string
  e: 'BetWon' | 'Claim'
  d: number
}
export type EventDataBetLost = {
  _: 'l'
  l: number
}
