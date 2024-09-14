import { BodyText } from 'components/Text'
import Points from 'components/Main/Points'
import Timer from 'components/Main/Timer'

export default function ({
  points,
  endTime,
}: {
  points: number | undefined
  endTime: number | undefined
}) {
  return (
    <div className="flex flex-col gap-y-4">
      <BodyText className="font-semibold">Your current epoch volume</BodyText>
      <div className="flex flex-row justify-between items-center gap-x-2">
        <Points amount={points} />
        <Timer endTime={endTime} />
      </div>
    </div>
  )
}
