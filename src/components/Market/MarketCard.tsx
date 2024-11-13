import Star from 'components/icons/Star'
import { BodyText } from 'components/Text'
import { ChildrenProp, OnClickPropVoid } from 'type/Props'

export default function ({
  children,
  bestOffer,
  price,
  badgeText = '1+1',
  priceFloat,
  backgroundImage,
  onClick,
}: ChildrenProp &
  OnClickPropVoid & {
    price: number
    backgroundImage?: string
    bestOffer?: boolean
    badgeText?: string
    priceFloat?: boolean
  }) {
  const priceStyle = priceFloat
    ? 'w-fit rounded-full px-9 mb-2 mx-auto'
    : 'w-full rounded-b-2xl'

  return (
    <div
      style={{
        backgroundImage,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
      }}
      className="relative flex flex-col rounded-2xl h-44 w-full border border-white/5 bg-primary-dark hover:scale-105 active:scale-[1.03] transition-transform cursor-pointer"
      onClick={onClick}
    >
      {badgeText ? (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent-alt-bg px-2 rounded-full shadow-super">
          <BodyText className="text-sm font-semibold text-accent-alt">
            {badgeText}
          </BodyText>
        </div>
      ) : null}
      <div className="flex items-center justify-center w-full h-full overflow-hidden">
        {children}
      </div>
      {bestOffer ? (
        <div className="flex items-center justify-center py-1 bg-accent -mt-4">
          <BodyText className="text-xxs text-center leading-3">
            BEST OFFER
          </BodyText>
        </div>
      ) : null}
      <div
        className={`flex flex-row items-center justify-center gap-x-2 bg-secondary py-1.25 justify-self-end ${priceStyle} transition-colors hover:bg-tertiary`}
      >
        <Star size={16} />
        <BodyText className="font-semibold">{price}</BodyText>
      </div>
    </div>
  )
}
