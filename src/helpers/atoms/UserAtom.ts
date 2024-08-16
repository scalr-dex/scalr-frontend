import { atom } from 'jotai'
import BetDirection from 'type/BetDirection'
import { ClientUser } from 'type/User'

export default atom<ClientUser | null>(null)

export const userBetAtom = atom<{
  amount: number
  direction: BetDirection
  date: Date
} | null>(null)
