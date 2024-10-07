import { atom } from 'jotai'
import { BattleGameState } from 'type/Battles'
import BetDirection from 'type/BetDirection'

export const battleBetAtom = atom<{ direction: BetDirection } | null>(null)

export const emptyBattleGame: BattleGameState = {
  lobbyId: '',
  playerScore: [],
  gameStartTime: 0,
  roundSeparators: [],
  betSize: 0,
}

export default atom<BattleGameState>(emptyBattleGame)
