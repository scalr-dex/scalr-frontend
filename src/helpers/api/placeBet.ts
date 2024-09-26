import backendKy from 'helpers/api/backendKy'
import handleError from 'helpers/handleError'
import BetDirection from 'type/BetDirection'
import TrackerEvents from 'type/TrackerEvents'
import { track } from 'helpers/api/analytics'

export default async function ({
  amount,
  direction,
  shouldBoost,
}: {
  amount: number
  direction: BetDirection
  shouldBoost: boolean
}) {
  try {
    const json = {
      amount: String(amount),
      direction: BetDirection[direction],
      multiplier_enabled: shouldBoost,
    }

    await backendKy().post('bet/v2', { json })
    track(TrackerEvents.placeBet, amount, BetDirection[direction])
    return true
  } catch (e) {
    handleError({ e, toastMessage: 'Failed to place a bet 😥' })
    return false
  }
}
