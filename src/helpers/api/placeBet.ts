import { track } from '@amplitude/analytics-browser'
import backendKy from 'helpers/api/backendKy'
import handleError from 'helpers/handleError'
import BetDirection from 'type/BetDirection'
import TrackerEvents from 'type/TrackerEvents'

export default async function ({
  amount,
  direction,
}: {
  amount: number
  direction: BetDirection
}) {
  try {
    const json = {
      amount: String(amount),
      direction: BetDirection[direction],
    }

    await backendKy().post('bet', { json })
    track(TrackerEvents.placeBet, { amount, direction })
    return true
  } catch (e) {
    handleError({ e, toastMessage: 'Failed to place a bet 😥' })
    return false
  }
}
