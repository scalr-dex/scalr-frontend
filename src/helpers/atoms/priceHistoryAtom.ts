import { atom } from 'jotai'
import { GraphTokenData, TokenState } from 'type/TokenState'

export default atom<GraphTokenData[]>([])

export const roundDurationMs = 30 * 1000
export const previousRoundAtom = atom<TokenState | null>(null)
