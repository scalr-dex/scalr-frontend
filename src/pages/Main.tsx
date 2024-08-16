import BetBlock from 'components/Main/BetBlock'
import Chart from 'components/Main/Chart'
import TokenPrice from 'components/Main/TokenPrice'
import { useAtomValue } from 'jotai'
import priceHistoryAtom from 'helpers/atoms/priceHistoryAtom'

export default function () {
  const data = useAtomValue(priceHistoryAtom)

  const lastIndex = data.length - 1
  const lastPrice = data[lastIndex]?.value[1]
  const roundStartPrice = data[0]?.value[1]
  const loading = !data.length

  return (
    <div>
      <TokenPrice price={lastPrice} roundStartPrice={roundStartPrice} />
      <Chart data={data} loading={loading} />
      <BetBlock loading={loading} />
    </div>
  )
}
