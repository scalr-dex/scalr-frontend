import Button from 'components/Button'
import { Header3 } from 'components/Text'
import DefaultModal from 'components/Modals/DefaultModal'
import ButtonTypes from 'type/Button'
import { DefaultModalProps } from 'type/Props'

function ModalBody() {
  return (
    <div className="flex flex-col gap-y-4 px-4">
      <img
        src="img/rocket-halftone.png"
        className="h-32 opacity-0 transition-opacity mx-auto"
        onLoad={(e) => (e.currentTarget.style.opacity = '1')}
      />
      <Header3>Scalr Win Multiplier 🚀</Header3>
      <p>Daily Claim refill a Scalr Win Multiplier.</p>
      <p>Click it to activate if available.</p>
      <p>
        Win up to x15 on your next bet. If you lose, only the regular amount is
        lost 🤑
      </p>
    </div>
  )
}

function ModalFooter({ onClose }: { onClose: () => void }) {
  return (
    <Button
      buttonType={ButtonTypes.secondary}
      className="!rounded-full"
      onClick={onClose}
      haptic={false}
    >
      OMG
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
