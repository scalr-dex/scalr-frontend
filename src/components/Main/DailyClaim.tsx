import ButtonSmall from 'components/ButtonSmall'
import ChevronRight from 'components/icons/ChevronRight'
import dayjs from 'dayjs'
import claimDailyReward from 'helpers/api/dailyReward'
import { useCallback, useState } from 'preact/hooks'
import objectSupport from 'dayjs/plugin/objectSupport'
import ButtonTypes from 'type/Button'
import { track } from '@amplitude/analytics-browser'
import { useAtom } from 'jotai'
import { timeToRewardAtom } from 'helpers/atoms/UserAtom'
import TrackerEvents from 'type/TrackerEvents'

dayjs.extend(objectSupport)

export default function () {
  const [timeToReward, setTimeToReward] = useAtom(timeToRewardAtom)
  const [loading, setLoading] = useState(false)

  const seconds = dayjs(timeToReward).diff(dayjs(), 'seconds')
  const canClaim = seconds < 0

  const onClick = useCallback(async () => {
    setLoading(true)
    const newTime = await claimDailyReward()
    if (newTime) setTimeToReward(newTime)

    track(TrackerEvents.claimDailyReward)

    setLoading(false)
  }, [setTimeToReward])

  return (
    <ButtonSmall
      buttonType={ButtonTypes.special}
      iconRight={canClaim ? <ChevronRight /> : null}
      onClick={onClick}
      disabled={!canClaim}
      isLoading={loading}
      className="px-4 py-1.5"
    >
      {canClaim ? 'Daily Claim' : dayjs({ seconds }).format('HH[h] mm[m]')}
    </ButtonSmall>
  )
}
