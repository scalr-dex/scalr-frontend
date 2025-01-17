import Button from 'components/Button'
import { Header2 } from 'components/Text'
import DefaultModal from 'components/Modals/DefaultModal'
import ButtonTypes from 'type/Button'
import { DefaultModalProps } from 'type/Props'
import ImageAnimatedOnLoad from 'components/ImageAnimatedOnLoad'
import { useCallback } from 'react'
import PillAmount from 'components/PillAmount'
import LimitedOffer from 'components/LimitedOffer'
import Battery from 'components/icons/Battery'
import Rocket from 'components/icons/Rocket'
import ScalrCoinDark from 'components/icons/coins/ScalrCoinDark'
import BubbleTimer from 'components/BubbleTimer'
import {
  didSeeSpecialOfferAtom,
  specialOfferInvoiceLink,
} from 'helpers/atoms/UserStates'
import handleStarPayment from 'helpers/telegram/handleStarPayment'
import { useAtomValue } from 'jotai'
import { specialOfferDisabledAtom } from 'helpers/atoms/UserAtom'
import { writeAtom } from 'helpers/atoms/atomStore'

function ModalBody() {
  const { expired, userBoughtExpired, premiumTimeLeft, timerTime } =
    useAtomValue(specialOfferDisabledAtom)

  const text =
    expired && userBoughtExpired
      ? 'The offer has expired'
      : premiumTimeLeft > 0
        ? 'Premium time left'
        : 'Purchase extra daily energy, multipliers, and claims for 1 week!'

  return (
    <div className="flex flex-col gap-y-8 text-center items-center justify-center">
      <ImageAnimatedOnLoad src="img/special-7days.png" forModal />
      <div className="flex flex-col gap-y-4 items-center">
        <LimitedOffer />
        <div className="flex flex-row gap-x-1">
          <PillAmount amount="+5" bg="bg-controls-tertiary text-white/50">
            <Battery size={16} />
          </PillAmount>
          <PillAmount amount="+3" bg="bg-controls-tertiary text-white/50">
            <Rocket />
          </PillAmount>
          <PillAmount amount="+3,000" bg="bg-controls-tertiary text-white/50">
            <ScalrCoinDark size={16} />
          </PillAmount>
        </div>
        <Header2>{text}</Header2>
      </div>
      <BubbleTimer {...timerTime} />
    </div>
  )
}

function ModalFooter() {
  const { expired, userBoughtExpired } = useAtomValue(specialOfferDisabledAtom)
  const onClick = useCallback(() => {
    void handleStarPayment({ link: specialOfferInvoiceLink })
  }, [])

  const disabled = expired || !userBoughtExpired

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      buttonType={disabled ? ButtonTypes.secondary : ButtonTypes.alt}
      className="h-12.5"
      iconRight={disabled ? null : <PillAmount />}
    >
      {disabled ? 'Activated' : 'Purchase for'}
    </Button>
  )
}

export default function (props: DefaultModalProps) {
  return (
    <DefaultModal
      {...props}
      body={ModalBody}
      footer={ModalFooter}
      onCloseCallback={() => writeAtom(didSeeSpecialOfferAtom, true)}
    />
  )
}
