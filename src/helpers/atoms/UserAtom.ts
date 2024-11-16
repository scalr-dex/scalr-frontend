import dayjs from 'dayjs'
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { ClientUser, UserBet } from 'type/User'

const UserAtom = atom<ClientUser | null>(null)

export const specialOfferExpiryUnix = 1732449600000
export const specialOfferDisabledAtom = atom((read) => {
  const expired = dayjs(specialOfferExpiryUnix).diff(dayjs()) < 0
  if (expired) return true

  const user = read(UserAtom)
  if (!user) return true

  return dayjs(user.premiumEndDate).diff(dayjs()) > 0
})

export const userBalanceAtom = atom(0) // highly reactive, should be separate from UserAtom

export const timeToRewardAtom = atom<string>('')

export const userBetAtom = atomWithStorage<UserBet | null>('userBet', null)

export default UserAtom
