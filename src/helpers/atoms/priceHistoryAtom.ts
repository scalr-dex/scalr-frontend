import { atom } from 'jotai'
import { GraphTokenData } from 'type/TokenState'

export default atom<GraphTokenData[]>([])

export const tick = 1000
export const roundDurationMs = 10 * tick
