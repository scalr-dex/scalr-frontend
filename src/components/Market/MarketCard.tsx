import Star from 'components/icons/Star'
import { BodyText } from 'components/Text'
import { ChildrenProp } from 'type/Props'

export default function ({
  children,
  bestOffer,
  price,
}: ChildrenProp & { price: number; bestOffer?: boolean }) {
  return (
    <div className="relative flex flex-col rounded-2xl overflow-hidden h-44 w-full border border-white/5 bg-primary-dark">
      <div className="flex items-center justify-center w-full h-full">
        {children}
      </div>
      {bestOffer ? <div></div> : null}
      <div className="flex flex-row items-center justify-center gap-x-2 bg-secondary py-2 justify-self-end w-full">
        <Star />
        <BodyText>{price}</BodyText>
      </div>
    </div>
  )
}
