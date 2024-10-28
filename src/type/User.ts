import { LaunchParams } from '@telegram-apps/sdk-react'
import BetDirection from 'type/BetDirection'
import { GraphTokenValue } from 'type/TokenState'

export interface ServerUser {
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
}

export interface ClientUser {
  ticket: string
  canClaimAmount: number
  balance: number
  launchParams: LaunchParams
  tonAddress?: string
  username: string
  firstName: string
  lastName: string | undefined
  telegramId: number
  inviteLimit: number
  invitedUsers: number
  boosts: number
  remainingAds: number
  remainingTasks: number
  loginDays: number
  lastLoginDate: Date
  nicknameClaimAvailable: boolean
}

export interface UserBet {
  amount: number
  direction: BetDirection

  value: GraphTokenValue
  endTime: number
}
