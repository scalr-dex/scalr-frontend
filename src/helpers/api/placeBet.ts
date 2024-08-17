import { track } from '@amplitude/analytics-browser'
import backendKy from 'helpers/api/backendKy'
import handleError from 'helpers/handleError'
import BetDirection from 'type/BetDirection'

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
    track('placeBet', { amount, direction })
  } catch (e) {
    handleError({ e, toastMessage: 'Failed to place a bet 😥' })
  }
}
