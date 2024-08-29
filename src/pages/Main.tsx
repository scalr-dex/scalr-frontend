import BetBlock from 'components/Main/BetBlock'
import Chart from 'components/Main/Chart'
import TokenPrice from 'components/Main/TokenPrice'
import { useAtomValue } from 'jotai'
import priceHistoryAtom from 'helpers/atoms/priceHistoryAtom'
import { userBetAtom } from 'helpers/atoms/UserAtom'
import { preload } from 'react-dom'

export default function () {
  const data = useAtomValue(priceHistoryAtom)
  const userBet = useAtomValue(userBetAtom)

  const lastIndex = data.length - 1
  const lastValue = data[lastIndex]?.value

  const currentRoundStart = data.findLast((entry) => entry.roundSeparator)
  const roundStartPrice = userBet
    ? userBet.value[1]
    : currentRoundStart?.value[1]

  const loading = !data.length

  return (
    <div className="flex flex-col h-[85dvh]">
      <TokenPrice price={lastValue?.[1]} roundStartPrice={roundStartPrice} />
      <Chart data={data} userBet={userBet} loading={loading} />
      <BetBlock
        loading={loading}
        lastValue={lastValue}
        roundStartTime={currentRoundStart?.value[0]}
      />
    </div>
  )
}
