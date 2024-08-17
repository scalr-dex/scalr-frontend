import BetBlock from 'components/Main/BetBlock'
import Chart from 'components/Main/Chart'
import TokenPrice from 'components/Main/TokenPrice'
import { useAtomValue } from 'jotai'
import priceHistoryAtom from 'helpers/atoms/priceHistoryAtom'
import { userBetAtom } from 'helpers/atoms/UserAtom'

export default function () {
  const data = useAtomValue(priceHistoryAtom)
  const userBet = useAtomValue(userBetAtom)

  const lastIndex = data.length - 1
  const lastPrice = data[lastIndex]?.value[1]

  const currentRoundStart = data.findLast((entry) => entry.roundSeparator)
  const roundStartPrice = userBet
    ? userBet.priceAt
    : currentRoundStart?.value[1]

  const loading = !data.length

  return (
    <div>
      <TokenPrice price={lastPrice} roundStartPrice={roundStartPrice} />
      <Chart data={data} userBet={userBet} loading={loading} />
      <BetBlock
        loading={loading}
        lastPrice={lastPrice}
        roundStartTime={currentRoundStart?.value[0]}
      />
    </div>
  )
}
