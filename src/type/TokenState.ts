export type TokenState = { date: number; price: number }
export type TokenStates = TokenState[]

// value is tuple of [date, price], fot TS purposes we give this type
export type GraphTokenData = { name: string; value: number[] }[]
