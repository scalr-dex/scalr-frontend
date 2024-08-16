export type LeaderBoardUser = {
  telegram_id: number
  points: number
  user_rank: number
}

export default interface LeaderBoardResponse {
  user: LeaderBoardUser // aka current user
  lb: LeaderBoardUser[]
}
