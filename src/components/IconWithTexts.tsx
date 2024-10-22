import { JSX } from 'preact/jsx-runtime'
import { Header4, BodyText } from 'components/Text'

export default function ({
  icon,
  topText,
  bottomText,
}: {
  icon: JSX.Element
  topText: string
  bottomText: string
}) {
  return (
    <div className="flex flex-row gap-x-4">
      <div className="text-alt">{icon}</div>
      <div className="flex flex-col gap-y-1">
        <Header4>{topText}</Header4>
        <BodyText className="text-white/50 leading-5">{bottomText}</BodyText>
      </div>
    </div>
  )
}
