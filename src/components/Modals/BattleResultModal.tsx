import Button from 'components/Button'
import { BodyText, Header3 } from 'components/Text'
import DefaultModal from 'components/Modals/DefaultModal'
import ButtonTypes from 'type/Button'
import { DefaultModalProps } from 'type/Props'
import Star from 'components/icons/Star'
import UserAtom from 'helpers/atoms/UserAtom'
import { useAtomValue } from 'jotai'
import LeftRightText from 'components/LeftRightText'
import StoryShareButton from 'components/StoryShareButton'

function ModalBody({ amount, didWin }: { amount: number; didWin: boolean }) {
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
      <LeftRightText
        leftText={didWin ? 'Your win' : 'Your losses'}
        rightText={
          <BodyText className={didWin ? 'text-success' : 'text-error'}>
            {didWin ? '+' : '-'}
            {amount}
          </BodyText>
        }
      />
    </>
  )
}

function ModalFooter({
  onClose,
  didWin,
}: {
  onClose: () => void
  didWin: boolean
}) {
  return (
    <div className="fle flex-col gap-y-4">
      <Button
        buttonType={ButtonTypes.secondary}
        className="!rounded-full"
        onClick={onClose}
      >
        Play again
      </Button>
      {didWin ? <StoryShareButton /> : null}
      <Button
        buttonType={ButtonTypes.ghost}
        className="!rounded-full"
        onClick={onClose}
        haptic={false}
      >
        Close
      </Button>
    </div>
  )
}

export default function (
  props: DefaultModalProps & { amount: number; winnerId: number }
) {
  const user = useAtomValue(UserAtom)
  const didWin = !!(user?.telegramId && user.telegramId === props.winnerId)

  return (
    <DefaultModal
      {...props}
      body={() => <ModalBody amount={props.amount} didWin={!!didWin} />}
      footer={(onClose) => <ModalFooter onClose={onClose} didWin={didWin} />}
    />
  )
}
