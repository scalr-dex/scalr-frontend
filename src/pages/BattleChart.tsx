import Chart from 'components/Main/Chart'
import TokenPrice from 'components/Main/TokenPrice'
import { useAtomValue } from 'jotai'
import priceHistoryAtom from 'helpers/atoms/priceHistoryAtom'
import battleGameAtom from 'helpers/atoms/battleGameAtom'
import BattleBetBlock from 'components/BattleGame/BattleBetBlock'

export default function () {
  const data = useAtomValue(priceHistoryAtom)
  const gameStatus = useAtomValue(battleGameAtom)

  const lastIndex = data.length - 1
  const lastValue = data[lastIndex]?.value

  const loading = !data.length

  return (
    <div className="flex flex-col h-screen">
      <TokenPrice price={lastValue?.[1]} />
      <Chart
        data={data}
        roundSeparators={gameStatus.roundSeparators}
        loading={loading}
      />

      <span className="break-all">{JSON.stringify(gameStatus)}</span>
      <BattleBetBlock
        loading={loading}
        currentRound={gameStatus?.roundSeparators?.length || 0}
      />
    </div>
  )
}
