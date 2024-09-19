import BetDirection from 'type/BetDirection'

export type TokenState = { date: number; price: number }
export type TokenStates = TokenState[]

// value is tuple of [unixDate, price], fot TS purposes we give this type
export type GraphTokenValue = number[]

export type GraphTokenData = {
  name: string
  value: GraphTokenValue
  userBet?: BetDirection
}
