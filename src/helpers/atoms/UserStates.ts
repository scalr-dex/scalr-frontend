import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const nameKeyword = '🌀SCALR'

export default atomWithStorage('didOnboard', false, undefined, {
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

export const showZeroEnergyModal = atom(false)
export const showDailyStreakModal = atom(false)
