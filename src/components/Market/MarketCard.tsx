import Star from 'components/icons/Star'
import { BodyText } from 'components/Text'
import { ChildrenProp } from 'type/Props'

export default function ({
  children,
  bestOffer,
  price,
  badgeText = '1+1',
}: ChildrenProp & { price: number; bestOffer?: boolean; badgeText?: string }) {
  return (
    <div className="relative flex flex-col rounded-2xl h-44 w-full border border-white/5 bg-primary-dark hover:scale-105 transition-transform cursor-pointer">
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
      <div className="flex flex-row items-center justify-center gap-x-2 bg-secondary py-2 justify-self-end w-full rounded-b-2xl">
        <Star size={16} />
        <BodyText>{price}</BodyText>
      </div>
    </div>
  )
}
