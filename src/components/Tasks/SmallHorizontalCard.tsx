import { BodyText, Header3 } from 'components/Text'
import modalsAtom, { AvailableModals } from 'helpers/atoms/modalsAtom'
import { useSetAtom } from 'jotai'

export default function () {
  const setModal = useSetAtom(modalsAtom)

  return (
    <div
      onClick={() => setModal(AvailableModals.airdropInfo)}
      style={{
        background:
          'url(img/noise-effect.png), linear-gradient(to top, var(--accent-dark), var(--secondary), var(--secondary))',
      }}
      className="shrink-0 rounded-2xl relative w-80 h-36 p-4 active:opacity-85 hover:opacity-90 transition-all will-change-transform cursor-pointer"
    >
      <div className="flex flex-col gap-y-2">
        <Header3>Scalr Discovery</Header3>
        <BodyText className="text-white/50 text-sm font-semibold">
          Uncover the next x100 memecoins
        </BodyText>
      </div>

      <img
        src="img/dex-scalr-2d.png"
        className="w-64 self-center absolute bottom-2 -z-10"
        draggable={false}
      />
    </div>
  )
}
