import Button from 'components/Button'
import Close from 'components/icons/Close'
import { Header3 } from 'components/Text'
import DefaultModal from 'components/Modals/DefaultModal'
import { useCallback } from 'preact/hooks'
import ButtonTypes from 'type/Button'
import { DefaultModalProps } from 'type/Props'
import Loader from 'components/Loader'
import ScalrCoin from 'components/icons/coins/ScalrCoin'
import handleError from 'helpers/handleError'
import { quitLobby } from 'helpers/api/battles'
import LeftRightText from 'components/LeftRightText'
import formatUSA from 'helpers/formatters/formatUSA'

type BattleSearchModalProps = { amount: number }

function ModalBody({ amount }: BattleSearchModalProps) {
  return (
    <>
      <Loader size={64} className="self-center" />
      <Header3 className="text-center">Waiting for opponent</Header3>

      <LeftRightText
        leftText="Bet size"
        rightText={
          <>
            <span>{formatUSA(amount)}</span>
            <ScalrCoin className="inline-block" size={16} />
          </>
        }
      />
    </>
  )
}

function ModalHeader({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-row items-center justify-end">
      <Close onClick={onClose} />
    </div>
  )
}

function ModalFooter({ onClose }: { onClose: () => void }) {
  return (
    <Button
      onClick={onClose}
      buttonType={ButtonTypes.secondary}
      className="!rounded-full"
    >
      Cancel
    </Button>
  )
}

export default function ({
  setShowModal,
  showModal,
  amount,
}: DefaultModalProps & BattleSearchModalProps) {
  const onClose = useCallback(async () => {
    try {
      await quitLobby()
      setShowModal(false)
    } catch (e) {
      handleError({ e, toastMessage: 'Failed to exit 😥 Please try agin' })
    }
  }, [setShowModal])

  return (
    <DefaultModal
      showModal={showModal}
      setShowModal={setShowModal}
      onCloseCallback={onClose}
      header={() => <ModalHeader onClose={onClose} />}
      body={() => <ModalBody amount={amount} />}
      footer={() => <ModalFooter onClose={onClose} />}
    />
  )
}
