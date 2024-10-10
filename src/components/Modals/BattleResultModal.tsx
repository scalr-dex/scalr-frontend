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
import { useCallback } from 'preact/hooks'

type BattleResultModalProps = {
  betSize: number
  amount: number
  winnerId: number
  onPlayAgain: () => void
}

function ModalBody({
  amount,
  didWin,
  betSize,
}: {
  amount: number
  didWin: boolean
  betSize: number
}) {
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
            {didWin ? amount : betSize}
          </BodyText>
        }
      />
    </>
  )
}

function ModalFooter({
  onClose,
  didWin,
  onPlayAgain,
}: {
  onClose: () => void
  didWin: boolean
  onPlayAgain: () => void
}) {
  const playAgain = useCallback(() => {
    onClose()
    onPlayAgain()
  }, [onClose, onPlayAgain])

  return (
    <div className="fle flex-col gap-y-4">
      <Button
        buttonType={ButtonTypes.secondary}
        rounded="rounded-full"
        onClick={playAgain}
      >
        Play again
      </Button>
      {didWin ? <StoryShareButton /> : null}
    </div>
  )
}

export default function (props: DefaultModalProps & BattleResultModalProps) {
  const user = useAtomValue(UserAtom)
  const didWin = !!(user?.telegramId && user.telegramId === props.winnerId)

  return (
    <DefaultModal
      {...props}
      body={() => (
        <ModalBody
          amount={props.amount}
          didWin={!!didWin}
          betSize={props.betSize}
        />
      )}
      footer={(onClose) => (
        <ModalFooter
          onClose={onClose}
          didWin={didWin}
          onPlayAgain={props.onPlayAgain}
        />
      )}
    />
  )
}
