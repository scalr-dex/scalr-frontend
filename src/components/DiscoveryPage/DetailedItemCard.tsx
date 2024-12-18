import { useAutoAnimate } from '@formkit/auto-animate/react'
import AccordionArrow from 'components/icons/AccordionArrow'
import { BodyText } from 'components/Text'
import dayjs from 'dayjs'
import roundNumber from 'helpers/roundNumber'
import { PropsWithChildren, useState } from 'react'
import { DiscoveryFeedItem } from 'type/Discovery'
import { ClassName } from 'type/Props'

function LabelWithData({
  label,
  children,
  color = 'text-white',
  wrapperClassName,
}: {
  label: string
  color?: ClassName
  wrapperClassName?: ClassName
} & PropsWithChildren) {
  return (
    <div className={`flex flex-col gap-y-1 ${wrapperClassName}`}>
      <BodyText className="text-sm text-white/50">{label}</BodyText>
      <BodyText className={`font-semibold ${color}`}>{children}</BodyText>
    </div>
  )
}

function HiddenData({
  liquidity,
  holders,
  rugpull_risk,
  one_hour_volume,
  one_hour_txs,
  creation_date,
}: DiscoveryFeedItem) {
  const diff = dayjs().diff(dayjs(creation_date), 'seconds')
  const dur = dayjs.duration(diff, 'seconds')

  const formatted = `${dur.days()}d ${dur.hours()}h ${dur.minutes()}m`

  return (
    <>
      <LabelWithData label="Liquidity">${roundNumber(liquidity)}</LabelWithData>
      <LabelWithData label="Holders">{roundNumber(holders)}</LabelWithData>
      <LabelWithData label="Rugpull">{rugpull_risk}</LabelWithData>
      <LabelWithData label="1h Vol" color="text-accent-dimmed-dark">
        ${roundNumber(one_hour_volume)}
      </LabelWithData>
      <LabelWithData label="1h TXs">{roundNumber(one_hour_txs)}</LabelWithData>
      <LabelWithData label="Age" wrapperClassName="w-32">
        {formatted}
      </LabelWithData>
    </>
  )
}

export default function DetailedItemCard(props: DiscoveryFeedItem) {
  const [parent] = useAutoAnimate()
  const [open, setOpen] = useState(false)
  const { market_cap, blue_chip_risk, smart_wallets, kol_wallets } = props

  const gemColor = blue_chip_risk === 'High' ? 'text-alt-dimmed' : 'text-white'

  return (
    <div className="flex gap-x-3 rounded-xl bg-tertiary border border-white-16 p-3">
      <div className="w-full grid grid-cols-3 gap-4" ref={parent}>
        <LabelWithData label="MCap" color="text-alt-dimmed">
          ${roundNumber(market_cap)}
        </LabelWithData>
        <LabelWithData label="Gem" color={gemColor}>
          {blue_chip_risk}
        </LabelWithData>
        <LabelWithData label="Smart/KOL">
          {smart_wallets}
          <span className="text-white/50">/</span>
          {kol_wallets}
        </LabelWithData>
        {open ? <HiddenData {...props} /> : null}
      </div>
      <AccordionArrow isOpen={open} onClick={() => setOpen((prev) => !prev)} />
    </div>
  )
}
