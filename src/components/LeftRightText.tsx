import { BodyText } from 'components/Text'
import { ComponentChild } from 'preact'

export default function ({
  leftText,
  rightText,
}: {
  leftText: ComponentChild
  rightText: ComponentChild
}) {
  return (
    <div className="flex flex-row justify-between items-center">
      <BodyText className="text-white/50">{leftText}</BodyText>
      <BodyText className="flex flex-row items-center gap-x-2 font-bold">
        {rightText}
      </BodyText>
    </div>
  )
}
