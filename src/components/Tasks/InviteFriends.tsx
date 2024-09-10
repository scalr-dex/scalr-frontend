import Button from 'components/Button'
import { useState } from 'preact/hooks'
import ButtonTypes from 'type/Button'
import InviteFriendsModal from 'components/Modals/InviteFriendsModal'

export default function () {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div>
      <Button
        buttonType={ButtonTypes.secondary}
        className="!rounded-full"
        onClick={() => setModalOpen(true)}
      >
        Invite frens
      </Button>
      <InviteFriendsModal showModal={modalOpen} setShowModal={setModalOpen} />
    </div>
  )
}
