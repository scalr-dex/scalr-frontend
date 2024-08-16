import formatUSA from 'helpers/formatUSA'
import ScalrCoin from 'components/icons/coins/ScalrCoin'

export default function ({ delta }: { delta: number }) {
  const isPositive = delta >= 0
  const textColor = isPositive ? 'text-success' : 'text-error'

  return (
    <div className="flex flex-row justify-between items-center bg-tertiary">
      <div>
        Round ended{' '}
        <p className={textColor}>{isPositive ? 'you won 🎉' : 'you lost 😥'}</p>
      </div>
      <div
        className={`flex flex-row h-fit items-center gap-x-1 border-secondary border-opacity-5 px-4 py-2 bg-secondary rounded-full ${textColor}`}
      >
        {isPositive ? '+' : '-'}
        {formatUSA(delta)}
        <ScalrCoin size={18} />
      </div>
    </div>
  )
}
