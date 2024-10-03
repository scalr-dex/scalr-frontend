import BetBlock from 'components/Main/BetBlock'
import Chart from 'components/Main/Chart'
import TokenPrice from 'components/Main/TokenPrice'
import { useAtomValue } from 'jotai'
import priceHistoryAtom from 'helpers/atoms/priceHistoryAtom'
import FooterSafeArea from 'components/FooterSafeArea'
import RoundCounter from 'components/BattleGame/RoundCounter'
import battleGameAtom from 'helpers/atoms/battleGameAtom'
import BattleBetBlock from 'components/BattleGame/BattleBetBlock'

export default function () {
  const data = useAtomValue(priceHistoryAtom)
  const gameStatus = useAtomValue(battleGameAtom)

  const lastIndex = data.length - 1
  const lastValue = data[lastIndex]?.value

  const loading = !data.length

  return (
    <div className="flex flex-col h-full">
      <TokenPrice price={lastValue?.[1]} />
      <Chart data={data} loading={loading} />

      <BattleBetBlock
        loading={loading}
        roundStart={lastValue}
        currentRound={gameStatus?.roundSeparators?.length || 0}
      />
    </div>
  )
}
