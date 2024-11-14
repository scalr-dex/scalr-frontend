import { specialOfferExpiryUnix } from 'helpers/atoms/UserStates'
import { ChildrenProp } from 'type/Props'
import { BodyText, Header3 } from 'components/Text'
import dayjs from 'dayjs'

function Bubble({ children, subText }: ChildrenProp & { subText: string }) {
  return (
    <div className="flex flex-col gap-y-2 w-1/3">
      <div className="flex items-center justify-center rounded-full bg-tertiary border border-white/5 h-12.5">
        <Header3>{children}</Header3>
      </div>
      <BodyText className="text-xs">{subText}</BodyText>
    </div>
  )
}

const minuteInMs = 1000 * 60
const hourInMs = minuteInMs * 60
const dayInMs = hourInMs * 24

export default function () {
  const totalDiff = dayjs(specialOfferExpiryUnix).diff(dayjs())

  const days = Math.floor(totalDiff / dayInMs)
  const hours = Math.floor((totalDiff % dayInMs) / hourInMs)
  const minutes = Math.floor((totalDiff % hourInMs) / minuteInMs)

  return (
    <div className="flex flex-row gap-x-2 w-full">
      <Bubble subText="Days">{days}</Bubble>
      <Bubble subText="Hours">{hours}</Bubble>
      <Bubble subText="Minutes">{minutes}</Bubble>
    </div>
  )
}
