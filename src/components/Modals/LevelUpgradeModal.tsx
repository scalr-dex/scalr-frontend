import Button from 'components/Button'
import { BodyText, Header2 } from 'components/Text'
import DefaultModal from 'components/Modals/DefaultModal'
import ButtonTypes from 'type/Button'
import { DefaultModalProps } from 'type/Props'
import ImageAnimatedOnLoad from 'components/ImageAnimatedOnLoad'
import ScrollFadeOverlay from 'components/ScrollFadeOverlay'
import { useAtom, useAtomValue } from 'jotai'
import UserAtom, { userBalanceAtom } from 'helpers/atoms/UserAtom'
import CheckMark from 'components/icons/CheckMark'
import { useCallback, useState } from 'preact/hooks'
import handleError from 'helpers/handleError'
import { upgradeLevel } from 'helpers/api/placeBet'
import ScalrCoin from 'components/icons/coins/ScalrCoin'

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
          <CheckMark className="mr-1" />

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
          <CheckMark className="mr-1" />

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

function ModalFooter({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = useState(false)
  const userBalance = useAtomValue(userBalanceAtom)
  const [user, setUser] = useAtom(UserAtom)

  const disabled = user ? userBalance < user.level.betUpgradePrice : true

  const onPointsUpgrade = useCallback(async () => {
    try {
      if (disabled) return
      const res = await upgradeLevel()
      console.log(res)

      setUser((prev) =>
        prev
          ? {
              ...prev,
              level: { ...prev.level, current: prev.level.current + 1 },
            }
          : prev
      )
    } catch (e) {
      handleError({ e, toastMessage: 'Failed to upgrade' })
    } finally {
      setLoading(false)
    }
  }, [disabled, setUser])

  return (
    <div className="flex flex-col gap-y-4">
      <Button
        onClick={onClose}
        buttonType={ButtonTypes.secondary}
        isLoading={loading}
      >
        Upgrade for (⭐ 50)
      </Button>
      <Button
        onClick={onPointsUpgrade}
        buttonType={ButtonTypes.secondary}
        isLoading={loading}
        disabled={disabled}
      >
        Upgrade for (258,000 pts)
      </Button>
    </div>
  )
}

export default function (props: DefaultModalProps) {
  return (
    <DefaultModal
      {...props}
      body={ModalBody}
      footer={(onClose) => <ModalFooter onClose={onClose} />}
    />
  )
}
