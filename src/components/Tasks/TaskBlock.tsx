import ButtonSmall from 'components/ButtonSmall'
import CheckMark from 'components/icons/CheckMark'
import { AccentText } from 'components/icons/Text'
import { JSX } from 'preact/jsx-runtime'
import ButtonTypes from 'type/Button'

const statusToText = {
  [ButtonTypes.success]: <CheckMark />,
  [ButtonTypes.neutral]: 'Claim',
}

export default function ({
  icon,
  text,
  status = ButtonTypes.neutral,
  rewardAmount,
}: {
  icon: JSX.Element
  text: string
  rewardAmount: number
  status?: ButtonTypes.success | ButtonTypes.neutral
}) {
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-row gap-x-1">
        <div className="w-6 h-6">{icon}</div>
        <div>
          <AccentText className="font-bold">{text} </AccentText>
          <AccentText>+{rewardAmount} pts</AccentText>
        </div>
      </div>
      <ButtonSmall buttonType={status}>{statusToText[status]}</ButtonSmall>
    </div>
  )
}
