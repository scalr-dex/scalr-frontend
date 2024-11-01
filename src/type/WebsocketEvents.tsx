export type EventData =
  | EventDataPriceChange
  | EventDataBalanceChange
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

export type BalanceChangeEvent = 'BetWon' | 'Claim' | 'BetLost'

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
export type EventClaim = {
  _: 'c'
  a: number // amount available to claim after completing a task or daily claim
}
