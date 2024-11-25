export type PictureResponse = { HasPicture: boolean; Base64: string }

export type LeaderBoardUser = {
  telegram_id: number
  points: number
  user_rank: number
  userPfp: string // fetched by frontend from a separate endpoint
  name?: string
  username?: string
}
type LeaderboardKingRes = {
  telegram_id: number
  message: string
  name: string
  username?: string
  started: string
}

type BuyLink = { buy_link: string; price: number }

export type ClientKing = Omit<LeaderboardKingRes, 'started'> & {
  started: Date
  userPfp: string
  buyData: BuyLink
}

export default interface LeaderBoardResponse {
  user: LeaderBoardUser // aka current user
  lb: LeaderBoardUser[]

  King: LeaderboardKingRes
  KingPicture: PictureResponse
  KingBuyLink: BuyLink
}
