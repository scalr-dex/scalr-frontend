import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import BoostStates from 'type/BoostStates'

export const nameKeyword = '🌀SCALR'

export const didOnboardAtom = atomWithStorage('didOnboard', false, undefined, {
  getOnInit: true,
})

export const onboardedS2Atom = atomWithStorage(
  'onboardedS2',
  false,
  undefined,
  {
    getOnInit: true,
  }
)

export const boostStateAtom = atom(BoostStates.disabled)
export const specialOfferExpiryUnix = 1732449600000
export const specialOfferInvoiceLink =
  'https://t.me/$LNEnnELloEnKCgAA3RdBk2lmjLk'
