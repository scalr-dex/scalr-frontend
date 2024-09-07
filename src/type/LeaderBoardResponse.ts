export type LeaderBoardUser = {
  telegram_id: number
  points: number
  user_rank: number
  user_pfp_url: string
  username: string
}

export default interface LeaderBoardResponse {
  user: LeaderBoardUser // aka current user
  lb: LeaderBoardUser[]
}
