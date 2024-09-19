import ButtonSmall from 'components/ButtonSmall'
import dayjs from 'dayjs'
import claimDailyReward from 'helpers/api/dailyReward'
import { useCallback, useState } from 'preact/hooks'
import objectSupport from 'dayjs/plugin/objectSupport'
import ButtonTypes from 'type/Button'
import { track } from '@amplitude/analytics-browser'
import { useAtom } from 'jotai'
import { timeToRewardAtom } from 'helpers/atoms/UserAtom'
import TrackerEvents from 'type/TrackerEvents'
import formatUSA from 'helpers/formatters/formatUSA'
import ScalrCoin from 'components/icons/coins/ScalrCoin'
import Logo from 'components/icons/Logo'
import { BodyText } from 'components/Text'
import ClaimTimeoutModal from 'components/Modals/ClaimTimeoutModal'
import InviteFriendsModal from 'components/Modals/InviteFriendsModal'

dayjs.extend(objectSupport)

export default function ({ claimAmount }: { claimAmount: number | undefined }) {
  const [timeToReward, setTimeToReward] = useAtom(timeToRewardAtom)
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [friendsModal, setShowFriendsModal] = useState(false)

  const seconds = dayjs(timeToReward).diff(dayjs(), 'seconds')
  const canClaim = seconds < 0

  const onClaimClick = useCallback(async () => {
    setLoading(true)
    const newTime = await claimDailyReward()
    if (newTime) setTimeToReward(newTime)

    track(TrackerEvents.claimDailyReward)

    setLoading(false)
  }, [setTimeToReward])

  const onTimeoutClick = useCallback(() => {
    setShowModal(true)
  }, [])

  const onClick = canClaim ? onClaimClick : onTimeoutClick
  const buttonText = canClaim
    ? '+' + formatUSA(claimAmount || 0) + ' pts'
    : 'Get'
  const buttonType = canClaim ? ButtonTypes.special : ButtonTypes.secondary
  const iconRight = canClaim ? (
    <ScalrCoin size={17} />
  ) : (
    <>
      <Logo size={24} />
      <BodyText className="px-3 py-0.5 bg-tertiary rounded-full text-white">
        {dayjs({ seconds }).format('H[h] mm[m]')}
      </BodyText>
    </>
  )

  return (
    <>
      <ButtonSmall
        onClick={onClick}
        buttonType={buttonType}
        iconRight={iconRight}
        isLoading={loading}
        className="transition-all px-4 py-1.5 select-non h-9"
      >
        {buttonText}
      </ButtonSmall>
      <ClaimTimeoutModal
        showModal={showModal}
        setShowModal={setShowModal}
        setShowFriendsModal={setShowFriendsModal}
      />
      <InviteFriendsModal
        showModal={friendsModal}
        setShowModal={setShowFriendsModal}
      />
    </>
  )
}
