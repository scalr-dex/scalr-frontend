import { LaunchParams } from '@telegram-apps/sdk-react'
import BetDirection from 'type/BetDirection'

export interface ServerUser {
  can_claim_daily_reward: string
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
}

export interface UserBet {
  priceAt: number
  amount: number
  direction: BetDirection
  date: Date
  endTime: Date
}
