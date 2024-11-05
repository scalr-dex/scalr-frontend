import ButtonSmall from 'components/ButtonSmall'
import ButtonTypes from 'type/Button'
import TicketPlus from 'components/Modals/TicketPlus'
import { useSetAtom } from 'jotai'
import modalsAtom, { AvailableModals } from 'helpers/atoms/modalsAtom'

export default function ({ small }: { small?: boolean }) {
  const setModal = useSetAtom(modalsAtom)

  return (
    <ButtonSmall
      iconLeft={<TicketPlus />}
      buttonType={ButtonTypes.outline}
      className={
        small ? 'py-1.25 px-2 !min-w-fit border-none' : 'py-2 px-4 border-none'
      }
      onClick={() => setModal(AvailableModals.battleTickets)}
    >
      0
    </ButtonSmall>
  )
}
