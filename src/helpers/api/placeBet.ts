import backendKy from 'helpers/api/backendKy'
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
  const json = {
    amount: String(amount),
    direction: BetDirection[direction],
    multiplier_enabled: shouldBoost,
  }

  const res = await backendKy()
    .post<{ created_at: number }>('bet/v2', { json })
    .json()
  track(TrackerEvents.placeBet, amount, BetDirection[direction])
  return res
}
