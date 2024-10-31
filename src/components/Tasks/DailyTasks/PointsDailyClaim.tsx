import TaskUi from 'components/Tasks/TaskUi'
import UserAtom from 'helpers/atoms/UserAtom'
import useTimeToReward from 'helpers/hooks/useTimeToReward'
import { useAtomValue } from 'jotai'
import { iconNumberToComponent } from 'type/UserTask'

export default function () {
  const user = useAtomValue(UserAtom)
  const { canClaim, onClaimClick } = useTimeToReward()

  return (
    <TaskUi
      icon={iconNumberToComponent(-1)}
      taskText="Daily points claim"
      rewardAmount={user?.canClaimAmount || 500}
      disabled={!canClaim}
      onClick={onClaimClick}
    />
  )
}
