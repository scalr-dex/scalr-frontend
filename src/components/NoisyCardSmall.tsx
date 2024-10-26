import { BodyText, Header4 } from 'components/Text'
import { JSX } from 'preact/jsx-runtime'

export default function ({
  topText,
  bottomText,
  icon,
}: {
  topText: string
  bottomText: JSX.Element | string
  icon: JSX.Element
}) {
  return (
    <div className="w-full h-full flex flex-col content-between">
      <div>{icon}</div>

      <div className="flex flex-col h-full justify-end">
        <BodyText className="font-semibold text-white/50">{topText}</BodyText>
        <Header4 className="font-semibold font-sm">{bottomText}</Header4>
      </div>
    </div>
  )
}
