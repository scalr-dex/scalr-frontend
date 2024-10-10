import Versus from 'components/icons/Versus'
import VersusPlayer from 'components/BattleGame/VersusPlayer'
import { BattleGameState } from 'type/Battles'

export default function ({ gameStatus }: { gameStatus: BattleGameState }) {
  return (
    <div className="flex flex-row gap-x-12">
      {gameStatus && gameStatus.playerScore[0] && gameStatus.playerScore[1] ? (
        <div className="flex flex-row gap-x-1">
          <VersusPlayer player={String(gameStatus.playerScore[0].TelegramID)} />
          <Versus />
          <VersusPlayer player={String(gameStatus.playerScore[1].TelegramID)} />
        </div>
      ) : null}
    </div>
  )
}
