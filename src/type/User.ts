import { LaunchParams } from '@telegram-apps/sdk-react'
import BetDirection from 'type/BetDirection'
import { GraphTokenValue } from 'type/TokenState'

export interface ServerUser {
  can_claim_daily_reward: string
  new: boolean
  points: number
  telegram_id: number
  ticket: string
  ton_address: string
}

export interface ClientUser {
  ticket: string
  balance: number
  timeToReward: string
  launchParams: LaunchParams
  tonAddress?: string
}

export interface UserBet {
  value: GraphTokenValue

  amount: number
  direction: BetDirection
  endTime: number
}
