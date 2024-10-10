import { PublicUser } from 'type/User'

export type LeaderBoardUser = PublicUser & {
  points: number
  user_rank: number
}

export interface LeaderBoardResponse {
  user: LeaderBoardUser // aka current user
  lb: LeaderBoardUser[]
  round_end_time: number // unix
}
