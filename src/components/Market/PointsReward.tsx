import { BodyText } from 'components/Text'
import formatUSA from 'helpers/formatters/formatUSA'

export default function ({ amount }: { amount: number }) {
  return (
    <div className="border border-white/5 rounded-full px-2 py-1 bg-tertiary -rotate-3">
      <BodyText className="font-semibold">{formatUSA(amount)}</BodyText>
    </div>
  )
}
