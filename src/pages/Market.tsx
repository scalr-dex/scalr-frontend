import FooterSafeArea from 'components/FooterSafeArea'
import BaseLevel1 from 'components/icons/market/BaseLevel1'
import MarketCard from 'components/Market/MarketCard'
import MarketSection from 'components/Market/MarketSection'
import { Header2 } from 'components/Text'

export default function () {
  return (
    <div className="flex flex-col mt-2 px-4 gap-y-10">
      <Header2 className="w-full text-center">Upgrades</Header2>
      <MarketSection
        header="Reward Upgrade"
        subHeader="Unlock higher rewards by upgrading your bet."
      >
        <MarketCard price={100}>
          <BaseLevel1 />
        </MarketCard>
        <MarketCard price={250} bestOffer>
          <BaseLevel1 />
        </MarketCard>
        <MarketCard price={500}>
          <BaseLevel1 />
        </MarketCard>
      </MarketSection>

      <MarketSection
        header="One-Week Boosts"
        subHeader="Get extra energy, boosters, and higher claims daily."
      >
        <MarketCard price={40}>
          <BaseLevel1 />
        </MarketCard>
      </MarketSection>

      <MarketSection
        header="Points Packs"
        subHeader="Get points to to climb to the top."
      >
        <MarketCard price={400}>
          <BaseLevel1 />
        </MarketCard>
        <MarketCard price={700} bestOffer>
          <BaseLevel1 />
        </MarketCard>
        <MarketCard price={1200}>
          <BaseLevel1 />
        </MarketCard>
      </MarketSection>

      <FooterSafeArea />
    </div>
  )
}
