import Button from 'components/Button'
import { BodyText, Header3 } from 'components/Text'
import DefaultModal from 'components/Modals/DefaultModal'
import ButtonTypes from 'type/Button'
import { DefaultModalProps } from 'type/Props'
import Star from 'components/icons/Star'
import UserAtom from 'helpers/atoms/UserAtom'
import { useAtomValue } from 'jotai'

function ModalBody({ amount, winnerId }: { amount: number; winnerId: number }) {
  const user = useAtomValue(UserAtom)
  const didWin = user?.telegramId && user.telegramId === winnerId

  return (
    <>
      <Star className="self-center" />
      <Header3 className="text-center">
        {didWin ? 'You win!' : 'You’ve lost'}
      </Header3>
      <BodyText className="text-center">
        {didWin
          ? 'Congrats!'
          : 'Don’t worry, every loss is a step toward victory'}
      </BodyText>
      <BodyText className={didWin ? 'text-success' : 'text-error'}>
        {amount}
      </BodyText>
    </>
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

export default function (
  props: DefaultModalProps & { amount: number; winnerId: number }
) {
  return (
    <DefaultModal
      {...props}
      body={() => <ModalBody amount={props.amount} winnerId={props.winnerId} />}
      footer={(onClose) => <ModalFooter onClose={onClose} />}
    />
  )
}
