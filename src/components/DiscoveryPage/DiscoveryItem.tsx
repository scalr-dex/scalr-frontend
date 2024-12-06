import { DiscoveryFeedItem } from 'type/Discovery'
import TokenImageWithChain from 'components/DiscoveryPage/TokenImageWithChain'
import { BodyText } from 'components/Text'
import truncate from 'helpers/truncate'
import Copy from 'components/icons/Copy'
import ItemFooter from 'components/DiscoveryPage/ItemFooter'
import { useCallback, useState } from 'react'
import DetailedItemCard from 'components/DiscoveryPage/DetailedItemCard'
import CheckMark from 'components/icons/CheckMark'

export default function DiscoveryItem(item: DiscoveryFeedItem) {
  const [copied, setCopied] = useState(false)

  const { name, price, price_change_1h, contract_address, image_url, chain } =
    item

  const positivePriceChange = price_change_1h > 0

  const onCopy = useCallback(async () => {
    await navigator.clipboard.writeText(contract_address)

    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }, [contract_address])

  return (
    <div className="flex flex-col gap-y-6 p-4 rounded-2xl bg-secondary">
      <div className="flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-x-3">
            <TokenImageWithChain
              imgUrl={image_url}
              tokenName={name}
              chain={chain}
            />
            <div className="flex flex-col gap-y-1">
              <BodyText className="font-semibold">{name}</BodyText>
              <BodyText className="flex gap-x-1 items-center text-sm text-white/50">
                <span>
                  {truncate({
                    fullString: contract_address,
                    backChars: 5,
                    frontChars: 4,
                  })}
                </span>
                <span className="cursor-pointer hover:opacity-80 active:opacity-50">
                  {copied ? <CheckMark size={16} /> : <Copy onClick={onCopy} />}
                </span>
              </BodyText>
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <BodyText className="text-sm font-semibold text-right">
              ${price}
            </BodyText>
            <div className="flex gap-x-1">
              <BodyText
                className={`${positivePriceChange ? 'text-success' : 'text-error'} text-sm`}
              >
                {positivePriceChange ? '+' : ''}
                {price_change_1h}%
              </BodyText>
              <BodyText className="text-sm text-white/50">1h%</BodyText>
            </div>
          </div>
        </div>

        <DetailedItemCard {...item} />
      </div>
      <ItemFooter {...item} />
    </div>
  )
}
