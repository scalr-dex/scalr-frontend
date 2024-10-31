import backendKy from 'helpers/api/backendKy'
import { writeAtom } from 'helpers/atoms/atomStore'
import UserAtom from 'helpers/atoms/UserAtom'
import handleError from 'helpers/handleError'
import TrackerEvents from 'type/TrackerEvents'
import { track } from 'helpers/api/analytics'

export default async function claimDailyReward() {
  try {
    return await backendKy().get('claim').json<string>()
  } catch (e) {
    handleError({ e, toastMessage: 'Failed to claim daily reward 🙇' })
  }
}

export async function onDailyClaim() {
  try {
    const newTime = await claimDailyReward()

    writeAtom(UserAtom, (prev) =>
      prev ? { ...prev, boosts: prev.boosts + 1 } : null
    )

    track(TrackerEvents.claimDailyReward)

    return newTime
  } catch (e) {
    handleError({ e })
  }
}

export function getDailyStreak() {
  return backendKy()
    .get('daily_streak')
    .json<{ last_login_date: string; login_days: number }>()
}

export function getDailyNickname() {
  return backendKy().get('daily_nickname')
}
