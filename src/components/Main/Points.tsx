import ScalrCoin from 'components/icons/coins/ScalrCoin'
import CountUp from 'react-countup'

export default function ({ amount = 0 }: { amount?: number | undefined }) {
  const fontSize =
    amount >= 100000
      ? amount >= 1000000
        ? amount >= 100000000
          ? 'text-sm'
          : 'text-base'
        : 'text-xl'
      : 'text-2xl'
  const gap = amount >= 100000000 ? 'gap-x-1.5' : 'gap-x-2'

  return (
    <div className={`flex flex-row items-center container ${gap}`}>
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
