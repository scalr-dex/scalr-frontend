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
    <div className="w-full h-full flex flex-col content-between">
      <div>
        <ScalrCoin size={40} />
      </div>

      <div className="flex flex-col h-full justify-end">
        <BodyText className="font-semibold text-white/50">{topText}</BodyText>
        <BodyText className="font-semibold font-sm">{bottomText}</BodyText>
      </div>
    </div>
  )
}
