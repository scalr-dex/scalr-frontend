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

export default function ({
  IconNumber,
  Name,
  RewardAmount,
  Status,
  TaskID,
  URL,
  refetch,
}: UserTask & { refetch: () => void }) {
  const canClaimAt = useAtomValue(pendingTasksAtom)[TaskID]

  const utils = useUtils()
  const [loading, setLoading] = useState(false)
  const buttonType = taskStatusToButtonType[Status]
  const [time, setTime] = useState(dayjs(canClaimAt).diff(dayjs(), 'seconds'))

  const onTimer = canClaimAt && time > 0

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => (prev ? prev - 1 : 0))
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const onClick = useCallback(async () => {
    if (onTimer) return
    setLoading(true)

    console.log(canClaimAt)

    if (canClaimAt) {
      await markTaskDone(TaskID)
      clearPendingTask(TaskID)
    } else await taskStatusToCallback[Status](TaskID)

    setLoading(false)
    refetch()

    if (Status === 'NotStarted') {
      utils.openLink(URL)
    }
  }, [onTimer, canClaimAt, TaskID, Status, refetch, utils, URL])

  const opacity = Status === 'Claimed' ? 'opacity-50' : 'opacity-100'

  return (
    <div className={`flex flex-row items-center justify-between ${opacity}`}>
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
        isLoading={loading}
        disabled={Status === 'Claimed' || time > 0}
      >
        {time > 0
          ? dayjs({ seconds: time }).format('ss[s]')
          : taskStatusToButtonText[Status]}
      </ButtonSmall>
    </div>
  )
}
