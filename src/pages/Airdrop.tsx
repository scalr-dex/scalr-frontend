import AirdropSection from 'components/Market/AirdropSection'
import MarketSection from 'components/Market/MarketSection'

export default function () {
  return (
    <div className="flex flex-col h-full w-full items-center justify-around gap-y-4 text-center px-3 pb-footer-height">
      <MarketSection />
      <AirdropSection />
    </div>
  )
}
