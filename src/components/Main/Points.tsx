import ScalrCoin from 'components/icons/coins/ScalrCoin'
import CountUp from 'react-countup'

export default function ({ amount = 0 }: { amount?: number | undefined }) {
  const fontSize = amount >= 100000 ? 'text-2xl' : 'text-3xl'

  return (
    <div className="flex flex-row gap-x-2 items-center">
      <ScalrCoin size={28} />
      <CountUp
        end={amount}
        preserveValue
        duration={1}
        className={`font-bold ${fontSize}`}
      />
    </div>
  )
}
