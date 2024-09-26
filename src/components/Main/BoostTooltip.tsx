import { AccentText } from 'components/Text'

export default function ({ boosts }: { boosts: number }) {
  return (
    <AccentText className="absolute -right-0.5 -top-1.5 font-semibold text-xxs text-center bg-alt text-secondary rounded-full px-0.5 min-w-4 h-4">
      {boosts}
    </AccentText>
  )
}
