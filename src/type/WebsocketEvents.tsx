export type EventData =
  | EventDataPriceChange
  | EventDataBalanceChange
  | EventDataBetLost
  | EventClaim
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
  l: number // lost amount
}
export type EventClaim = {
  _: 'c'
  a: number // amount available to claim after completing a task or daily claim
}
