import ButtonSmall from 'components/ButtonSmall'
import dayjs from 'dayjs'
import { useCallback, useState } from 'preact/hooks'
import objectSupport from 'dayjs/plugin/objectSupport'
import ButtonTypes from 'type/Button'
import { useAtom } from 'jotai'
import formatUSA from 'helpers/formatters/formatUSA'
import ScalrCoin from 'components/icons/coins/ScalrCoin'
import Logo from 'components/icons/Logo'
import { BodyText } from 'components/Text'
import ClaimTimeoutModal from 'components/Modals/ClaimTimeoutModal'
import InviteFriendsModal from 'components/Modals/InviteFriendsModal'
import { showZeroBalanceModal } from 'helpers/atoms/UserStates'
import ZeroBalanceModal from 'components/Modals/ZeroBalanceModal'
import useTimeToReward from 'helpers/hooks/useTimeToReward'

dayjs.extend(objectSupport)

export default function ({ claimAmount }: { claimAmount: number | undefined }) {
  const { canClaim, loading, onClaimClick, seconds } = useTimeToReward()
  const [showModal, setShowModal] = useState(false)
  const [friendsModal, setShowFriendsModal] = useState(false)
  const [showZeroBalance, setShowZeroBalance] = useAtom(showZeroBalanceModal)

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
      <BodyText className="w-16 py-0.5 bg-tertiary rounded-full text-white">
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
        className="transition-all px-2 py-1 h-8 text-sm !min-w-24"
        haptic={haptic}
      >
        {buttonText}
      </ButtonSmall>
      <ZeroBalanceModal
        showModal={showZeroBalance}
        setShowModal={setShowZeroBalance}
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
