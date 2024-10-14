import { atom } from 'jotai'
import { BattleGameState } from 'type/Battles'
import BetDirection from 'type/BetDirection'

export const battleBetAtom = atom<{ direction: BetDirection } | null>(null)
export const battlePrivateLobbyAtom = atom<{
  betAmount: number
  lobbyEndTime: number
  code: string
} | null>(null)

export const emptyBattleGame: BattleGameState = {
  lobbyId: '',
  playerScore: [],
  gameStartTime: 0,
  roundSeparators: [],
  betSize: 0,
  users: [],
}

export default atom<BattleGameState>(emptyBattleGame)
