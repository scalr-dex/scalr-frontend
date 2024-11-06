import Button from 'components/Button'
import { BodyText, Header2 } from 'components/Text'
import DefaultModal from 'components/Modals/DefaultModal'
import ButtonTypes from 'type/Button'
import { DefaultModalProps } from 'type/Props'
import ImageAnimatedOnLoad from 'components/ImageAnimatedOnLoad'
import ScrollFadeOverlay from 'components/ScrollFadeOverlay'
import { useAtom, useAtomValue } from 'jotai'
import UserAtom, { userBalanceAtom } from 'helpers/atoms/UserAtom'
import { useCallback, useState } from 'react'
import handleError from 'helpers/handleError'
import { upgradeLevel } from 'helpers/api/placeBet'
import ScalrCoin from 'components/icons/coins/ScalrCoin'
import Check from 'components/icons/Check'
import Star from 'components/icons/Star'
import formatUSA from 'helpers/formatters/formatUSA'
import { successConfetti } from 'helpers/shootConfetti'

function ModalBody() {
  const user = useAtomValue(UserAtom)

  if (!user) return null

  return (
    <>
      <ImageAnimatedOnLoad src="img/utya-win.png" forModal />
      <div className="flex flex-col gap-y-4 text-center">
        <Header2>Reward Amount</Header2>
        <BodyText>
          Upgrade your level to increase bet size and unlock higher rewards.
        </BodyText>

        <div className="flex flex-row gap-x-2">
          <Check className="mr-1" />

          <span className="line-through text-white/50">
            {user.level.betWin}
          </span>
          <b>
            {user.level.betWin + 500}{' '}
            <ScalrCoin size={20} className="inline-block" />
          </b>
          <span>for a win</span>
        </div>

        <div className="flex flex-row gap-x-2">
          <Check className="mr-1" />

          <span className="line-through text-white/50">
            {user.level.betLoss}
          </span>
          <b>
            {user.level.betLoss + 100}{' '}
            <ScalrCoin size={20} className="inline-block" />
          </b>
          <span>for a loss</span>
        </div>
      </div>
      <ScrollFadeOverlay />
    </>
  )
}

function ModalFooter() {
  const [pointsLoading, setPointsLoading] = useState(false)
  const [starsLoading, setStarsLoading] = useState(false)
  const userBalance = useAtomValue(userBalanceAtom)
  const [user, setUser] = useAtom(UserAtom)

  const disabled = user ? userBalance < user.level.betUpgradePrice : true

  const onPointsUpgrade = useCallback(async () => {
    try {
      if (disabled) return
      const { bet_level, bet_loss, bet_size, bet_upgrade_price, bet_win } =
        await upgradeLevel()

      setUser((prev) =>
        prev
          ? {
              ...prev,
              level: {
                current: bet_level,
                betLoss: bet_loss,
                betSize: bet_size,
                betUpgradePrice: bet_upgrade_price,
                betWin: bet_win,
              },
            }
          : prev
      )

      await successConfetti()
    } catch (e) {
      handleError({ e, toastMessage: 'Failed to upgrade' })
    } finally {
      setPointsLoading(false)
      setStarsLoading(false)
    }
  }, [disabled, setUser])

  return (
    <div className="flex flex-col gap-y-4">
      <Button
        onClick={() => {
          setStarsLoading(true)
          void onPointsUpgrade()
        }}
        buttonType={ButtonTypes.secondary}
        isLoading={starsLoading}
        disabled={pointsLoading}
        className="h-12.5"
        iconRight={
          <div className="flex flex-row gap-x-1 items-center rounded-full bg-tertiary pl-1 pr-2 py-1">
            <Star size={20} />
            <BodyText className="font-semibold text-sm text-white">50</BodyText>
          </div>
        }
      >
        Upgrade for
      </Button>
      <Button
        onClick={() => {
          setPointsLoading(true)
          void onPointsUpgrade()
        }}
        buttonType={ButtonTypes.secondary}
        isLoading={pointsLoading}
        disabled={disabled || starsLoading}
        className="h-12.5"
        iconRight={
          <div className="flex flex-row gap-x-1 items-center rounded-full bg-tertiary pl-1 pr-2 py-1">
            <ScalrCoin size={20} />
            <BodyText className="font-semibold text-sm text-white">
              {formatUSA(user?.level.betUpgradePrice || 0)}
            </BodyText>
          </div>
        }
      >
        Upgrade for
      </Button>
    </div>
  )
}

export default function (props: DefaultModalProps) {
  return <DefaultModal {...props} body={ModalBody} footer={ModalFooter} />
}
