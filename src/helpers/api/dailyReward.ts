import backendKy from 'helpers/api/backendKy'
import { writeAtom } from 'helpers/atoms/atomStore'
import UserAtom from 'helpers/atoms/UserAtom'
import handleError from 'helpers/handleError'
import { ServerUser } from 'type/User'

export default async function () {
  try {
    const timeToReward = await backendKy()
      .get('claim')
      .json<ServerUser['can_claim_daily_reward']>()

    writeAtom(UserAtom, (prev) => {
      if (prev) return { ...prev, timeToReward }
      return null
    })
    return timeToReward
  } catch (e) {
    handleError({ e, toastMessage: 'Failed to claim daily reward 🙇' })
  }
}
