import Button from 'components/Button'
import { Header3 } from 'components/Text'
import DefaultModal from 'components/Modals/DefaultModal'
import ButtonTypes from 'type/Button'
import { DefaultModalProps } from 'type/Props'

function ModalBody() {
  return (
    <>
      <Header3>Battle rules</Header3>
      <p>
        Leaderboard updates every 8 hours based on epoch bets volume (including
        wins and losses) 🤑{' '}
      </p>
      <p>
        Top traders win prizes: +2000 pts for 1st +1000 pts for 2nd +500 pts for
        3rd +200 pts for 4th-10th +100 pts for 11th-25th
      </p>
      <p>Keep pushing to climb the ranks!💪</p>
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
      Let’s gooo ⚔️
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
