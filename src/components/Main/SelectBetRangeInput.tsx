import { useHapticFeedback } from '@telegram-apps/sdk-react'
import { AccentText } from 'components/icons/Text'
import formatUSA from 'helpers/formatUSA'
import { JSX } from 'preact/jsx-runtime'
import { getTrackBackground, Range } from 'react-range'

export default function ({
  value,
  setValue,
  userBalance,
  ...props
}: {
  value: number
  setValue: (num: number) => void
  userBalance: number | undefined
} & JSX.HTMLAttributes<HTMLInputElement>) {
  const haptic = useHapticFeedback()

  const betPercent = 
    userBalance && value ? Math.floor((value / userBalance) * 100).toFixed(0) : 0


  const inputProps = { min: 0, max: userBalance || 1000, values: [value] }
  const background = getTrackBackground({
    ...inputProps,
    colors: ['var(--accent)', 'var(--controls-tertiary)'],
  })
  const thumbOpacity = props.disabled ? 'bg-opacity-50' : 'bg-opacity-100'

  return (
    <div>
      <div className="flex flex-row items-center justify-between mb-1">
        <span className="text-xs">
          <AccentText className="opacity-50 font-bold">Your bet </AccentText>
          <AccentText>{betPercent}%</AccentText>
        </span>

        <AccentText className="text-sm">{formatUSA(value)} pts</AccentText>
      </div>
      <Range
        {...inputProps}
        disabled={!!props.disabled}
        onChange={(values) => {
          setValue(values[0])
          haptic.selectionChanged()
        }}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{ background }}
            className="h-1.5 w-full rounded-full"
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            role="button"
            className={`bg-white focus-within:outline-none w-8 h-9 border-[12px] border-transparent bg-clip-padding rounded-full ${thumbOpacity}`}
          />
        )}
      />
    </div>
  )
}
