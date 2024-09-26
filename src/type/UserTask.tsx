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
  0: <span className="font-bold">AD</span>, // reserved for ads
  1: <Telegram />,
  2: <X />,
  3: <img src="img/collabs/cyberFi.png" className="rounded-sm" />,
  4: <img src="img/collabs/dormint.jpg" className="rounded-sm" />,
  5: <img src="img/collabs/bro_logo.jpg" className="rounded-sm" />,
  6: <img src="img/collabs/kolobok.jpg" className="rounded-sm" />,
  7: <img src="img/collabs/makefrens_logo.jpg" className="rounded-sm" />,
  8: <img src="img/collabs/arenagames_logo.png" className="rounded-sm" />,
  9: <img src="img/collabs/kekokiller_logo.jpg" className="rounded-sm" />,
  10: <img src="img/collabs/tappy_logo.jpg" className="rounded-sm" />,
  11: <img src="img/collabs/resolv_logo.jpg" className="rounded-sm" />,
  12: <img src="img/collabs/habit_logo.jpg" className="rounded-sm" />,
  13: <img src="img/collabs/electionwars_logo.jpg" className="rounded-sm" />,
  14: <img src="img/collabs/hamsterrepublic_logo.jpg" className="rounded-sm" />,
} as { [num: number]: JSX.Element }

export const taskStatusToButtonType = {
  NotStarted: ButtonTypes.secondary,
  ReadyToClaim: ButtonTypes.success,
  Claimed: ButtonTypes.success,
}

export const taskStatusToButtonText = {
  NotStarted: 'Start',
  ReadyToClaim: 'Claim',
  Claimed: 'Done',
}

export const taskStatusToCallback = {
  NotStarted: setTaskPending,
  ReadyToClaim: claimTask,
  Claimed: () => Promise.resolve(),
}
