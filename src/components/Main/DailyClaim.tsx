import ButtonSmall from 'components/ButtonSmall'
import dayjs from 'dayjs'
import claimDailyReward from 'helpers/api/dailyReward'
import { useCallback, useState } from 'preact/hooks'
import objectSupport from 'dayjs/plugin/objectSupport'
import ButtonTypes from 'type/Button'
import { useAtom, useSetAtom } from 'jotai'
import UserAtom, { timeToRewardAtom } from 'helpers/atoms/UserAtom'
import TrackerEvents from 'type/TrackerEvents'
import formatUSA from 'helpers/formatters/formatUSA'
import ScalrCoin from 'components/icons/coins/ScalrCoin'
import Logo from 'components/icons/Logo'
import { BodyText } from 'components/Text'
import ClaimTimeoutModal from 'components/Modals/ClaimTimeoutModal'
import InviteFriendsModal from 'components/Modals/InviteFriendsModal'
import { showZeroBalanceModal } from 'helpers/atoms/UserStates'
import ZeroBalanceModal from 'components/Modals/ZeroBalanceModal'
import { track } from 'helpers/api/analytics'

dayjs.extend(objectSupport)

export default function ({ claimAmount }: { claimAmount: number | undefined }) {
  const setUser = useSetAtom(UserAtom)
  const [timeToReward, setTimeToReward] = useAtom(timeToRewardAtom)
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [friendsModal, setShowFriendsModal] = useState(false)
  const [showZeroBalance, setShowZeroBalance] = useAtom(showZeroBalanceModal)

  const seconds = dayjs(timeToReward).diff(dayjs(), 'seconds')
  const canClaim = seconds < 0

  const onClaimClick = useCallback(async () => {
    setLoading(true)
    const newTime = await claimDailyReward()
    if (newTime) setTimeToReward(newTime)

    setUser((prev) => (prev ? { ...prev, boosts: prev.boosts + 1 } : null))

    track(TrackerEvents.claimDailyReward)

    setLoading(false)
  }, [setTimeToReward, setUser])

  const onTimeoutClick = useCallback(() => {
    setShowModal(true)
  }, [])

  const onClick = canClaim ? onClaimClick : onTimeoutClick
  const buttonText = canClaim ? '+' + formatUSA(claimAmount || 0) : 'Get'
  const buttonType = canClaim ? ButtonTypes.special : ButtonTypes.secondary
  const iconRight = canClaim ? (
    <ScalrCoin size={20} />
  ) : (
    <>
      <Logo size={24} className="-ml-0.5" />
      <BodyText className="px-3 py-0.5 bg-tertiary rounded-full text-white">
        {dayjs({ seconds }).format('H[h] mm[m]')}
      </BodyText>
    </>
  )
  const haptic = canClaim ? 'soft' : false

  return (
    <>
      <ButtonSmall
        onClick={onClick}
        buttonType={buttonType}
        iconRight={iconRight}
        isLoading={loading}
        className="transition-all px-2 py-1 h-8 text-sm"
        haptic={haptic}
      >
        {buttonText}
      </ButtonSmall>
      <ZeroBalanceModal
        showModal={showZeroBalance}
        setShowModal={setShowZeroBalance}
        setShowFriendsModal={setShowFriendsModal}
      />
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
