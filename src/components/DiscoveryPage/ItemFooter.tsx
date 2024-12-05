import { shareURL } from '@telegram-apps/sdk-react'
import Button from 'components/Button'
import Share from 'components/icons/Share'
import getDexScreenerLink from 'helpers/formatters/getDexScreenerLink'
import safeOpenLink from 'helpers/safeOpenLink'
import { useCallback } from 'react'
import ButtonTypes from 'type/Button'
import { DiscoveryFeedItem } from 'type/Discovery'

export default function ItemFooter({
  name,
  market_cap,
  rugpull_risk,
  price_change_1h,
  contract_address,
  chain,
}: DiscoveryFeedItem) {
  const link = getDexScreenerLink(chain, contract_address)

  const onShare = useCallback(() => {
    const priceChangeFormatted =
      price_change_1h > 0 ? '+' + price_change_1h : price_change_1h

    shareURL(
      '',
      `
🚀 Check out this gem I just found on @ScalrBot!

$${name} with a market cap of $${market_cap}!
☠️ Rugpull Risk: ${rugpull_risk}

It's already ${priceChangeFormatted}% in the last hour!

🔗 Scan it here: ${link}
    `
    )
  }, [link, market_cap, name, price_change_1h, rugpull_risk])

  return (
    <div className="flex gap-x-2 h-10">
      <Button
        buttonType={ButtonTypes.secondary}
        onClick={() => safeOpenLink(link)}
      >
        Details
      </Button>
      <Button buttonType={ButtonTypes.neutral}>Trade</Button>
      <Button
        buttonType={ButtonTypes.neutral}
        className="!w-16"
        onClick={onShare}
      >
        <Share />
      </Button>
    </div>
  )
}
