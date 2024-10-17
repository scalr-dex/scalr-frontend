import Telegram from 'components/icons/socials/Telegram'
import X from 'components/icons/socials/X'
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
  0: <span className="font-bold">👀</span>, // ID reserved for ads
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
  15: <img src="img/collabs/farmton_logo.jpg" className="rounded-sm" />,
  16: <img src="img/collabs/soratopia_logo.png" className="rounded-sm" />,
  17: <img src="img/collabs/monkeys_logo.jpg" className="rounded-sm" />,
  18: <img src="img/collabs/shieldeum_logo.png" className="rounded-sm" />,
  19: <img src="img/collabs/tonchi_logo.jpg" className="rounded-sm" />,
  20: <img src="img/collabs/beambot_logo.jpg" className="rounded-sm" />,
  21: <img src="img/collabs/gtap_logo.jpg" className="rounded-sm" />,
  22: <img src="img/collabs/starduck_logo.jpg" className="rounded-sm" />,
  23: <img src="img/collabs/greencoin_logo.jpeg" className="rounded-sm" />,
  24: <img src="img/collabs/moondrop_logo.png" className="rounded-sm" />,
  25: <img src="img/collabs/happyfarmer_logo.jpg" className="rounded-sm" />,
  26: <img src="img/collabs/Easycake_logo.jpg" className="rounded-sm" />,
  27: <img src="img/collabs/Filmtaptap_logo.jpg" className="rounded-sm" />,
  28: <img src="img/collabs/Starlight_logo.jpg" className="rounded-sm" />,
  29: <img src="img/collabs/Trumpfight_logo.jpg" className="rounded-sm" />,
  30: <img src="img/collabs/move_logo.jpg" className="rounded-sm" />,
  31: <img src="img/collabs/meai_logo.jpg" className="rounded-sm" />,
  32: <img src="img/collabs/politicalwar_logo.jpg" className="rounded-sm" />,
  33: <img src="img/collabs/alfa.jpg" className="rounded-sm" />,
  34: <img src="img/collabs/clockiechaos_logo.jpg" className="rounded-sm" />,
  35: <img src="img/collabs/eggdrop_logo.jpg" className="rounded-sm" />,
  36: <img src="img/collabs/cartparty.jpg" className="rounded-sm" />,
  37: <img src="img/collabs/p4l_logo.jpg" className="rounded-sm" />,
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
