import BetDirection from 'type/BetDirection'
import { PublicUser } from 'type/User'

export type BattleStartWs = {
  GameStartsInSeconds: number
  BetSize: number
  BattleName: string
}

export type BetsConfirmedWs = {
  Bets: { TelegramID: number; Bets: boolean[] }[]
  RoundEndsInSeconds: number
}

export type RoundEndedWs = {
  PlayersPoints: { TelegramID: number; Points: number }[]
}

export type BattleEndWs = { WinnerTelegramID: number; Winnings: number }
export type BattlesWebsocketEvents =
  | BattleStartWs
  | BetsConfirmedWs
  | RoundEndedWs
  | BattleEndWs

export interface LobbyData {
  num_of_players: number
  lobby_id: string
  status: 'waiting' | 'complete'
  expire_time: number
}

export type BattleUser = PublicUser & {
  bets: BetDirection[]
  score: number
}

export interface BattleGameState {
  lobbyId: string
  playerScore: RoundEndedWs['PlayersPoints']
  gameStartTime: number
  roundSeparators: number[]
  betSize: number
  users: { avatar: string; battleName: string }[] // avatar - base64 or svg, ref: https://echarts.apache.org/en/option.html#series-line.markPoint.symbol
  winner?: { id: number; amount: number }
}

export type BetAmountProp = { betAmount: number }

export enum BetStatus {
  betBlocked,
  canBet,
  didBet,
}
