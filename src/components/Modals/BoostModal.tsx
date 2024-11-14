import Button from 'components/Button'
import { Header3 } from 'components/Text'
import DefaultModal from 'components/Modals/DefaultModal'
import ButtonTypes from 'type/Button'
import { DefaultModalProps } from 'type/Props'
import ImageAnimatedOnLoad from 'components/ImageAnimatedOnLoad'

function ModalBody() {
  return (
    <div className="flex flex-col gap-y-2">
      <ImageAnimatedOnLoad
        src="img/rocket-halftone.png"
        forModal
        className="mx-auto"
      />
      <Header3>Scalr Win Multiplier 🚀</Header3>
      <div>
        <p>Daily Claim refill a Scalr Win Multiplier.</p>
        <p>Click it to activate if available.</p>
        <p>
          Win up to x15 on your next bet. If you lose, only the regular amount
          is lost 🤑
        </p>
      </div>
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
