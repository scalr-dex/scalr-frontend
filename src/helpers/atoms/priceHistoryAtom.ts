import { atom } from 'jotai'
import { GraphTokenData } from 'type/TokenState'

export default atom<GraphTokenData[]>([])

export const dataMaxLength = 40
export const tick = 1000
export const roundDurationMs = 11 * tick
