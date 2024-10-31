import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const nameKeyword = '🌀SCALR'

export default atomWithStorage('didOnboard', false, undefined, {
  getOnInit: true,
})

export const onboardSeason2 = atomWithStorage(
  'onboardSeason2',
  true,
  undefined,
  {
    getOnInit: true,
  }
)

export const showZeroEnergyModal = atom(false)
