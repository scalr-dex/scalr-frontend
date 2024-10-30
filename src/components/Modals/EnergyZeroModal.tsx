import Button from 'components/Button'
import { Header3, BodyText } from 'components/Text'
import DefaultModal from 'components/Modals/DefaultModal'
import ButtonTypes from 'type/Button'
import { DefaultModalProps } from 'type/Props'
import { navigate } from 'wouter-preact/use-hash-location'
import ImageAnimatedOnLoad from 'components/ImageAnimatedOnLoad'

function ModalBody() {
  return (
    <div className="flex flex-col gap-y-4">
      <ImageAnimatedOnLoad src="img/utya-sad.png" className="h-28 mx-auto" />
      <Header3 className="text-center">Energy isn’t ready yet...</Header3>
      <BodyText className="text-balance">
        <p>You’ve maxed out your energy for today, nice work!</p>

        <p>Come back tomorrow for a fresh boost.</p>

        <p>
          Meanwhile, there are other ways to stack points toward the $SCR
          airdrop 👀
        </p>
      </BodyText>
    </div>
  )
}

function ModalFooter({
  onClose,
  setShowFriendsModal,
}: {
  onClose: () => void
  setShowFriendsModal: (bool: boolean) => void
}) {
  return (
    <div className="flex flex-col gap-y-4">
      <Button
        buttonType={ButtonTypes.secondary}
        className="!rounded-full"
        onClick={() => {
          onClose()
          setTimeout(() => setShowFriendsModal(true))
        }}
        haptic={false}
      >
        Invite friends
      </Button>
      <Button
        buttonType={ButtonTypes.neutral}
        className="!rounded-full"
        onClick={() => {
          onClose()
          navigate('/tasks')
        }}
        haptic={false}
      >
        See tasks
      </Button>
    </div>
  )
}

export default function (
  props: DefaultModalProps & {
    setShowFriendsModal: (bool: boolean) => void
  }
) {
  return (
    <DefaultModal
      {...props}
      body={ModalBody}
      footer={(onClose) => (
        <ModalFooter
          onClose={onClose}
          setShowFriendsModal={props.setShowFriendsModal}
        />
      )}
    />
  )
}
