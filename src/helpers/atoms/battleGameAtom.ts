import { atom } from 'jotai'
import { BattleGameState } from 'type/Battles'
import BetDirection from 'type/BetDirection'

export const battleBetAtom = atom<{ direction: BetDirection } | null>(null)

export default atom<BattleGameState>({} as BattleGameState)
