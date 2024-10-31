import ButtonSmall from 'components/ButtonSmall'
import { useState } from 'preact/hooks'
import ButtonTypes from 'type/Button'
import TicketPlus from 'components/Modals/TicketPlus'
import BattleTicketsModal from 'components/Modals/BattleTicketsModal'

export default function ({ small }: { small?: boolean }) {
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <ButtonSmall
        iconLeft={<TicketPlus />}
        buttonType={ButtonTypes.outline}
        className={small ? 'py-2 !min-w-14' : 'py-2 px-4'}
        contentClassName={small ? '!gap-x-0' : ''}
        onClick={() => setOpenModal(true)}
      >
        0
      </ButtonSmall>
      <BattleTicketsModal showModal={openModal} setShowModal={setOpenModal} />
    </>
  )
}
