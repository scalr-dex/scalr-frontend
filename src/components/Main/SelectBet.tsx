import { useHapticFeedback } from '@telegram-apps/sdk-react'
import { AccentText } from 'components/icons/Text'
import { JSX } from 'preact/jsx-runtime'

export default function ({
  value,
  setValue,
  max,
  ...props
}: {
  value: number
  setValue: (num: number) => void
} & JSX.HTMLAttributes<HTMLInputElement>) {
  const haptic = useHapticFeedback()

  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <span className="text-xs">
          <AccentText className="opacity-50 font-bold">Your bet </AccentText>
          <AccentText>42%</AccentText>
        </span>

        <AccentText className="text-sm">{value} pts</AccentText>
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
        max={typeof max === 'number' ? max : 10000}
      />
    </div>
  )
}
