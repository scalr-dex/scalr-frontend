import Button from 'components/Button'
import { Header3, BodyText } from 'components/Text'
import DefaultModal from 'components/Modals/DefaultModal'
import ButtonTypes from 'type/Button'
import { DefaultModalProps } from 'type/Props'
import { navigate } from 'wouter/use-hash-location'
import { useSetAtom } from 'jotai'
import modalsAtom, { AvailableModals } from 'helpers/atoms/modalsAtom'
import ImageAnimatedOnLoad from 'components/ImageAnimatedOnLoad'

function ModalBody() {
  return (
    <>
      <ImageAnimatedOnLoad src="img/utya-sad.png" forModal />

      <Header3>Claim isn't ready yet, but...</Header3>
      <BodyText>
        Get points by <span className="italic">completing tasks</span> and{' '}
        <span className="italic">inviting friends</span>. Instantly add rewards
        to your daily claim total.
      </BodyText>
      <BodyText className="text-controls-tertiary-focus">
        Claimed amounts count toward the $SCR airdrop distribution 👀
      </BodyText>
    </>
  )
}

function ModalFooter({ onClose }: { onClose: () => void }) {
  const setModal = useSetAtom(modalsAtom)

  return (
    <div className="flex flex-col gap-y-4">
      <Button
        buttonType={ButtonTypes.secondary}
        className="!rounded-full"
        onClick={() => {
          onClose()
          setTimeout(() => setModal(AvailableModals.inviteFriends), 200)
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

export default function (props: DefaultModalProps) {
  return (
    <DefaultModal
      {...props}
      body={ModalBody}
      footer={(onClose) => <ModalFooter onClose={onClose} />}
    />
  )
}
