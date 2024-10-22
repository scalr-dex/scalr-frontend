import ScalrCoin from 'components/icons/coins/ScalrCoin'
import { BodyText } from 'components/Text'

export default function ({
  topText,
  bottomText,
}: {
  topText: string
  bottomText: string
}) {
  return (
    <div className="w-full flex flex-col ">
      <ScalrCoin size={40} />

      <div className="flex flex-col gap-y-2">
        <BodyText className="font-semibold text-white/50">{topText}</BodyText>
        <BodyText className="font-semibold font-sm">{bottomText}</BodyText>
      </div>
    </div>
  )
}
