import NoisyCardBig from 'components/NoisyCardBig'
import NoisyCard from 'components/NoisyCard'
import NoisyCardSmall from 'components/NoisyCardSmall'
import PerpCardBlur from 'components/icons/PerpCardBlur'
import { useState } from 'preact/hooks'
import PerpDexInfoModal from 'components/Modals/PerpDex/PerpDexInfoModal'
import ScalrAirdropModal from 'components/Modals/PerpDex/ScalrAirdropModal'

export default function () {
  const [openAirdrop, setOpenAirdrop] = useState(false)
  const [openInfoModal, setOpenInfoModal] = useState(false)

  return (
    <div className="flex flex-col gap-y-4 pb-footer-height m-4">
      <NoisyCard
        className="p-4 h-60 relative overflow-hidden"
        onClick={() => setOpenInfoModal(true)}
      >
        <NoisyCardBig
          header="Scalr Perpetual DEX"
          subHeader={
            <>
              <p>Join the beta with invite code</p>
              <p>Public access coming soon.</p>
            </>
          }
        />
        <PerpCardBlur />
      </NoisyCard>

      <NoisyCard
        style={{
          background:
            'url(./img/noise-effect.png), linear-gradient(to top, var(--accent-dark), var(--secondary), var(--secondary))',
        }}
        onClick={() => setOpenAirdrop(true)}
        className="relative p-4 h-60"
      >
        <NoisyCardBig
          header="Scalr Airdrop"
          subHeader="Take part in $SCR airdrop distribution."
        />
        <img
          src="img/dex-scalr-3d.png"
          className="absolute left-10 bottom-4 w-72"
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

      <PerpDexInfoModal
        showModal={openInfoModal}
        setShowModal={setOpenInfoModal}
      />
      <ScalrAirdropModal
        showModal={openAirdrop}
        setShowModal={setOpenAirdrop}
      />
    </div>
  )
}
