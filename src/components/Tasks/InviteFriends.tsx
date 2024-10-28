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
        rewardAmount={3000}
        onClick={() => setModalOpen(true)}
        taskText="Invite frens"
        extraData="+6000 for Premium"
      />

      <InviteFriendsModal showModal={modalOpen} setShowModal={setModalOpen} />
    </div>
  )
}
