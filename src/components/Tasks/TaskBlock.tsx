import ButtonSmall from 'components/ButtonSmall'
import { AccentText } from 'components/Text'
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
import { track } from '@amplitude/analytics-browser'
import TrackerEvents from 'type/TrackerEvents'

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
      track(TrackerEvents.taskDone, { taskId: TaskID })
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

  const isSpecial = TaskID === 7

  const opacity = Status === 'Claimed' ? 'opacity-50' : 'opacity-100'
  const specialStyle =
    Status !== 'Claimed' && isSpecial
      ? 'bg-accent -mx-2 py-3 pl-3 pr-2 rounded-3xl'
      : ''

  return (
    <div
      className={`flex flex-row items-center justify-between ${opacity} ${specialStyle}`}
    >
      <div className="flex flex-row items-center gap-x-3">
        <div className="w-6 h-6">{iconNumberToIcon[IconNumber]}</div>
        <div className="flex flex-col gap-y-1">
          <AccentText className="font-bold">{Name} </AccentText>
          <AccentText>+{RewardAmount} pts</AccentText>
        </div>
      </div>
      <ButtonSmall
        buttonType={buttonType}
        className="text-sm font-accent px-2.5 py-1.5"
        onClick={onClick}
        isLoading={loading || onTimer}
        disabled={Status === 'Claimed'}
        allowDisabledClick
      >
        {canClaimAt ? 'Check 👀' : taskStatusToButtonText[Status]}
      </ButtonSmall>
    </div>
  )
}
