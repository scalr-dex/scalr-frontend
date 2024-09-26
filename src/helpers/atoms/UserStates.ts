import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import BoostStates from 'type/BoostState'

export default atomWithStorage('didOnboard', false, undefined, {
  getOnInit: true,
})

export const showZeroBalanceModal = atom(false)
export const boostStateAtom = atom(BoostStates.disabled)
