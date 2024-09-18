export type EventData =
  | EventDataPriceChange
  | EventDataBalanceChange
  | EventDataBetLost
  | EventBet

export type EventDataPriceChangeSingle = {
  _: 'p'
  p: string
  t: number
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
export type EventBet = {
  _: 'g'
  a: number // amount
  d: boolean // direction, false=short, true=long
  c: number // timestamp
}
export type EventDataBetLost = {
  _: 'l'
  l: number
}
