import Button from 'components/Button'
import { Header3, BodyText } from 'components/Text'
import DefaultModal from 'components/Modals/DefaultModal'
import ButtonTypes from 'type/Button'
import { DefaultModalProps } from 'type/Props'
import ImageAnimatedOnLoad from 'components/ImageAnimatedOnLoad'

function ModalBody() {
  return (
    <div className="flex flex-col gap-y-4 text-center">
      <ImageAnimatedOnLoad src="img/utya-energy.png" forModal />
      <Header3>Bet Energy</Header3>
      <BodyText className="text-balance">
        <p>You have daily energy for bets, refreshing every 24 hours. </p>
        <br />
        <p>
          Each bet costs one Energy. Win to get rewards; lose, and the energy is
          burned.
        </p>
      </BodyText>
    </div>
  )
}

function ModalFooter({ onClose }: { onClose: () => void }) {
  return (
    <Button buttonType={ButtonTypes.secondary} onClick={onClose}>
      🫡 Understood
    </Button>
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
