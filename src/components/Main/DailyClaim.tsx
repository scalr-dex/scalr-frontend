import ButtonSmall from 'components/ButtonSmall'
import ChevronRight from 'components/icons/ChevronRight'
import dayjs from 'dayjs'
import claimDailyReward from 'helpers/api/dailyReward'
import { useCallback, useState } from 'preact/hooks'
import ButtonTypes from 'type/Button'

export default function ({
  timeToReward,
}: {
  timeToReward: string | undefined
}) {
  const [loading, setLoading] = useState(false)
  const canClaim = timeToReward ? new Date(timeToReward) <= new Date() : false

  const onClick = useCallback(() => {
    setLoading(true)
    void claimDailyReward().finally(() => setLoading(false))
  }, [])

  return (
    <ButtonSmall
      buttonType={ButtonTypes.special}
      iconRight={canClaim ? <ChevronRight /> : null}
      onClick={onClick}
      disabled={!canClaim}
      isLoading={loading}
      className="px-4 py-1.5"
    >
      {canClaim ? 'Daily Claim' : dayjs(timeToReward).format('HH[h] mm[m]')}
    </ButtonSmall>
  )
}
