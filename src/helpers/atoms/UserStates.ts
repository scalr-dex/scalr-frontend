import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export default atomWithStorage('didOnboard', false, undefined, {
  getOnInit: true,
})

export const showZeroBalanceModal = atom(false)
