import { BodyText } from 'components/Text'
import Points from 'components/Main/Points'

export default function ({ points }: { points: number | undefined }) {
  return (
    <div className="flex flex-col gap-y-4">
      <BodyText className="font-semibold">Your points</BodyText>
      <div className="flex flex-row justify-between items-center gap-x-2">
        <Points amount={points} />
      </div>
    </div>
  )
}
