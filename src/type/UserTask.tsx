import CheckMark from 'components/icons/CheckMark'
import Telegram from 'components/icons/socials/Telegram'
import X from 'components/icons/socials/X'
import { claimTask } from 'helpers/api/userTasks'
import { setTaskPending } from 'helpers/atoms/pendingTasksAtom'
import { JSX } from 'preact/jsx-runtime'
import ButtonTypes from 'type/Button'

export type TaskStatus = 'NotStarted' | 'ReadyToClaim' | 'Claimed'

export default interface UserTask {
  IconNumber: number
  Name: string
  RewardAmount: number
  Status: TaskStatus
  TaskID: number
  URL: string

  canClaimAt?: number | undefined
}

export const iconNumberToIcon = {
  1: <Telegram />,
  2: <X />,
} as { [num: number]: JSX.Element }

export const taskStatusToButtonType = {
  NotStarted: ButtonTypes.secondary,
  ReadyToClaim: ButtonTypes.success,
  Claimed: ButtonTypes.success,
}

export const taskStatusToButtonText = {
  NotStarted: 'Start',
  ReadyToClaim: 'Claim',
  Claimed: <CheckMark size={18} />,
}

export const taskStatusToCallback = {
  NotStarted: setTaskPending,
  ReadyToClaim: claimTask,
  Claimed: Promise.resolve,
}
