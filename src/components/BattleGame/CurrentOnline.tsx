import PulseDot from 'components/PulseDot'
import { BodyText } from 'components/Text'
import formatUSA from 'helpers/formatters/formatUSA'

export default function () {
  return (
    <BodyText className="inline-flex gap-x-2 items-center self-center">
      <PulseDot />
      <BodyText>{formatUSA(8421)}</BodyText>
      <BodyText className="text-white/50">are playing now</BodyText>
    </BodyText>
  )
}
