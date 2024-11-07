import ScalrCoin from 'components/icons/coins/ScalrCoin'
import MotionNumber from '@number-flow/react'

export default function ({ amount }: { amount: number }) {
  const fontSize =
    amount >= 100000
      ? amount >= 1000000
        ? amount >= 100000000
          ? 12
          : 16
        : 18
      : 22
  const gap = amount >= 100000000 ? 'gap-x-1.5' : 'gap-x-2'

  return (
    <div className={`flex flex-row items-center ${gap}`}>
      <ScalrCoin size={fontSize + 8} />
      <MotionNumber value={amount} style={{ fontSize, fontWeight: 700 }} />
    </div>
  )
}
