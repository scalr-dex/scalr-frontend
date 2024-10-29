import BetBlock from 'components/Main/BetBlock'
import Chart from 'components/Main/Chart'
import TokenPrice from 'components/Main/TokenPrice'
import { useAtomValue } from 'jotai'
import priceHistoryAtom from 'helpers/atoms/priceHistoryAtom'
import FooterSafeArea from 'components/FooterSafeArea'

export default function () {
  const data = useAtomValue(priceHistoryAtom)

  const lastIndex = data.length - 1
  const lastValue = data[lastIndex]?.value

  const loading = !data.length

  return (
    <div className="flex flex-col min-h-screen">
      <TokenPrice price={lastValue?.[1]} />
      <Chart data={data} loading={loading} />
      <BetBlock loading={loading} roundStart={lastValue} />
      <FooterSafeArea />
    </div>
  )
}
