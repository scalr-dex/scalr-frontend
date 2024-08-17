import { atom } from 'jotai'
import { ClientUser, UserBet } from 'type/User'

export default atom<ClientUser | null>(null)

export const userBetAtom = atom<UserBet | null>(null)
