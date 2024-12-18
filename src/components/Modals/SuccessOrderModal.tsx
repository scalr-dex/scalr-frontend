import Button from 'components/Button'
import { BodyText, Header3 } from 'components/Text'
import DefaultModal from 'components/Modals/DefaultModal'
import ButtonTypes from 'type/Button'
import { DefaultModalProps } from 'type/Props'
import Check from 'components/icons/Check'
import Rocket from 'components/icons/Rocket'

function ModalBody() {
  return (
    <div>
      <Check size={100} className="text-white mx-auto" />
      <div className="flex flex-col gap-y-2">
        <Header3 className="text-center px-4">Upgrade successful!</Header3>
        <BodyText className="text-center px-4">Enjoy your rewards.</BodyText>
      </div>
    </div>
  )
}

function ModalFooter({ onClose }: { onClose: () => void }) {
  return (
    <Button
      buttonType={ButtonTypes.warmGradient}
      onClick={onClose}
      iconRight={<Rocket />}
    >
      Yay
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
