import ScalrCoin from 'components/icons/coins/ScalrCoin'
import MotionNumber from 'motion-number'

export default function ({ amount = 0 }: { amount?: number | undefined }) {
  const fontSize =
    amount >= 100000
      ? amount >= 1000000
        ? amount >= 100000000
          ? 14
          : 16
        : 20
      : 24
  const gap = amount >= 100000000 ? 'gap-x-1.5' : 'gap-x-2'

  return (
    <div className={`flex flex-row items-center ${gap}`}>
      <ScalrCoin size={28} />
      <MotionNumber value={amount} style={{ fontSize, fontWeight: 700 }} />
    </div>
  )
}
