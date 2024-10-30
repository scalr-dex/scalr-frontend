import ButtonSmall from 'components/ButtonSmall'
import { useState } from 'preact/hooks'
import ButtonTypes from 'type/Button'
import TicketPlus from 'components/Modals/TicketPlus'
import BattleTicketsModal from 'components/Modals/BattleTicketsModal'

export default function () {
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <ButtonSmall
        iconLeft={<TicketPlus />}
        buttonType={ButtonTypes.outline}
        className="py-2 px-4"
        onClick={() => setOpenModal(true)}
      >
        0
      </ButtonSmall>
      <BattleTicketsModal showModal={openModal} setShowModal={setOpenModal} />
    </>
  )
}
