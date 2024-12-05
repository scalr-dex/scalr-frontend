import { BodyText } from 'components/Text'
import dayjs from 'dayjs'
import { formatDuration } from 'helpers/time'
import { PropsWithChildren } from 'react'
import { DiscoveryFeedItem } from 'type/Discovery'

function LabelWithData({
  label,
  children,
  dataColor = 'white',
}: {
  label: string
  dataColor?: string
} & PropsWithChildren) {
  return (
    <div className="flex flex-col gap-y-1">
      <BodyText className="text-sm text-white/50">{label}</BodyText>
      <BodyText className="font-semibold" style={{ color: dataColor }}>
        {children}
      </BodyText>
    </div>
  )
}

export default function DetailedItemCard({
  market_cap,
  blue_chip_risk,
  smart_wallets,
  kol_wallets,
  liquidity,
  holders,
  rugpull_risk,
  one_hour_volume,
  one_hour_txs,
  creation_date,
}: DiscoveryFeedItem) {
  const seconds = dayjs().diff(dayjs(creation_date), 'seconds')
  const splitted = formatDuration(seconds).split(' ')
  const formatted = splitted[0] + 'h' + ' ' + splitted[1] + 'm'

  const smartKol = smart_wallets / kol_wallets || 0

  return (
    <div className="rounded-xl bg-tertiary border border-white-16 p-3 grid grid-cols-3 gap-4">
      <LabelWithData label="MCap" dataColor="#93C5FD">
        {market_cap}
      </LabelWithData>
      <LabelWithData label="Gem">{blue_chip_risk}</LabelWithData>
      <LabelWithData label="Smart/KOL">{smartKol}</LabelWithData>
      <LabelWithData label="Liquidity">{liquidity}</LabelWithData>
      <LabelWithData label="Holders">{holders}</LabelWithData>
      <LabelWithData label="Rugpull">{rugpull_risk}</LabelWithData>
      <LabelWithData label="1h Vol" dataColor="#93C5FD">
        {one_hour_volume}
      </LabelWithData>
      <LabelWithData label="1h TXs">{one_hour_txs}</LabelWithData>
      <LabelWithData label="Age">{formatted}</LabelWithData>
    </div>
  )
}
