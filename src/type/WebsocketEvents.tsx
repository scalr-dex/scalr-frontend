export type EventData =
  | EventDataPriceChange
  | EventDataBalanceChange
  | EventDataBetLost
  | EventClaim

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
  l: number // lost amount
}
export type EventClaim = {
  _: 'c'
  a: number // amount available to claim after completing a task or daily claim
}
