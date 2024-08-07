import TonCoin from 'components/icons/coins/TonCoin'
import StonksArrow from 'components/icons/StonksArrow'
import { Header2, Header4 } from 'components/icons/Text'
import Timer from 'components/Main/Timer'

export default function () {
  return (
    <div className="flex flex-col gap-y-1 justify-start w-full px-4 pt-2">
      <div className="flex flex-row gap-x-1 items-center">
        <TonCoin size={20} />{' '}
        <span className="text-white text-opacity-50">TON-USD, 5s round</span>
      </div>

      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <Header2>
            <Header4 className="inline">$</Header4>6.3624
          </Header2>
          <div className="flex flex-row gap-x-2 items-center font-semibold text-success">
            <StonksArrow size={9} /> 0,03
          </div>
        </div>

        <Timer />
      </div>
    </div>
  )
}
