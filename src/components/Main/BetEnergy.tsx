import Battery from 'components/icons/Battery'
import modalsAtom, { AvailableModals } from 'helpers/atoms/modalsAtom'
import { useSetAtom } from 'jotai'
import MotionNumber from '@number-flow/react'

export default function ({
  betEnergy = 0,
}: {
  betEnergy?: number | undefined
}) {
  const setModal = useSetAtom(modalsAtom)

  return (
    <div
      className="flex flex-row gap-x-1 items-center text-white/75 hover:text-white/80 active:text-white/50 font-accent font-semibold text-sm transition-colors cursor-pointer"
      onClick={() => setModal(AvailableModals.betEnergyInfo)}
    >
      <Battery />

      <MotionNumber value={betEnergy} />
    </div>
  )
}
