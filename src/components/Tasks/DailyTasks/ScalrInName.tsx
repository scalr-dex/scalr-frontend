import TaskUi from 'components/Tasks/TaskUi'
import UserAtom from 'helpers/atoms/UserAtom'
import { useAtomValue } from 'jotai'
import { iconNumberToComponent } from 'type/UserTask'

export default function () {
  const user = useAtomValue(UserAtom)
  const canCheck = !!user?.nicknameClaimAvailable

  return (
    <TaskUi
      icon={iconNumberToComponent(0)}
      taskText="🌀 SCALR in name"
      rewardAmount={500}
      disabled={!canCheck}
    />
  )
}
