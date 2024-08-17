import Button from 'components/Button'
import CardWrapper from 'components/CardWrapper'
import { AccentText, Header4 } from 'components/icons/Text'
import { useState } from 'preact/hooks'
import ButtonTypes from 'type/Button'
import InviteFriendsModal from 'components/Modals/InviteFriendsModal'

export default function () {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="flex flex-col justify-end flex-1">
      <Header4>Invite frens</Header4>
      <CardWrapper className="gap-y-4">
        <AccentText>Receive points for each friend</AccentText>
        <Button
          buttonType={ButtonTypes.secondary}
          className="!rounded-full"
          onClick={() => setModalOpen(true)}
        >
          Invite frens
        </Button>
      </CardWrapper>
      <InviteFriendsModal showModal={modalOpen} setShowModal={setModalOpen} />
    </div>
  )
}
