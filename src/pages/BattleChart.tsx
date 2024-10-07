import Chart from 'components/Main/Chart'
import TokenPrice from 'components/Main/TokenPrice'
import { useAtomValue } from 'jotai'
import priceHistoryAtom from 'helpers/atoms/priceHistoryAtom'
import battleGameAtom from 'helpers/atoms/battleGameAtom'
import BattleBetBlock from 'components/BattleGame/BattleBetBlock'
import RoundCounter from 'components/BattleGame/RoundCounter'
import BattleTimer from 'components/BattleGame/BattleTimer'

export default function () {
  const data = useAtomValue(priceHistoryAtom)
  const gameStatus = useAtomValue(battleGameAtom)

  const lastIndex = data.length - 1
  const lastValue = data[lastIndex]?.value

  const loading = !data.length

  const currentRoundIndex = gameStatus.roundSeparators.length - 1
  console.log(JSON.stringify(gameStatus))

  return (
    <div className="flex flex-col h-screen">
      <TokenPrice price={lastValue?.[1]} betSize={gameStatus.betSize} />
      <Chart
        data={data}
        roundSeparators={gameStatus.roundSeparators}
        loading={loading}
      />
      <div className="flex flex-col gap-y-5 px-4">
        <RoundCounter currentRound={currentRoundIndex} />
        <BattleTimer endTime={gameStatus.roundSeparators[currentRoundIndex]} />
        <BattleBetBlock
          lobbyId={gameStatus.lobbyId}
          loading={true}
          currentRound={gameStatus?.roundSeparators?.length || 0}
        />
      </div>
    </div>
  )
}
