import { AccentText } from 'components/Text'

export default function ({ boosts }: { boosts: number }) {
  return (
    <AccentText className="absolute -right-1 -top-2 font-semibold text-xxs text-center bg-success-light text-success-dark rounded-full px-1 h-4">
      {boosts}
    </AccentText>
  )
}
