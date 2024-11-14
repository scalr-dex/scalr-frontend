import Star from 'components/icons/Star'
import { BodyText } from 'components/Text'
import { ChildrenProp, ClassName } from 'type/Props'

export default function ({
  children = <Star size={16} />,
  amount = '40',
  bg = 'bg-tertiary',
}: {
  amount?: string
  bg?: ClassName
} & ChildrenProp) {
  return (
    <div
      className={`flex flex-row gap-x-1 items-center rounded-full px-2 py-1 ${bg}`}
    >
      <div className="h-4 w-4">{children}</div>
      <BodyText className="font-semibold text-sm text-white">{amount}</BodyText>
    </div>
  )
}
