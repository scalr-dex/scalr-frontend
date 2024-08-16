import { BodyText } from 'components/icons/Text'
import Points from 'components/Main/Points'

export default function ({ points }: { points: number | undefined }) {
  return (
    <div className="flex flex-col gap-y-4">
      <BodyText>Your current epoch volume</BodyText>
      <Points amount={points} />
    </div>
  )
}
