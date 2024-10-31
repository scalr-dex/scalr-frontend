import ScalrCoin from 'components/icons/coins/ScalrCoin'
import { BodyText } from 'components/Text'
import formatUSA from 'helpers/formatters/formatUSA'

export default function ({
  rewardAmount,
  extraData,
}: {
  rewardAmount: number
  extraData?: string | undefined
}) {
  return (
    <div className="flex flex-row gap-x-2 items-center">
      <div className="w-fit flex flex-row gap-x-1 items-center pl-1 pr-2 py-1 rounded-full bg-tertiary">
        <ScalrCoin size={20} />
        <BodyText className="font-semibold text-sm">
          +{formatUSA(rewardAmount)}
        </BodyText>
      </div>
      <BodyText className="text-white/50 text-sm">{extraData}</BodyText>
    </div>
  )
}
