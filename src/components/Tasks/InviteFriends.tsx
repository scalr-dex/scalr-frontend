import TaskUi from 'components/Tasks/TaskUi'
import TwoUsers from 'components/icons/TwoUsers'
import { useAtomValue, useSetAtom } from 'jotai'
import UserAtom from 'helpers/atoms/UserAtom'
import modalsAtom, { AvailableModals } from 'helpers/atoms/modalsAtom'

export default function () {
  const user = useAtomValue(UserAtom)
  const setModal = useSetAtom(modalsAtom)

  const left = user ? user.inviteLimit - user.invitedUsers : 0

  return (
    <TaskUi
      icon={<TwoUsers />}
      rewardAmount={6000}
      onClick={() => setModal(AvailableModals.inviteFriends)}
      taskText="Invite frens"
      extraData={`Per each, ${left} left.`}
    />
  )
}
