import ButtonSmall from 'components/ButtonSmall'
import ScalrCoin from 'components/icons/coins/ScalrCoin'
import { Dispatch } from 'preact/hooks'
import ButtonTypes from 'type/Button'

const options = [10, 20, 100]

export default function ({
  betAmount,
  setBetAmount,
}: {
  betAmount: number
  setBetAmount: Dispatch<number>
}) {
  return (
    <div className="flex flex-row gap-x-2 w-full">
      {options.map((val) => {
        const active = betAmount === val

        const wrapper = active ? 'silver-outline rounded-3xl w-full' : 'w-full'

        return (
          <div className={wrapper} key={`battle-bet-${val}`}>
            <ButtonSmall
              className="relative transition-all px-6 py-3 w-full m-1.5 z-10"
              buttonType={ButtonTypes.neutral}
              onClick={() => setBetAmount(val)}
              iconRight={<ScalrCoin size={20} />}
            >
              {val}
            </ButtonSmall>
          </div>
        )
      })}
    </div>
  )
}
