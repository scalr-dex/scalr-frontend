import Versus from 'components/icons/Versus'
import VersusPlayer from 'components/BattleGame/VersusPlayer'
import { BattleGameState } from 'type/Battles'

export default function ({ gameStatus }: { gameStatus: BattleGameState }) {
  if (!gameStatus || !gameStatus.users[0] || !gameStatus.users[1]) return null

  return (
    <div className="relative flex flex-row gap-x-12">
      <VersusPlayer name={String(gameStatus.users[0].battleName)} />
      <Versus className="absolute -top-2 left-11 z-10 " />
      <VersusPlayer name={String(gameStatus.users[1].battleName)} />
    </div>
  )
}
