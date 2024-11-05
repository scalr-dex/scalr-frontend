import ButtonSmall from 'components/ButtonSmall'
import Fire from 'components/icons/Fire'
import modalsAtom, { AvailableModals } from 'helpers/atoms/modalsAtom'
import UserAtom from 'helpers/atoms/UserAtom'
import { useAtomValue, useSetAtom } from 'jotai'
import ButtonTypes from 'type/Button'

export default function ({ small }: { small?: boolean }) {
  const user = useAtomValue(UserAtom)
  const setOpenModal = useSetAtom(modalsAtom)

  return (
    <ButtonSmall
      iconLeft={<Fire size={20} />}
      buttonType={ButtonTypes.outline}
      className={
        small ? 'py-1.25 px-2 !min-w-fit border-none' : 'py-2 px-4 border-none'
      }
      onClick={() => setOpenModal(AvailableModals.dailyStreak)}
    >
      {user?.loginDays}
    </ButtonSmall>
  )
}
