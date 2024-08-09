import { atomWithStorage } from 'jotai/utils'

export default atomWithStorage('didOnboard', false, undefined, {
  getOnInit: true,
})
