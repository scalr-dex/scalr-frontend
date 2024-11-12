import { atomWithStorage } from 'jotai/utils'

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
