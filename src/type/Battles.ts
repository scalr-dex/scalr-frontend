import BetDirection from 'type/BetDirection'
import { PublicUser } from 'type/User'

export type BattleStartWs = { GameStartTimeUnix: number; BetSize: number }

export type BetsConfirmedWs = {
  Bets: { TelegramID: number; Bets: boolean[] }[]
  RoundEndTimeUnix: number
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
  NumOfPlayers: number
  LobbyID: string
  Status: 'waiting' | 'complete'
}

export type BattleUser = PublicUser & {
  bets: BetDirection[]
  score: number
}

export interface BattleGameState {
  lobbyId: string
  playerPoints: RoundEndedWs['PlayersPoints']
  gameStartTime: number
  roundSeparators: number[]
  betSize: number
  winner?: { id: number; amount: number }
}
