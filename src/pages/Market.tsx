import FooterSafeArea from 'components/FooterSafeArea'
import Level1 from 'components/icons/market/Level1'
import Level2 from 'components/icons/market/Level2'
import Level3 from 'components/icons/market/Level3'
import MarketCard from 'components/Market/MarketCard'
import MarketSection from 'components/Market/MarketSection'
import PointsReward from 'components/Market/PointsReward'
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
          <Level1 />
        </MarketCard>
        <MarketCard price={250} bestOffer>
          <Level2 />
        </MarketCard>
        <MarketCard price={500}>
          <Level3 />
        </MarketCard>
      </MarketSection>

      <MarketSection
        header="One-Week Boosts"
        subHeader="Get extra energy, boosters, and higher claims daily."
      >
        <MarketCard
          price={40}
          priceFloat
          backgroundImage='url("img/market/7-days-boost.png")'
        />
      </MarketSection>

      <MarketSection
        header="Points Packs"
        subHeader="Get points to to climb to the top."
      >
        <MarketCard
          price={400}
          backgroundImage='url("img/market/points-small.png")'
        >
          <PointsReward amount={500000} />
        </MarketCard>
        <MarketCard
          price={700}
          bestOffer
          backgroundImage='url("img/market/points-mid.png")'
        >
          <PointsReward amount={1000000} />
        </MarketCard>
        <MarketCard
          price={1200}
          backgroundImage='url("img/market/points-large.png")'
        >
          <PointsReward amount={1500000} />
        </MarketCard>
      </MarketSection>

      <FooterSafeArea />
    </div>
  )
}
