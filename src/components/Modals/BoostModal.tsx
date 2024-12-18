import Button from 'components/Button'
import { BodyText, Header3 } from 'components/Text'
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
      <Header3>No Available Boosters ;( 🚀</Header3>
      <BodyText>Win up to x5 on your next bet 🤑</BodyText>
      <BodyText className="text-controls-tertiary-focus">
        Click it to activate when available.
      </BodyText>
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
