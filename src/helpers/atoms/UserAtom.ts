import dayjs from 'dayjs'
import { separateTime } from 'helpers/time'
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { ClientUser, UserBet } from 'type/User'

const UserAtom = atom<ClientUser | null>(null)

export const specialOfferExpiryUnix = 1732449600000

export const specialOfferDisabledAtom = atom((read) => {
  const untilExpiry = dayjs(specialOfferExpiryUnix).diff(dayjs())
  const expired = untilExpiry < 0

  const user = read(UserAtom)

  const premiumTimeLeft = dayjs(user?.premiumEndDate).diff(dayjs())
  const userBoughtExpired = premiumTimeLeft < 0

  return {
    expired,
    premiumTimeLeft,
    userBoughtExpired,
    timerTime:
      expired && userBoughtExpired
        ? { days: 0, hours: 0, minutes: 0 }
        : premiumTimeLeft > 0
          ? separateTime(premiumTimeLeft)
          : separateTime(untilExpiry),
  }
})

export const userBalanceAtom = atom(0) // highly reactive, should be separate from UserAtom

export const timeToRewardAtom = atom<string>('')

export const userBetAtom = atomWithStorage<UserBet | null>('userBet', null)

export default UserAtom
