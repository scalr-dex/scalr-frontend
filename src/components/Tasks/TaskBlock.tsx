import UserTask, {
  iconNumberToIcon,
  taskStatusToButtonText,
  taskStatusToButtonType,
  taskStatusToCallback,
} from 'type/UserTask'
import { useCallback, useEffect, useState } from 'preact/hooks'
import { useUtils } from '@telegram-apps/sdk-react'
import dayjs from 'dayjs'
import { markTaskDone } from 'helpers/api/userTasks'
import pendingTasksAtom, {
  clearPendingTask,
} from 'helpers/atoms/pendingTasksAtom'
import { useAtomValue } from 'jotai'
import useCountDown from 'helpers/hooks/useCountDown'
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
  const canClaimAt = useAtomValue(pendingTasksAtom)[TaskID]

  const utils = useUtils()
  const [loading, setLoading] = useState(false)
  const buttonType = taskStatusToButtonType[Status]
  const [time, setTime] = useState(0)
  useCountDown(setTime)

  const onTimer = time > 0

  useEffect(() => {
    if (!canClaimAt) return

    setTime(dayjs(canClaimAt).diff(dayjs(), 'seconds'))
  }, [TaskID, canClaimAt, refetch, time])

  const onClick = useCallback(async () => {
    if (canClaimAt && onTimer) return
    setLoading(true)

    if (canClaimAt) {
      await markTaskDone(TaskID)
      await refetch()
      track(TrackerEvents.taskDone, TaskID)
      clearPendingTask(TaskID)
    } else {
      await taskStatusToCallback[Status](TaskID)
      await refetch()
    }

    setLoading(false)

    // Should be at the end of callback to execute previous functions
    if (Status === 'Claimed' || (Status === 'NotStarted' && !canClaimAt)) {
      URL.includes('t.me') ? utils.openTelegramLink(URL) : utils.openLink(URL)
    }
  }, [canClaimAt, onTimer, Status, utils, URL, TaskID, refetch])

  const isSpecial = specialTasks.includes(TaskID)

  const opacity = Status === 'Claimed' ? 'opacity-50' : 'opacity-100'
  const specialStyle =
    Status !== 'Claimed' && isSpecial
      ? 'bg-accent -mx-2 py-3 pl-3 pr-2 rounded-2xl'
      : ''

  return (
    <TaskUi
      className={`${opacity} ${specialStyle}`}
      iconLeft={iconNumberToIcon[IconNumber]}
      taskText={Name}
      rewardAmount={RewardAmount}
      buttonType={buttonType}
      onClick={onClick}
      isLoading={loading || onTimer}
      disabled={Status === 'Claimed'}
    >
      {canClaimAt ? 'Check 👀' : taskStatusToButtonText[Status]}
    </TaskUi>
  )
}
