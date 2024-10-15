import ButtonSmall from 'components/ButtonSmall'
import CardFilled from 'components/CardFilled'
import { BodyText, Header3 } from 'components/Text'
import formatUSA from 'helpers/formatters/formatUSA'
import ButtonTypes from 'type/Button'

export default function () {
  return (
    <CardFilled className="flex-row gap-x-2 items-center justify-between mb-8">
      <div className="flex flex-col gap-y-1">
        <BodyText className="font-semibold text-white/50">
          My crystals balance
        </BodyText>
        <Header3>{formatUSA(15)}</Header3>
      </div>
      <ButtonSmall
        buttonType={ButtonTypes.neutral}
        iconRight={<span className="text-xl">+</span>}
        className="px-3 py-1.5"
        rounded="rounded-full"
      >
        Add crystals
      </ButtonSmall>
    </CardFilled>
  )
}
