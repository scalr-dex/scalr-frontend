import NoisyCardBig from 'components/NoisyCardBig'
import NoisyCard from 'components/NoisyCard'
import NoisyCardSmall from 'components/NoisyCardSmall'

export default function () {
  return (
    <div className="flex flex-col gap-y-4 pb-footer-height m-4">
      <NoisyCard className="h-60">
        <NoisyCardBig
          header="Scalr Perpetual DEX"
          subHeader={
            'Join the beta with invite code.\nPublic access coming soon.'
          }
        />
      </NoisyCard>

      <NoisyCard className="h-60">
        <NoisyCardBig
          header="Scalr Airdrop"
          subHeader="Take part in $SCR airdrop distribution."
        />
      </NoisyCard>

      <div className="flex flex-row gap-x-4">
        <NoisyCard className="h-40">
          <NoisyCardSmall
            topText="Most Popular"
            bottomText="Make an Onchain Deposit"
          />
        </NoisyCard>

        <NoisyCard className="h-40">
          <NoisyCardSmall
            topText="You’re a KOL?"
            bottomText="Fill form and get early access with"
          />
        </NoisyCard>
      </div>
    </div>
  )
}
