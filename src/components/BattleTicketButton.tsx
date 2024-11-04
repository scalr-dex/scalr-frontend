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
      className={small ? 'py-2 !min-w-14' : 'py-2 px-4'}
      contentClassName={small ? '!gap-x-0' : ''}
      onClick={() => setModal(AvailableModals.battleTickets)}
    >
      0
    </ButtonSmall>
  )
}
