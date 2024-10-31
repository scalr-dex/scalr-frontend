import backendKy from 'helpers/api/backendKy'
import handleError from 'helpers/handleError'
import BetDirection from 'type/BetDirection'
import TrackerEvents from 'type/TrackerEvents'
import { track } from 'helpers/api/analytics'

export default async function ({ direction }: { direction: BetDirection }) {
  try {
    const json = {
      direction: BetDirection[direction],
    }

    await backendKy().post('bet/v2', { json })
    track(TrackerEvents.placeBet, direction)
    return true
  } catch (e) {
    handleError({ e, toastMessage: 'Failed to place a bet 😥' })
    return false
  }
}
