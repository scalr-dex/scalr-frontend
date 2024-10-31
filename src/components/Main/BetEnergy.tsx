import Battery from 'components/icons/Battery'
import EnergyInfoModal from 'components/Modals/EnergyInfoModal'
import EnergyZeroModal from 'components/Modals/EnergyZeroModal'
import InviteFriendsModal from 'components/Modals/InviteFriendsModal'
import { showZeroEnergyModal } from 'helpers/atoms/UserStates'
import { useAtom } from 'jotai'
import { useState } from 'preact/hooks'
import { AnimatedCounter } from 'react-animated-counter'

export default function ({
  betEnergy = 0,
}: {
  betEnergy?: number | undefined
}) {
  const [zeroEnergyModal, setZeroEnergyModal] = useAtom(showZeroEnergyModal)
  const [openEnergyModal, setOpenEnergyModal] = useState(false)
  const [openFriendsModal, setOpenFriendsModal] = useState(false)

  return (
    <div className="flex flex-row gap-x-1 items-center text-white/50">
      <Battery onClick={() => setOpenEnergyModal(true)} />

      <AnimatedCounter
        value={betEnergy}
        includeDecimals={false}
        fontSize="0.875rem"
        digitStyles={{
          color: '#ffffff50',
          fontWeight: 700,
        }}
        decrementColor="#ffffff"
      />

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
