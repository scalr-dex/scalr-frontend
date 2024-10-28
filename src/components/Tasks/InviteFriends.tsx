import { useState } from 'preact/hooks'
import InviteFriendsModal from 'components/Modals/InviteFriendsModal'
import TaskUi from 'components/Tasks/TaskUi'
import UserCircle from 'components/icons/UserCircle'

export default function () {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div>
      <TaskUi
        icon={<UserCircle />}
        rewardAmount={1500}
        onClick={() => setModalOpen(true)}
        taskText="Invite frens"
        extraData="+3000 for Premium friends"
      />

      <InviteFriendsModal showModal={modalOpen} setShowModal={setModalOpen} />
    </div>
  )
}
