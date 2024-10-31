import UserTask, { iconNumberToComponent } from 'type/UserTask'
import { useState } from 'preact/hooks'
import { specialTasks } from 'helpers/sortTasks'
import TaskUi from 'components/Tasks/TaskUi'
import TaskIcon from 'components/Tasks/TaskIcon'
import TaskModal from 'components/Modals/TaskModal'

export default function (
  props: UserTask & { refetch: () => Promise<unknown> }
) {
  const { IconNumber, IconURL, Name, RewardAmount, Status, TaskID } = props

  const [modalOpen, setModalOpen] = useState(false)
  const hasClaimed = Status === 'Claimed'

  const isSpecial = specialTasks.includes(TaskID)

  const opacity = hasClaimed ? 'opacity-50' : 'opacity-100'
  const specialStyle =
    !hasClaimed && isSpecial ? 'bg-accent -mx-2 py-3 pl-3 pr-2 rounded-2xl' : ''

  return (
    <>
      <TaskUi
        className={`${opacity} ${specialStyle}`}
        icon={
          IconURL ? (
            <TaskIcon src={IconURL} />
          ) : (
            iconNumberToComponent(IconNumber)
          )
        }
        taskText={Name}
        rewardAmount={RewardAmount}
        onClick={() => setModalOpen(true)}
        disabled={hasClaimed}
      />
      <TaskModal {...props} showModal={modalOpen} setShowModal={setModalOpen} />
    </>
  )
}
