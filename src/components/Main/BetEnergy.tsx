import Battery from 'components/icons/Battery'
import EnergyInfoModal from 'components/Modals/EnergyInfoModal'
import EnergyZeroModal from 'components/Modals/EnergyZeroModal'
import InviteFriendsModal from 'components/Modals/InviteFriendsModal'
import { showZeroEnergyModal } from 'helpers/atoms/UserStates'
import { useAtom } from 'jotai'
import MotionNumber from 'motion-number'
import { useState } from 'preact/hooks'

export default function ({
  betEnergy = 0,
}: {
  betEnergy?: number | undefined
}) {
  const [zeroEnergyModal, setZeroEnergyModal] = useAtom(showZeroEnergyModal)
  const [openEnergyModal, setOpenEnergyModal] = useState(false)
  const [openFriendsModal, setOpenFriendsModal] = useState(false)

  return (
    <div
      className="flex flex-row gap-x-1 items-center text-white/50 hover:text-white/80 active:text-white font-semibold text-sm transition-colors cursor-pointer"
      onClick={() => setOpenEnergyModal(true)}
    >
      <Battery />

      <MotionNumber value={betEnergy} />

      <EnergyZeroModal
        showModal={zeroEnergyModal}
        setShowModal={setZeroEnergyModal}
        setShowFriendsModal={setOpenFriendsModal}
      />
      <EnergyInfoModal
        showModal={openEnergyModal}
        setShowModal={setOpenEnergyModal}
      />
      <InviteFriendsModal
        showModal={openFriendsModal}
        setShowModal={setOpenFriendsModal}
      />
    </div>
  )
}
