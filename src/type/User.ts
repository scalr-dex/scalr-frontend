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
}

export interface ClientUser {
  ticket: string
  canClaimAmount: number
  balance: number
  launchParams: LaunchParams
  tonAddress?: string
  username: string
  telegramId: number
  inviteLimit: number
  invitedUsers: number
  boosts: number
  remainingAds: number
  remainingTasks: number
}

export interface UserBet {
  amount: number
  direction: BetDirection

  value: GraphTokenValue
  endTime: number
}
