import backendKy from 'helpers/api/backendKy'
import handleError from 'helpers/handleError'
import { ServerUser } from 'type/User'

export default async function () {
  try {
    const timeToReward = await backendKy()
      .get('claim')
      .json<ServerUser['can_claim_daily_reward']>()

    return timeToReward
  } catch (e) {
    handleError({ e, toastMessage: 'Failed to claim daily reward 🙇' })
  }
}
