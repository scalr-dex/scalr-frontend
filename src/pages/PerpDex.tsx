import NoisyCardBig from 'components/NoisyCardBig'
import NoisyCard from 'components/NoisyCard'
import NoisyCardSmall from 'components/NoisyCardSmall'
import PerpCardBlur from 'components/icons/PerpCardBlur'
import { useState } from 'preact/hooks'
import PerpDexInfoModal from 'components/Modals/PerpDex/PerpDexInfoModal'
import ScalrAirdropModal from 'components/Modals/PerpDex/ScalrAirdropModal'
import PartnershipModal from 'components/Modals/PerpDex/PartnershipModal'
import ScalrCoin from 'components/icons/coins/ScalrCoin'
import StonksCircle from 'components/icons/StonksCircle'
import Feedback from 'components/icons/Feedback'
import Triangle from 'components/icons/socials/Triangle'
import TriangleAccelerated from 'components/Modals/PerpDex/TriangleAccelerated'
import FooterSafeArea from 'components/FooterSafeArea'
import useImagePreloader from 'helpers/hooks/useImagePreload'
import LoaderFullPage from 'components/LoaderFullPage'

const preloadList = [
  'img/noise-effect.png',
  'img/dex-scalr-3d.png',
  'img/scalr-wavy.png',
  'img/collabs/triangle_meme.png',
]

export default function () {
  const { imagesPreloaded } = useImagePreloader(preloadList)
  const [openAirdropModal, setOpenAirdropModal] = useState(false)
  const [openInfoModal, setOpenInfoModal] = useState(false)
  const [openPartnershipModal, setOpenPartnershipModal] = useState(false)
  const [openTriangleModal, setOpenTriangleModal] = useState(false)

  if (!imagesPreloaded) return <LoaderFullPage />

  return (
    <div className="flex flex-col gap-y-4 h-screen p-4">
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
          smallIcon={<StonksCircle />}
        />
        <PerpCardBlur />
      </NoisyCard>

      <NoisyCard
        style={{
          background:
            'url(img/noise-effect.png), linear-gradient(to top, var(--accent-dark), var(--secondary), var(--secondary))',
        }}
        onClick={() => setOpenAirdropModal(true)}
        className="relative p-4 h-60 justify-evenly"
      >
        <NoisyCardBig
          header="Scalr Airdrop"
          subHeader="Take part in $SCR airdrop distribution."
          smallIcon={<ScalrCoin size={44} />}
        />
        <div className="flex items-center justify-center">
          <img src="img/dex-scalr-3d.png" className="w-full" />
        </div>
      </NoisyCard>

      <div className="flex flex-row gap-x-4">
        <NoisyCard
          style={{
            background:
              'url(img/noise-effect.png), linear-gradient(to right, #6CCAF2, #11A5E4) padding-box',
          }}
          className="h-40 p-2.5 border-5 border-white-16 shadow-inner-card-glow"
          onClick={() => setOpenTriangleModal(true)}
        >
          <NoisyCardSmall
            topText="With Guidance"
            bottomText={
              <>
                <p>Triangle</p>Incubated
              </>
            }
            icon={<Triangle />}
          />
        </NoisyCard>

        <NoisyCard
          style={{
            background:
              'url(img/noise-effect.png), linear-gradient(to right, #3284FE, #0B54E3) padding-box',
          }}
          className="h-40 p-2.5 border-5 border-white-16 shadow-inner-card-glow"
          onClick={() => setOpenPartnershipModal(true)}
        >
          <NoisyCardSmall
            topText="KOL or feedback?"
            bottomText={
              <>
                <p>Click to</p>contact us
              </>
            }
            icon={<Feedback />}
          />
        </NoisyCard>
      </div>

      <PerpDexInfoModal
        showModal={openInfoModal}
        setShowModal={setOpenInfoModal}
      />
      <ScalrAirdropModal
        showModal={openAirdropModal}
        setShowModal={setOpenAirdropModal}
      />
      <PartnershipModal
        showModal={openPartnershipModal}
        setShowModal={setOpenPartnershipModal}
      />
      <TriangleAccelerated
        showModal={openTriangleModal}
        setShowModal={setOpenTriangleModal}
      />
      <FooterSafeArea />
    </div>
  )
}
