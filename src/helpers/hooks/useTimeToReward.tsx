import dayjs from 'dayjs'
import { onDailyClaim } from 'helpers/api/dailyReward'
import { timeToRewardAtom } from 'helpers/atoms/UserAtom'
import { successConfetti } from 'helpers/shootConfetti'
import { useAtom } from 'jotai'
import { useCallback, useState } from 'preact/hooks'

export default function () {
  const [loading, setLoading] = useState(false)
  const [timeToReward, setTimeToReward] = useAtom(timeToRewardAtom)

  const seconds = dayjs(timeToReward).diff(dayjs(), 'seconds')
  const canClaim = seconds < 0

  const onClaimClick = useCallback(async () => {
    setLoading(true)

    const newTime = await onDailyClaim()
    if (newTime) setTimeToReward(newTime)
    await successConfetti()
    setLoading(false)
  }, [setTimeToReward])

  return { loading, canClaim, onClaimClick, seconds }
}
