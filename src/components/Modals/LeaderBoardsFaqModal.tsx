import Button from 'components/Button'
import { Header3, AccentText } from 'components/Text'
import DefaultModal from 'components/Modals/DefaultModal'
import ButtonTypes from 'type/Button'
import { DefaultModalProps } from 'type/Props'

function ModalBody() {
  return (
    <>
      <Header3>Scalr Leaderboard</Header3>
      <AccentText>
        Leaderboard updates every 8 hours based on epoch bets volume (including
        wins and losses) 🤑
        <p>Top traders win prizes:</p>
        <br />
        <ul>
          <li>+2000 pts for 1st</li>
          <li>+1000 pts for 2nd</li>
          <li>+500 pts for 3rd</li>
          <li>+200 pts for 4th-10th</li>
          <li>+100 pts for 11th-25th</li>
        </ul>
        <br />
        <p>Keep pushing to climb the ranks!💪</p>
        <br />
      </AccentText>
    </>
  )
}

function ModalFooter({ onClose }: { onClose: () => void }) {
  return (
    <Button
      onClick={onClose}
      buttonType={ButtonTypes.secondary}
      className="!rounded-full"
    >
      Got it
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
