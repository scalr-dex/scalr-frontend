import Telegram from 'components/icons/socials/Telegram'
import X from 'components/icons/socials/X'
import TaskIcon from 'components/Tasks/TaskIcon'
import { JSX } from 'preact/jsx-runtime'
import ButtonTypes from 'type/Button'

export type TaskStatus = 'NotStarted' | 'ReadyToClaim' | 'Claimed'

export default interface UserTask {
  IconNumber: number
  IconURL?: string
  Name: string
  RewardAmount: number
  Status: TaskStatus
  TaskID: number
  URL: string

  canClaimAt?: number | undefined
}

export const iconNumberToIcon = {
  0: <span className="font-bold">👀</span>, // ID reserved for ads
  1: <Telegram />,
  2: <X />,
  3: <TaskIcon src="img/collabs/cyberFi.png" />,
  4: <TaskIcon src="img/collabs/dormint.jpg" />,
  5: <TaskIcon src="img/collabs/bro_logo.jpg" />,
  6: <TaskIcon src="img/collabs/kolobok.jpg" />,
  7: <TaskIcon src="img/collabs/makefrens_logo.jpg" />,
  8: <TaskIcon src="img/collabs/arenagames_logo.png" />,
  9: <TaskIcon src="img/collabs/kekokiller_logo.jpg" />,
  10: <TaskIcon src="img/collabs/tappy_logo.jpg" />,
  11: <TaskIcon src="img/collabs/resolv_logo.jpg" />,
  12: <TaskIcon src="img/collabs/habit_logo.jpg" />,
  13: <TaskIcon src="img/collabs/electionwars_logo.jpg" />,
  14: <TaskIcon src="img/collabs/hamsterrepublic_logo.jpg" />,
  15: <TaskIcon src="img/collabs/farmton_logo.jpg" />,
  16: <TaskIcon src="img/collabs/soratopia_logo.png" />,
  17: <TaskIcon src="img/collabs/monkeys_logo.jpg" />,
  18: <TaskIcon src="img/collabs/shieldeum_logo.png" />,
  19: <TaskIcon src="img/collabs/tonchi_logo.jpg" />,
  20: <TaskIcon src="img/collabs/beambot_logo.jpg" />,
  21: <TaskIcon src="img/collabs/gtap_logo.jpg" />,
  22: <TaskIcon src="img/collabs/starduck_logo.jpg" />,
  23: <TaskIcon src="img/collabs/greencoin_logo.jpeg" />,
  24: <TaskIcon src="img/collabs/moondrop_logo.png" />,
  25: <TaskIcon src="img/collabs/happyfarmer_logo.jpg" />,
  26: <TaskIcon src="img/collabs/Easycake_logo.jpg" />,
  27: <TaskIcon src="img/collabs/Filmtaptap_logo.jpg" />,
  28: <TaskIcon src="img/collabs/Starlight_logo.jpg" />,
  29: <TaskIcon src="img/collabs/Trumpfight_logo.jpg" />,
  30: <TaskIcon src="img/collabs/move_logo.jpg" />,
  31: <TaskIcon src="img/collabs/meai_logo.jpg" />,
  32: <TaskIcon src="img/collabs/politicalwar_logo.jpg" />,
  33: <TaskIcon src="img/collabs/alfa.jpg" />,
  34: <TaskIcon src="img/collabs/clockiechaos_logo.jpg" />,
  35: <TaskIcon src="img/collabs/eggdrop_logo.jpg" />,
  36: <TaskIcon src="img/collabs/cartparty.jpg" />,
  37: <TaskIcon src="img/collabs/p4l_logo.jpg" />,
  38: <TaskIcon src="img/collabs/hive_logo.jpg" />,
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
