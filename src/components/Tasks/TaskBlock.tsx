import UserTask, {
  iconNumberToIcon,
  taskStatusToButtonText,
  taskStatusToButtonType,
} from 'type/UserTask'
import { useCallback, useState } from 'preact/hooks'
import { useUtils } from '@telegram-apps/sdk-react'
import { claimTask, markTaskDone } from 'helpers/api/userTasks'
import pendingTasksAtom, {
  failsBeforeClaim,
} from 'helpers/atoms/taskFailCounter'
import { useAtomValue } from 'jotai'
import TrackerEvents from 'type/TrackerEvents'
import { specialTasks } from 'helpers/sortTasks'
import { track } from 'helpers/api/analytics'
import TaskUi from 'components/Tasks/TaskUi'

export default function ({
  IconNumber,
  Name,
  RewardAmount,
  Status,
  TaskID,
  URL,
  refetch,
}: UserTask & { refetch: () => Promise<unknown> }) {
  const failAmount = useAtomValue(pendingTasksAtom)[TaskID]

  const utils = useUtils()
  const [loading, setLoading] = useState(false)
  const buttonType = taskStatusToButtonType[Status]
  const hasClaimed = Status === 'Claimed'

  const onClick = useCallback(async () => {
    setLoading(true)

    if (failAmount >= failsBeforeClaim || Status === 'ReadyToClaim') {
      await claimTask(TaskID)
      await refetch()
      setLoading(false)
      track(TrackerEvents.taskDone, TaskID)
    }
    if (Status === 'NotStarted') {
      setTimeout(async () => {
        await markTaskDone(TaskID)
        await refetch()
        setLoading(false)
      }, 5000)
    }

    // Should be at the end of callback to execute previous functions
    if (Status !== 'ReadyToClaim') {
      URL.includes('t.me') ? utils.openTelegramLink(URL) : utils.openLink(URL)
    }
  }, [failAmount, Status, TaskID, refetch, URL, utils])

  const isSpecial = specialTasks.includes(TaskID)

  const opacity = hasClaimed ? 'opacity-50' : 'opacity-100'
  const specialStyle =
    !hasClaimed && isSpecial ? 'bg-accent -mx-2 py-3 pl-3 pr-2 rounded-2xl' : ''

  return (
    <TaskUi
      className={`${opacity} ${specialStyle}`}
      iconLeft={iconNumberToIcon[IconNumber]}
      taskText={Name}
      rewardAmount={RewardAmount}
      buttonType={buttonType}
      onClick={onClick}
      isLoading={loading}
      disabled={hasClaimed}
    >
      {taskStatusToButtonText[Status]}
    </TaskUi>
  )
}
