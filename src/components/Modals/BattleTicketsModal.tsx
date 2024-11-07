import Button from 'components/Button'
import { BodyText, Header3 } from 'components/Text'
import DefaultModal from 'components/Modals/DefaultModal'
import ButtonTypes from 'type/Button'
import { DefaultModalProps } from 'type/Props'
import ImageAnimatedOnLoad from 'components/ImageAnimatedOnLoad'

function ModalBody() {
  return (
    <>
      <ImageAnimatedOnLoad src="vid/utya-pair.gif" forModal />
      <Header3 className="text-center px-4">Battle Tickets</Header3>
      <BodyText className="text-center px-4">
        <p>Your Battle Tickets are on the way! 🎟️</p>
        <br />
        <p>
          Soon, you’ll be able to view your ticket balance, acquire additional
          tickets, and access more items.
        </p>
      </BodyText>
    </>
  )
}

function ModalFooter({ onClose }: { onClose: () => void }) {
  return (
    <Button buttonType={ButtonTypes.secondary} onClick={onClose}>
      🫡 Will wait
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
