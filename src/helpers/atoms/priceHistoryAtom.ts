import { atom } from 'jotai'
import { GraphTokenData, TokenState } from 'type/TokenState'

export default atom<GraphTokenData[]>([])

export const tick = 1000
export const roundDurationMs = 30 * tick
export const previousRoundAtom = atom<TokenState | null>(null)
