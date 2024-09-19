import Button from 'components/Button'
import { Header3, BodyText } from 'components/Text'
import DefaultModal from 'components/Modals/DefaultModal'
import ButtonTypes from 'type/Button'
import { DefaultModalProps } from 'type/Props'
import { navigate } from 'wouter-preact/use-hash-location'

function ModalBody() {
  return (
    <>
      <img src="img/utya-sad.png" className="w-36 mx-auto" />
      <Header3>Claim isn't ready yet, but...</Header3>
      <BodyText>
        <span className="italic">
          Get points by completing tasks and inviting friends.
        </span>{' '}
        Instantly add rewards to your daily claim total.
      </BodyText>
      <BodyText className="text-controls-tertiary-focus">
        Claimed amounts count toward the $SCR airdrop distribution 👀
      </BodyText>
    </>
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
