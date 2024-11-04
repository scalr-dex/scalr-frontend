import NoisyCardBig from 'components/NoisyCardBig'
import NoisyCard from 'components/NoisyCard'
import NoisyCardSmall from 'components/NoisyCardSmall'
import PerpCardBlur from 'components/icons/PerpCardBlur'
import ScalrCoin from 'components/icons/coins/ScalrCoin'
import StonksCircle from 'components/icons/StonksCircle'
import Feedback from 'components/icons/Feedback'
import Triangle from 'components/icons/socials/Triangle'
import useImagePreloader from 'helpers/hooks/useImagePreload'
import LoaderFullPage from 'components/LoaderFullPage'
import { useSetAtom } from 'jotai'
import modalsAtom, { AvailableModals } from 'helpers/atoms/modalsAtom'

const preloadList = [
  'img/noise-effect.png',
  'img/dex-scalr-3d.png',
  'img/scalr-wavy.png',
  'img/collabs/triangle_meme.png',
]

export default function () {
  const { imagesPreloaded } = useImagePreloader(preloadList)
  const setModal = useSetAtom(modalsAtom)

  if (!imagesPreloaded) return <LoaderFullPage />

  return (
    <div className="flex flex-col gap-y-4 h-screen p-4 pb-footer-height">
      <NoisyCard
        className="p-4 h-full relative overflow-hidden"
        onClick={() => setModal(AvailableModals.perpInfo)}
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
        onClick={() => setModal(AvailableModals.airdropInfo)}
        className="relative p-4 h-full justify-evenly"
      >
        <NoisyCardBig
          header="Scalr Airdrop"
          subHeader="Take part in $SCR airdrop distribution."
          smallIcon={<ScalrCoin size={44} />}
        />
        <img src="img/dex-scalr-3d.png" className="mx-auto h-32" />
      </NoisyCard>

      <div className="flex flex-row gap-x-4 h-full">
        <NoisyCard
          style={{
            background:
              'url(img/noise-effect.png), linear-gradient(to right, #6CCAF2, #11A5E4) padding-box',
          }}
          className="h-full p-2.5 border-5 border-white-16 shadow-inner-card-glow"
          onClick={() => setModal(AvailableModals.triangleAccelerated)}
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
          className="h-full p-2.5 border-5 border-white-16 shadow-inner-card-glow"
          onClick={() => setModal(AvailableModals.partnershipInfo)}
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
    </div>
  )
}
