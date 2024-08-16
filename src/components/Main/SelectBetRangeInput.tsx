import 'inputRange.css'
import { useHapticFeedback } from '@telegram-apps/sdk-react'
import { AccentText } from 'components/icons/Text'
import formatUSA from 'helpers/formatUSA'
import { JSX } from 'preact/jsx-runtime'

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
    userBalance && value ? ((value / userBalance) * 100).toFixed(0) : 0

  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <span className="text-xs">
          <AccentText className="opacity-50 font-bold">Your bet </AccentText>
          <AccentText>{betPercent}%</AccentText>
        </span>

        <AccentText className="text-sm">{formatUSA(value)} pts</AccentText>
      </div>

      <input
        {...props}
        type="range"
        class="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-700 accent-accent"
        value={value}
        onInput={(e) => {
          setValue(e.currentTarget.valueAsNumber || 0)
          haptic.selectionChanged()
        }}
        max={userBalance}
      />
    </div>
  )
}
