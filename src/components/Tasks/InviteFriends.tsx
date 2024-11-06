import { useState } from 'react'
import InviteFriendsModal from 'components/Modals/InviteFriendsModal'
import TaskUi from 'components/Tasks/TaskUi'
import TwoUsers from 'components/icons/TwoUsers'
import { useAtomValue } from 'jotai'
import UserAtom from 'helpers/atoms/UserAtom'

export default function () {
  const user = useAtomValue(UserAtom)
  const [modalOpen, setModalOpen] = useState(false)

  const left = user ? user.inviteLimit - user.invitedUsers : 0

  return (
    <div>
      <TaskUi
        icon={<TwoUsers />}
        rewardAmount={6000}
        onClick={() => setModalOpen(true)}
        taskText="Invite frens"
        extraData={`Per each, ${left} left.`}
      />

      <InviteFriendsModal showModal={modalOpen} setShowModal={setModalOpen} />
    </div>
  )
}
