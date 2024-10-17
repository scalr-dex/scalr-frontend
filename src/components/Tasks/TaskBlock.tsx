import UserTask, {
  iconNumberToIcon,
  taskStatusToButtonText,
  taskStatusToButtonType,
} from 'type/UserTask'
import { useCallback, useState } from 'preact/hooks'
import { useUtils } from '@telegram-apps/sdk-react'
import { claimTask, markTaskDone } from 'helpers/api/userTasks'
import {
  taskFailCounterAtom,
  failsBeforeClaim,
  increaseFailAmount,
} from 'helpers/atoms/taskFailCounter'
import { useAtomValue } from 'jotai'
import TrackerEvents from 'type/TrackerEvents'
import { specialTasks } from 'helpers/sortTasks'
import { track } from 'helpers/api/analytics'
import TaskUi from 'components/Tasks/TaskUi'
import handleError from 'helpers/handleError'

export default function ({
  IconNumber,
  Name,
  RewardAmount,
  Status,
  TaskID,
  URL,
  refetch,
}: UserTask & { refetch: () => Promise<unknown> }) {
  const failAmount = useAtomValue(taskFailCounterAtom)[TaskID] || 0

  const utils = useUtils()
  const [loading, setLoading] = useState(false)
  const buttonType = taskStatusToButtonType[Status]
  const hasClaimed = Status === 'Claimed'

  const openTgLink = useCallback(
    (url: string) => {
      url.includes('t.me') ? utils.openTelegramLink(url) : utils.openLink(url)
    },
    [utils]
  )

  const onClick = useCallback(async () => {
    setLoading(true)

    if (failAmount >= failsBeforeClaim && Status !== 'ReadyToClaim') {
      setTimeout(async () => {
        await markTaskDone(TaskID)
        await refetch()
        setLoading(false)
      }, 5000)
      openTgLink(URL)
      return
    }

    if (Status === 'NotStarted') {
      setTimeout(() => {
        handleError({
          e: 'Task iteration',
          sentryCapture: false,
          toastMessage: 'Task not completed. Please try again',
        })
        increaseFailAmount(TaskID)
        setLoading(false)
      }, 5000)
      openTgLink(URL)
      return
    }

    if (Status === 'ReadyToClaim') {
      await claimTask(TaskID)
      await refetch()
      setLoading(false)
      track(TrackerEvents.taskDone, TaskID)
    }
  }, [Status, TaskID, URL, failAmount, openTgLink, refetch])

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
