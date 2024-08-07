import { AccentText } from 'components/icons/Text'

export default function ({
  value,
  setValue,
}: {
  value: number
  setValue: (num: number) => void
}) {
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
        type="range"
        class="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-700 accent-accent"
        value={value}
        onInput={(e) => setValue(e.currentTarget.valueAsNumber || 0)}
        max={10000}
      />
    </div>
  )
}
