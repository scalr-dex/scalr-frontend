import FooterSafeArea from 'components/FooterSafeArea'
import BaseLevel1 from 'components/icons/market/BaseLevel1'
import MarketCard from 'components/Market/MarketCard'
import { BodyText, Header2, Header4 } from 'components/Text'

export default function () {
  return (
    <div className="flex flex-col mt-2 px-4 gap-y-10">
      <Header2 className="w-full text-center">Upgrades</Header2>
      <div className="flex flex-col gap-y-9">
        <div className="flex flex-col gap-y-2">
          <Header4>Reward Upgrade</Header4>
          <BodyText className="text-white/50">
            Unlock higher rewards by upgrading your bet.
          </BodyText>
        </div>

        <div className="flex flex-row gap-x-2 w-full">
          <MarketCard price={100}>
            <BaseLevel1 />
          </MarketCard>
          <MarketCard price={250} bestOffer>
            <BaseLevel1 />
          </MarketCard>
          <MarketCard price={500}>
            <BaseLevel1 />
          </MarketCard>
        </div>
      </div>

      <FooterSafeArea />
    </div>
  )
}
