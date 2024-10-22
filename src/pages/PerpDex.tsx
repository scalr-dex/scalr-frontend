import NoisyCardBig from 'components/NoisyCardBig'
import NoisyCard from 'components/NoisyCard'
import NoisyCardSmall from 'components/NoisyCardSmall'
import PerpCardBlur from 'components/icons/PerpCardBlur'

export default function () {
  return (
    <div className="flex flex-col gap-y-4 pb-footer-height m-4">
      <NoisyCard className="p-4 h-60 relative overflow-hidden">
        <NoisyCardBig
          header="Scalr Perpetual DEX"
          subHeader={
            'Join the beta with invite code.\nPublic access coming soon.'
          }
        />
        <PerpCardBlur />
      </NoisyCard>

      <NoisyCard
        style={{
          background:
            'url(./img/noise-effect.png), linear-gradient(to top, var(--accent-dark), var(--secondary), var(--secondary))',
        }}
        className="p-4 h-60"
      >
        <NoisyCardBig
          header="Scalr Airdrop"
          subHeader="Take part in $SCR airdrop distribution."
        />
      </NoisyCard>

      <div className="flex flex-row gap-x-4">
        <NoisyCard
          style={{
            background:
              'url(./img/noise-effect.png), linear-gradient(to right, #6CCAF2, #11A5E4) padding-box',
          }}
          className="h-40 p-2.5 border-5 border-white-16 shadow-inner-card-glow"
        >
          <NoisyCardSmall
            topText="Most Popular"
            bottomText="Make an Onchain Deposit"
          />
        </NoisyCard>

        <NoisyCard
          style={{
            background:
              'url(./img/noise-effect.png), linear-gradient(to right, #3284FE, #0B54E3) padding-box',
          }}
          className="h-40 p-2.5 border-5 border-white-16 shadow-inner-card-glow"
        >
          <NoisyCardSmall
            topText="You’re a KOL?"
            bottomText="Fill form and get early access with"
          />
        </NoisyCard>
      </div>
    </div>
  )
}
