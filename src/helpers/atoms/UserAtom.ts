import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { ClientUser, UserBet } from 'type/User'

export default atom<ClientUser | null>(null)

export const userBalanceAtom = atom(0) // highly reactive, should be separate from UserAtom

export const timeToRewardAtom = atom<string>('')

export const userBetAtom = atomWithStorage<UserBet | null>('userBet', null)
