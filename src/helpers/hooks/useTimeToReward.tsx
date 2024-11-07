import { track } from '@amplitude/analytics-browser'
import dayjs from 'dayjs'
import claimDailyReward from 'helpers/api/dailyReward'
import modalsAtom, { AvailableModals } from 'helpers/atoms/modalsAtom'
import { timeToRewardAtom } from 'helpers/atoms/UserAtom'
import handleError from 'helpers/handleError'
import { useAtom, useSetAtom } from 'jotai'
import TrackerEvents from 'type/TrackerEvents'
import { useCallback, useState } from 'react'

export default function () {
  const setModal = useSetAtom(modalsAtom)
  const [loading, setLoading] = useState(false)
  const [timeToReward, setTimeToReward] = useAtom(timeToRewardAtom)

  const seconds = dayjs(timeToReward).diff(dayjs(), 'seconds')
  const canClaim = seconds < 0

  const onClaimClick = useCallback(async () => {
    if (!canClaim) {
      setModal(AvailableModals.dailyRewardTimeout)
      return
    }

    try {
      setLoading(true)

      const newTime = await claimDailyReward()
      setTimeToReward(newTime)

      track(TrackerEvents.claimDailyReward)
    } catch (e) {
      handleError({ e, toastMessage: 'Failed to claim' })
    } finally {
      setLoading(false)
    }
  }, [canClaim, setModal, setTimeToReward])

  return { loading, canClaim, onClaimClick, seconds }
}
