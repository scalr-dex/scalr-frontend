import formatUSA from 'helpers/formatters/formatUSA'
import ScalrCoin from 'components/icons/coins/ScalrCoin'

export default function ({ delta, lost }: { delta: number; lost: boolean }) {
  const textColor = lost ? 'text-error' : 'text-success'

  return (
    <div className="flex flex-row justify-between items-center bg-tertiary">
      <div>
        Round ended{' '}
        <p className={textColor}>{lost ? 'you lost 😥' : 'you won 🎉'}</p>
      </div>
      <div
        className={`flex flex-row h-fit items-center gap-x-1 border-secondary border-opacity-5 px-4 py-2 bg-secondary rounded-full ${textColor}`}
      >
        +{formatUSA(delta)}
        <ScalrCoin size={18} />
      </div>
    </div>
  )
}
