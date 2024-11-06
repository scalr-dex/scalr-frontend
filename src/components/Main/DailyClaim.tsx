import ButtonSmall from 'components/ButtonSmall'
import dayjs from 'dayjs'
import ButtonTypes from 'type/Button'
import useTimeToReward from 'helpers/hooks/useTimeToReward'
import ScalrCoin from 'components/icons/coins/ScalrCoin'
import formatUSA from 'helpers/formatters/formatUSA'
import { useAtomValue } from 'jotai'
import UserAtom from 'helpers/atoms/UserAtom'

export default function () {
  const user = useAtomValue(UserAtom)
  const { onClaimClick, canClaim, seconds, loading } = useTimeToReward()

  return (
    <ButtonSmall
      onClick={onClaimClick}
      buttonType={canClaim ? ButtonTypes.special : ButtonTypes.neutral}
      iconRight={canClaim ? <ScalrCoin size={17} /> : null}
      isLoading={loading}
      className="px-3 py-1.25 min-h-9"
    >
      {canClaim && user?.canClaimAmount
        ? '+' + formatUSA(user?.canClaimAmount)
        : dayjs({ seconds }).format('HH[h] mm[m]')}
    </ButtonSmall>
  )
}
