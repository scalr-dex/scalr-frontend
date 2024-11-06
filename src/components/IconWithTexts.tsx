import { Header4, BodyText } from 'components/Text'
import { IconProp } from 'type/Props'

export default function ({
  icon,
  topText,
  bottomText,
}: {
  topText: string
  bottomText: string
} & IconProp) {
  return (
    <div className="flex flex-row gap-x-4">
      <div className="text-alt">{icon}</div>
      <div className="flex flex-col gap-y-1">
        <Header4>{topText}</Header4>
        <BodyText className="text-white/50 leading-5 whitespace-pre-wrap">
          {bottomText}
        </BodyText>
      </div>
    </div>
  )
}
