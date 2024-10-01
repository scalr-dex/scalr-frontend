import ButtonSmall from 'components/ButtonSmall'
import Card from 'components/Card'
import { AccentHeader, BodyText } from 'components/Text'
import ButtonTypes from 'type/Button'
import BestOfferBlock from 'components/Market/BestOfferBlock'
import Star from 'components/icons/Star'
import { autoclaimOptions, AvailableAutoclaimOptions } from 'type/Market'

interface AutoclaimCardProps {
  option: AvailableAutoclaimOptions
  isSpecialOffer?: boolean
  onClick: (option: AvailableAutoclaimOptions) => void
  loading: boolean
}

export default function ({
  option,
  isSpecialOffer,
  onClick,
  loading,
}: AutoclaimCardProps) {
  const { claimsAmount, starsAmount, price } = autoclaimOptions[option]
  const cardBg = isSpecialOffer
    ? 'bg-gradient-to-b from-[#E5F443] from-60% via-[#9AF8FE] via-70% to-[#D5AEFB] text-secondary !border-none'
    : ''
  const textColor = isSpecialOffer ? '' : ''

  return (
    <Card
      className={`relative flex-col justify-center gap-y-4 p-2 pt-6 w-full ${cardBg} ${textColor}`}
    >
      {isSpecialOffer ? <BestOfferBlock /> : null}
      <div className="flex flex-col gap-y-1">
        <AccentHeader>{claimsAmount}</AccentHeader>
        <BodyText className="text-sm font-semibold">claims</BodyText>
      </div>
      <ButtonSmall
        onClick={() => onClick(option)}
        buttonType={ButtonTypes.secondary}
        className="text-xxs py-2 !px-0 w-full"
        innerClassName="!gap-x-0.5"
        isLoading={loading}
      >
        <Star className="inline" />
        <span>
          {starsAmount} (~${price})
        </span>
      </ButtonSmall>
    </Card>
  )
}
