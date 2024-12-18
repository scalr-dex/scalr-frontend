import NoisyCardBig from 'components/NoisyCardBig'
import NoisyCard from 'components/NoisyCard'
import NoisyCardSmall from 'components/NoisyCardSmall'
import PerpCardBlur from 'components/icons/PerpCardBlur'
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
          header="Scalr Discovery"
          subHeader={
            <>
              <p>A Telegram-first memecoins discovery</p>
              <p>app replacing countless terminals and</p>
              <p>bots.</p>
            </>
          }
          smallIcon={<StonksCircle />}
        />
        <PerpCardBlur />
      </NoisyCard>

      <div className="flex flex-row gap-x-4 h-full">
        <NoisyCard
          style={{
            background:
              'url(img/noise-effect.png), linear-gradient(to right, #6CCAF2, #11A5E4) padding-box',
          }}
          className="h-44 p-2.5 border-5 border-white-16 shadow-inner-card-glow"
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
          className="h-44 p-2.5 border-5 border-white-16 shadow-inner-card-glow"
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
