export type LeaderBoardUser = {
  telegram_id: number
  points: number
  user_rank: number
  userPfp: string // fetched by frontend from a separate endpoint
  name: string
}

export default interface LeaderBoardResponse {
  user: LeaderBoardUser // aka current user
  lb: LeaderBoardUser[]
}
