import { LaunchParams } from '@telegram-apps/sdk-react'
import BetDirection from 'type/BetDirection'
import { GraphTokenValue } from 'type/TokenState'

export type ServerUserLevelData = {
  bet_level: number
  bet_size: number
  bet_win: number
  bet_loss: number
  bet_upgrade_price: number
}

export interface ServerUser extends ServerUserLevelData {
  can_claim_daily_reward: string
  claim_amount: number
  points: number
  telegram_id: number
  ticket: string
  ton_address: string
  invite_limit: number
  invited_users: number
  multiplier_count: number
  remaining_ads: number
  tasks_remaining: number
  login_days: number
  last_login_date: string
  nickname_claim_available: boolean
  bet_energy_left: number
}

export interface ClientUser {
  ticket: string
  canClaimAmount: number
  launchParams: LaunchParams
  tonAddress?: string
  username: string
  firstName: string
  lastName: string | undefined
  telegramId: number
  inviteLimit: number
  invitedUsers: number
  remainingAds: number
  remainingTasks: number
  loginDays: number
  lastLoginDate: Date
  nicknameClaimAvailable: boolean
  betEnergy: number
  level: {
    current: number
    betSize: number
    betWin: number
    betLoss: number
    betUpgradePrice: number
  }
}

export interface UserBet {
  direction: BetDirection

  value: GraphTokenValue
  endTime: number
}
