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
        <p>The leaderboard shows your all-time points total.</p>
        <br />
        <p>
          Keep climbing the ranks to secure a bigger share of the airdrop
          rewards! 💪
        </p>
      </AccentText>
    </>
  )
}

function ModalFooter({ onClose }: { onClose: () => void }) {
  return (
    <Button onClick={onClose} buttonType={ButtonTypes.secondary}>
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
