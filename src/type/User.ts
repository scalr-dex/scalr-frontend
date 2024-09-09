import { LaunchParams } from '@telegram-apps/sdk-react'
import BetDirection from 'type/BetDirection'

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
  launchParams: LaunchParams
  tonAddress?: string
}

export interface UserBet {
  amount: number
  direction: BetDirection

  startTime: number
  endTime: number
}
