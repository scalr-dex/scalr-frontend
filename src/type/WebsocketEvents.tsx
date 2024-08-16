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

export type EventDataPriceChange =
  | EventDataPriceChangeSingle
  | EventDataPriceChangeSingle[]

export type BalanceChangeEvent = 'BetWon' | 'Claim'

export type EventDataBalanceChange = {
  _: 'b'
  b: string
  e: BalanceChangeEvent
  d: number
}
export type EventDataBetLost = {
  _: 'l'
  l: number
}
