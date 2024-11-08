import Button from 'components/Button'
import { Header3, BodyText } from 'components/Text'
import DefaultModal from 'components/Modals/DefaultModal'
import ButtonTypes from 'type/Button'
import { DefaultModalProps } from 'type/Props'
import ImageAnimatedOnLoad from 'components/ImageAnimatedOnLoad'
import { useSetAtom } from 'jotai'
import modalsAtom, { AvailableModals } from 'helpers/atoms/modalsAtom'
import { useNavigate } from 'react-router-dom'

function ModalBody() {
  return (
    <div className="flex flex-col gap-y-4">
      <ImageAnimatedOnLoad src="img/utya-sad.png" className="h-28 mx-auto" />
      <Header3 className="text-center">Energy isn’t ready yet...</Header3>
      <BodyText className="text-balance">
        <p>You’ve maxed out your energy for today, nice work!</p>
        <br />
        <p>Come back tomorrow for a fresh boost.</p>
        <br />
        <p>
          Meanwhile, there are other ways to stack points toward the $SCR
          airdrop 👀
        </p>
      </BodyText>
    </div>
  )
}

function ModalFooter({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate()
  const setModal = useSetAtom(modalsAtom)

  return (
    <div className="flex flex-col gap-y-4">
      <Button
        buttonType={ButtonTypes.secondary}
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
