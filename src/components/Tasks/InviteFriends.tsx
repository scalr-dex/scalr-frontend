import { useState } from 'preact/hooks'
import InviteFriendsModal from 'components/Modals/InviteFriendsModal'
import TaskUi from 'components/Tasks/TaskUi'
import TwoUsers from 'components/icons/TwoUsers'

export default function () {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div>
      <TaskUi
        icon={<TwoUsers />}
        rewardAmount={6000}
        onClick={() => setModalOpen(true)}
        taskText="Invite frens"
        extraData="Per each, 20 left today."
      />

      <InviteFriendsModal showModal={modalOpen} setShowModal={setModalOpen} />
    </div>
  )
}
