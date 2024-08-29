import ButtonSmall from 'components/ButtonSmall'
import ChevronRight from 'components/icons/ChevronRight'
import dayjs from 'dayjs'
import claimDailyReward from 'helpers/api/dailyReward'
import { useCallback, useState } from 'preact/hooks'
import objectSupport from 'dayjs/plugin/objectSupport'
import ButtonTypes from 'type/Button'
import { track } from '@amplitude/analytics-browser'
import { useSetAtom } from 'jotai'
import UserAtom from 'helpers/atoms/UserAtom'

dayjs.extend(objectSupport)

export default function ({
  timeToReward,
}: {
  timeToReward: string | undefined
}) {
  const setUserAtom = useSetAtom(UserAtom)
  const [loading, setLoading] = useState(false)

  const seconds = dayjs(timeToReward).diff(dayjs(), 'seconds')
  const canClaim = seconds < 0

  const onClick = useCallback(async () => {
    setLoading(true)
    const timeToReward = await claimDailyReward()

    if (timeToReward)
      setUserAtom((prev) => {
        if (prev) return { ...prev, timeToReward }
        return null
      })

    track('claimDailyReward')

    setLoading(false)
  }, [setUserAtom])

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
