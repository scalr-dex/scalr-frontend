import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { ClientUser, UserBet } from 'type/User'

export default atom<ClientUser | null>(null)

export const userBetAtom = atomWithStorage<UserBet | null>('userBet', null)
