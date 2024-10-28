import Telegram from 'components/icons/socials/Telegram'
import X from 'components/icons/socials/X'
import TaskIcon from 'components/Tasks/TaskIcon'
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

export const iconNumberToComponent = (id: number) => {
  if (id === 0) return <span className="font-bold">👀</span>
  if (id === 1) return <Telegram size={24} />
  if (id === 2) return <X size={24} />

  return <TaskIcon src={iconNumberToSrc[id]} />
}

export const iconNumberToSrc = {
  0: '', // ID reserved for ads
  1: '',
  2: '',
  3: 'img/collabs/cyberFi.png',
  4: 'img/collabs/dormint.jpg',
  5: 'img/collabs/bro_logo.jpg',
  6: 'img/collabs/kolobok.jpg',
  7: 'img/collabs/makefrens_logo.jpg',
  8: 'img/collabs/arenagames_logo.png',
  9: 'img/collabs/kekokiller_logo.jpg',
  10: 'img/collabs/tappy_logo.jpg',
  11: 'img/collabs/resolv_logo.jpg',
  12: 'img/collabs/habit_logo.jpg',
  13: 'img/collabs/electionwars_logo.jpg',
  14: 'img/collabs/hamsterrepublic_logo.jpg',
  15: 'img/collabs/farmton_logo.jpg',
  16: 'img/collabs/soratopia_logo.png',
  17: 'img/collabs/monkeys_logo.jpg',
  18: 'img/collabs/shieldeum_logo.png',
  19: 'img/collabs/tonchi_logo.jpg',
  20: 'img/collabs/beambot_logo.jpg',
  21: 'img/collabs/gtap_logo.jpg',
  22: 'img/collabs/starduck_logo.jpg',
  23: 'img/collabs/greencoin_logo.jpeg',
  24: 'img/collabs/moondrop_logo.png',
  25: 'img/collabs/happyfarmer_logo.jpg',
  26: 'img/collabs/Easycake_logo.jpg',
  27: 'img/collabs/Filmtaptap_logo.jpg',
  28: 'img/collabs/Starlight_logo.jpg',
  29: 'img/collabs/Trumpfight_logo.jpg',
  30: 'img/collabs/move_logo.jpg',
  31: 'img/collabs/meai_logo.jpg',
  32: 'img/collabs/politicalwar_logo.jpg',
  33: 'img/collabs/alfa.jpg',
  34: 'img/collabs/clockiechaos_logo.jpg',
  35: 'img/collabs/eggdrop_logo.jpg',
  36: 'img/collabs/cartparty.jpg',
  37: 'img/collabs/p4l_logo.jpg',
  38: 'img/collabs/hive_logo.jpg',
} as { [id: number]: string }

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
